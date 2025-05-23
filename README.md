# Receipt Scanner App

This application uses Firebase and Vertex AI to process and extract information from receipt images.

## Environment Setup

1. Copy the environment variables template:
```bash
cp env.example .env.local
```

2. Fill in your Firebase configuration values in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

## AI Service Features

The application includes an AI service that processes receipt images with the following capabilities:

- Image straightening and preprocessing
- Product extraction from receipts
- Automatic calculation of:
  - Individual product prices
  - VAT rate
  - Service charge rate
  - Total amount

### How it works

1. The service takes a base64-encoded receipt image
2. Preprocesses the image to straighten it
3. Uses Vertex AI (Gemini 2.0 Flash model) to extract:
   - Product names and prices
   - VAT amount
   - Service charge
   - Total amount
4. Returns structured data including:
   - List of products with names and prices
   - Calculated VAT rate
   - Calculated service charge rate
   - Total amount

## Security Note

Make sure to:
- Never commit your `.env.local` file
- Keep your Firebase credentials secure
- Add `.env.local` to your `.gitignore` file

## Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase
- **AI Integration**: Google Vertex AI
- **Development**: Turbopack

## Prerequisites

- Node.js (Latest LTS version recommended)
- Bun (Latest version recommended)
- Firebase account
- Google Cloud Platform account (for Vertex AI)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/HKornchanok/nextjs-vertex-ai-firebase-app.git
cd nextjs-vertex-ai-firebase-app
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_credentials.json
```

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
nextjs-vertex-ai-firebase-app/
├── app/                 # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions and configurations
├── public/            # Static assets
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## Features

- Modern UI with Tailwind CSS
- Google Vertex AI integration
- TypeScript support
- ESLint configuration
- Turbopack for faster development

## Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Google Vertex AI](https://cloud.google.com/vertex-ai)
- [Tailwind CSS](https://tailwindcss.com/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
