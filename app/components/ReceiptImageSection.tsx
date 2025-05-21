import React from 'react';
import Image from 'next/image';
import { RefreshCw } from 'lucide-react';

interface ReceiptImageSectionProps {
  imagePreview: string | null;
  isProcessing: boolean;
  error: string | null;
  onImageRemove: () => void;
}

const ReceiptImageSection: React.FC<ReceiptImageSectionProps> = ({
  imagePreview,
  isProcessing,
  error,
  onImageRemove,
}) => {
  return (
    <div className="card-section h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-foreground">Receipt Image</h2>
        <button
          onClick={onImageRemove}
          className="bg-card border border-border text-destructive-foreground px-3 py-1 rounded-full hover:bg-destructive/90 transition-colors flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      {imagePreview && (
        <div className="relative w-full h-full min-h-[200px] max-h-[90%] max-w-[100%]">
          <Image src={imagePreview} alt="Preview" fill className="object-contain rounded-lg" />
        </div>
      )}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {error && <div className="text-destructive p-4">{error}</div>}
    </div>
  );
};

export default ReceiptImageSection;
