'use client';

import { useState } from 'react';
import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';

interface Product {
  name: string;
  price: number;
}

interface Person {
  name: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [vatRate, setVatRate] = useState(0);
  const [serviceChargeRate, setServiceChargeRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleReceiptDetailsExtracted = (details: {
    vatRate: number;
    serviceChargeRate: number;
    totalAmount: number;
  }) => {
    setVatRate(details.vatRate);
    setServiceChargeRate(details.serviceChargeRate);
    setTotalAmount(details.totalAmount);
  };

  return (
    <div className="p-4 h-full">
      <div className="flex flex-col md:flex-row gap-4 h-[90vh]">
        <LeftSection
          onProductsExtracted={setProducts}
          onPeopleUpdated={setPeople}
          onReceiptDetailsExtracted={handleReceiptDetailsExtracted}
        />
        <RightSection
          products={products}
          people={people}
          vatRate={vatRate}
          serviceChargeRate={serviceChargeRate}
          totalAmount={totalAmount}
          onProductsChange={setProducts}
        />
      </div>
    </div>
  );
}
