'use client';

import React, { useState } from 'react';
import ImagePreview from './ImagePreview';
import ReceiptImageSection from './ReceiptImageSection';
import PeopleManagementSection from './PeopleManagementSection';
import aiService from '../services/aiService';

interface Product {
  name: string;
  price: number;
}

interface Person {
  name: string;
}

interface LeftSectionProps {
  onProductsExtracted: (products: Product[]) => void;
  onPeopleUpdated: (people: Person[]) => void;
  onReceiptDetailsExtracted: (details: {
    vatRate: number;
    serviceChargeRate: number;
    totalAmount: number;
  }) => void;
}

const LeftSection: React.FC<LeftSectionProps> = ({
  onProductsExtracted,
  onPeopleUpdated,
  onReceiptDetailsExtracted,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [newPersonName, setNewPersonName] = useState('');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);

        try {
          setIsProcessing(true);
          setError(null);
          const response = await aiService.processReceiptImage(base64String);
          onProductsExtracted(response.products || []);
          onReceiptDetailsExtracted({
            vatRate: response.vatRate || 0,
            serviceChargeRate: response.serviceChargeRate || 0,
            totalAmount: response.totalAmount || 0,
          });
          setIsProcessed(true);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to process image');
          console.error('Error processing image:', err);
          setIsProcessed(false);
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
    onProductsExtracted([]);
    setError(null);
    setIsProcessed(false);
  };

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      if (people.some(person => person.name.toLowerCase() === newPersonName.trim().toLowerCase())) {
        setDuplicateError('This name already exists');
        return;
      }
      const updatedPeople = [...people, { name: newPersonName.trim() }];
      setPeople(updatedPeople);
      onPeopleUpdated(updatedPeople);
      setNewPersonName('');
      setDuplicateError(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPerson();
    }
  };

  const handleRemovePerson = (index: number) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
    onPeopleUpdated(updatedPeople);
  };

  return (
    <div className="w-full md:w-1/3 rounded-lg flex flex-col gap-4 h-full">
      {!image ? (
        <ImagePreview
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onImageRemove={handleImageRemove}
        />
      ) : (
        <div className="flex flex-col gap-4 h-full">
          <ReceiptImageSection
            imagePreview={imagePreview}
            isProcessing={isProcessing}
            error={error}
            onImageRemove={handleImageRemove}
          />

          {isProcessed && !error && (
            <PeopleManagementSection
              people={people}
              newPersonName={newPersonName}
              duplicateError={duplicateError}
              onAddPerson={handleAddPerson}
              onRemovePerson={handleRemovePerson}
              onNewPersonNameChange={name => {
                setNewPersonName(name);
                setDuplicateError(null);
              }}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LeftSection;
