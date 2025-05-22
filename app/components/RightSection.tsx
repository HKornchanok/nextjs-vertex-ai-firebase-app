import React, { useState, useMemo } from 'react';
import ProductsTable from './ProductsTable';
import PaymentSummary from './PaymentSummary';
import PaymentDonutChart from './PaymentDonutChart';
import PaymentStackedBarChart from './PaymentStackedBarChart';
import HorizontalBarChart from './HorizontalBarChart';

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
  totalAmount?: number;
  onProductsChange?: (products: Product[]) => void;
}

const RightSection: React.FC<RightSectionProps> = ({
  products = [],
  people = [],
  totalAmount = 0,
  onProductsChange,
}) => {
  // Initialize checkbox states for each product-person combination
  const [checkboxStates, setCheckboxStates] = useState<Record<string, Record<string, boolean>>>({});
  const [calculatedTotal, setCalculatedTotal] = useState(0);

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

    return totals;
  }, [products, people, checkboxStates]);

  return (
    <div className="w-full md:w-2/3 rounded-lg flex flex-col h-full gap-4">
      {products.length > 0 ? (
        <>
          <div className="card-section h-full md:h-[55vh] overflow-y-auto">
            <div className="flex flex-col gap-4">
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
          { people.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[40%]">
                <PaymentSummary
                  people={people}
                  personTotals={personTotals}
                  onTotalChange={setCalculatedTotal}
                />

                <PaymentDonutChart
                  people={people}
                  personTotals={personTotals}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[40%]">
                <PaymentStackedBarChart
                  people={people}
                  products={products}
                  checkboxStates={checkboxStates}
                />

                <HorizontalBarChart
                  people={people}
                  products={products}
                  checkboxStates={checkboxStates}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No products added yet</p>
        </div>
      )}
    </div>
  );
};

export default RightSection;
