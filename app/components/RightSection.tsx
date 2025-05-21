import React, { useState, useMemo } from 'react';
import ProductsTable from './ProductsTable';
import PaymentSummary from './PaymentSummary';

interface Product {
  name: string;
  price: number;
}

interface Person {
  name: string;
}

interface RightSectionProps {
  products?: Product[];
  people?: Person[];
  vatRate?: number;
  serviceChargeRate?: number;
  totalAmount?: number;
  onProductsChange?: (products: Product[]) => void;
}

const RightSection: React.FC<RightSectionProps> = ({
  products = [],
  people = [],
  vatRate = 0,
  serviceChargeRate = 0,
  totalAmount = 0,
  onProductsChange,
}) => {
  // Initialize checkbox states for each product-person combination
  const [checkboxStates, setCheckboxStates] = useState<Record<string, Record<string, boolean>>>({});

  const handleCheckboxChange = (productName: string, personName: string) => {
    setCheckboxStates(prev => ({
      ...prev,
      [productName]: {
        ...prev[productName],
        [personName]: !prev[productName]?.[personName],
      },
    }));
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    onProductsChange?.(updatedProducts);
  };

  const handleAddProduct = (product: Product) => {
    onProductsChange?.(products.concat(product));
  };

  // Calculate total amount for each person with split payments
  const personTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    // Initialize totals for all people
    people.forEach(person => {
      totals[person.name] = 0;
    });

    // Ensure products is an array before using forEach
    if (Array.isArray(products)) {
      // Calculate split payments for each product
      products.forEach(product => {
        // Count how many people are selected for this product
        const selectedPeople = people.filter(person => checkboxStates[product.name]?.[person.name]);

        if (selectedPeople.length > 0) {
          // Calculate split amount per person
          const splitAmount = product.price / selectedPeople.length;

          // Add split amount to each selected person's total
          selectedPeople.forEach(person => {
            totals[person.name] += splitAmount;
          });
        }
      });
    }

    // Calculate VAT and service charge for each person
    Object.keys(totals).forEach(personName => {
      const subtotal = totals[personName];
      const serviceChargeAmount = (subtotal * serviceChargeRate) / 100;
      const vatAmount = ((subtotal + serviceChargeAmount) * vatRate) / 100;

      totals[personName] = subtotal + vatAmount + serviceChargeAmount;
    });

    return totals;
  }, [products, people, checkboxStates, vatRate, serviceChargeRate]);

  // Calculate total amount for all people
  const calculatedTotal = useMemo(() => {
    return Object.values(personTotals).reduce((sum, amount) => sum + amount, 0);
  }, [personTotals]);

  return (
    <div className="w-full md:w-2/3 rounded-lg flex flex-col h-full gap-4">
      <div className="h-[60%]">
        <div className="card-section h-full overflow-y-auto">
          <div className="flex flex-col gap-4 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Products and People</h2>
              <div className="flex flex-col items-end gap-1">
                <div className="text-xl font-semibold text-primary">
                  Total: ฿{totalAmount.toFixed(2)}
                </div>
                {totalAmount > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Calculated: ฿{calculatedTotal.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            <ProductsTable
              products={products}
              people={people}
              checkboxStates={checkboxStates}
              onCheckboxChange={handleCheckboxChange}
              onRemoveProduct={handleRemoveProduct}
              onAddProduct={handleAddProduct}
            />
          </div>
        </div>
      </div>

      <div className="h-[40%]">
        <PaymentSummary
          people={people}
          personTotals={personTotals}
          vatRate={vatRate}
          serviceChargeRate={serviceChargeRate}
        />
      </div>
    </div>
  );
};

export default RightSection;
