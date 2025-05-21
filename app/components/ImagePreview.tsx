'use client';

import React from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imagePreview,
  onImageChange,
  onImageRemove,
}) => {
  return (
    <div className="card-section h-full">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Products and People</h2>
              <div className="flex flex-col items-center justify-center h-full space-y-4">
        {!imagePreview ? (
          <div className="w-full max-w-md">
            <div className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Choose Image
              </label>
              <p className="mt-4 text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-2xl aspect-video">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-contain rounded-lg shadow-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <button
              onClick={onImageRemove}
              className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Remove</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
