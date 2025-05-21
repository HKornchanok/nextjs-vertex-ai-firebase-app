import { initializeApp } from 'firebase/app';
import {
  getVertexAI,
  getGenerativeModel,
  GenerativeModel,
  ChatSession,
  SchemaType,
} from 'firebase/vertexai';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

class AiService {
  private model: GenerativeModel;
  private chat: ChatSession;
  private tokenUsage = {
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
  };

  constructor() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const vertexAI = getVertexAI(app);

    // Initialize the generative model with a model that supports your use case
    this.model = getGenerativeModel(vertexAI, {
      model: 'gemini-2.0-flash',
      systemInstruction: 'Extract products from receipt image as [name, price] pairs.',
      tools: [
        {
          functionDeclarations: [
            {
              name: 'extractProductsFromReceipt',
              description: 'Extract products from receipt image',
              parameters: {
                type: SchemaType.OBJECT,
                properties: {
                  extractedProducts: {
                    type: SchemaType.ARRAY,
                    description: 'Products from receipt',
                    items: {
                      type: SchemaType.OBJECT,
                      description: 'Product details',
                      properties: {
                        name: {
                          type: SchemaType.STRING,
                          description: 'Product name',
                        },
                        price: {
                          type: SchemaType.NUMBER,
                          description: 'Product price',
                        },
                      },
                      required: ['name', 'price'],
                    },
                  },
                  vat: {
                    type: SchemaType.NUMBER,
                    description: 'VAT amount if present',
                  },
                  serviceCharge: {
                    type: SchemaType.NUMBER,
                    description: 'Service charge amount if present',
                  },
                  totalAmount: {
                    type: SchemaType.NUMBER,
                    description: 'Total amount including VAT and service charge',
                  },
                },
              },
            },
          ],
        },
      ],
    });

    this.chat = this.model.startChat();
  }

  private async straightenImage(imageBase64: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image
        ctx.drawImage(img, 0, 0);

        // Simple edge detection to find the angle
        let maxEdgeCount = 0;
        let bestAngle = 0;

        // Try different angles (-45 to 45 degrees)
        for (let angle = -45; angle <= 45; angle += 1) {
          const rotatedCanvas = document.createElement('canvas');
          const rotatedCtx = rotatedCanvas.getContext('2d');
          if (!rotatedCtx) continue;

          rotatedCanvas.width = canvas.width;
          rotatedCanvas.height = canvas.height;

          // Rotate and draw
          rotatedCtx.translate(canvas.width / 2, canvas.height / 2);
          rotatedCtx.rotate((angle * Math.PI) / 180);
          rotatedCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
          rotatedCtx.setTransform(1, 0, 0, 1, 0, 0);

          // Count edges
          const rotatedData = rotatedCtx.getImageData(0, 0, canvas.width, canvas.height).data;
          let edgeCount = 0;

          for (let i = 0; i < rotatedData.length; i += 4) {
            const r = rotatedData[i];
            const g = rotatedData[i + 1];
            const b = rotatedData[i + 2];
            const brightness = (r + g + b) / 3;

            if (brightness < 128) {
              edgeCount++;
            }
          }

          if (edgeCount > maxEdgeCount) {
            maxEdgeCount = edgeCount;
            bestAngle = angle;
          }
        }

        // Apply the best angle
        const finalCanvas = document.createElement('canvas');
        const finalCtx = finalCanvas.getContext('2d');
        if (!finalCtx) {
          reject(new Error('Could not get final canvas context'));
          return;
        }

        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;

        finalCtx.translate(finalCanvas.width / 2, finalCanvas.height / 2);
        finalCtx.rotate((bestAngle * Math.PI) / 180);
        finalCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

        // Convert back to base64
        resolve(finalCanvas.toDataURL('image/jpeg', 0.9));
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = imageBase64;
    });
  }

  async processReceiptImage(imageBase64: string) {
    try {
      // First straighten the image
      const straightenedImage = await this.straightenImage(imageBase64);

      // Remove the data:image/jpeg;base64, prefix
      const base64Data = straightenedImage.split(',')[1];

      // Send message to the chat
      const result = await this.chat.sendMessage([
        {
          text: "I've uploaded a receipt image. Please extract the product details from it.",
        },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data,
          },
        },
      ]);

      // Update token usage
      if (result.response.usageMetadata) {
        this.tokenUsage.promptTokens += result.response.usageMetadata.promptTokenCount || 0;
        this.tokenUsage.completionTokens += result.response.usageMetadata.candidatesTokenCount || 0;
        this.tokenUsage.totalTokens += result.response.usageMetadata.totalTokenCount || 0;
      }

      // Extract products from the function call
      const args = result.response.candidates?.[0]?.content?.parts?.[0]?.functionCall?.args as {
        extractedProducts?: Array<{ name: string; price: number }>;
        vat?: number;
        serviceCharge?: number;
        totalAmount?: number;
      };
      const products = args?.extractedProducts || [];
      const priceWithoutTax = products.reduce((sum, product) => sum + product.price, 0);
      const vat = args?.vat || 0;
      const serviceCharge = args?.serviceCharge || 0;
      const totalAmount = args?.totalAmount || 0;

      const vatRate = Math.round((vat / totalAmount) * 100);

      const serviceChargeRate = Math.round((serviceCharge / priceWithoutTax) * 100);
      return {
        products,
        vatRate,
        serviceChargeRate,
        totalAmount,
      };
    } catch (error) {
      console.error('Error processing receipt image:', error);
      throw error;
    }
  }

  getTokenUsage() {
    return this.tokenUsage;
  }
}

// Create a singleton instance
const aiService = new AiService();
export default aiService;
