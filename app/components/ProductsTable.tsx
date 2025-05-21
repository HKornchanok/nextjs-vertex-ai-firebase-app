import React, { useState } from 'react';

interface Product {
  name: string;
  price: number;
}

interface Person {
  name: string;
}

interface ProductsTableProps {
  products: Product[];
  people: Person[];
  checkboxStates: Record<string, Record<string, boolean>>;
  onCheckboxChange: (productName: string, personName: string) => void;
  onRemoveProduct: (index: number) => void;
  onAddProduct: (product: Product) => void;
}

interface ValidationErrors {
  name?: string;
  price?: string;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  people,
  checkboxStates,
  onCheckboxChange,
  onRemoveProduct,
  onAddProduct,
}) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: 'name' | 'price', value: string | number): string | undefined => {
    if (name === 'name') {
      const nameValue = value as string;
      if (!nameValue.trim()) return 'Product name is required';
      if (nameValue.length < 2) return 'Product name must be at least 2 characters';
      if (nameValue.length > 50) return 'Product name must be less than 50 characters';
      if (products.some(p => p.name.toLowerCase() === nameValue.toLowerCase())) {
        return 'Product name already exists';
      }
    }
    if (name === 'price') {
      const priceValue = value as number;
      if (priceValue <= 0) return 'Price must be greater than 0';
      if (priceValue > 1000000) return 'Price must be less than 1,000,000';
      if (!Number.isFinite(priceValue)) return 'Price must be a valid number';
    }
    return undefined;
  };

  const handleFieldChange = (name: 'name' | 'price', value: string | number) => {
    setNewProduct(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleAddProduct = () => {
    const nameError = validateField('name', newProduct.name);
    const priceError = validateField('price', newProduct.price);

    if (nameError || priceError) {
      setErrors({ name: nameError, price: priceError });
      setTouched({ name: true, price: true });
      return;
    }

    onAddProduct(newProduct);
    setNewProduct({ name: '', price: 0 });
    setErrors({});
    setTouched({});
  };

  if (products.length === 0 && people.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No products or people to display
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex-1">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-2 sm:px-4 py-2 text-right text-sm font-medium text-muted-foreground">
                Price
              </th>
              <th className="hidden sm:table-cell px-2 sm:px-4 py-2 text-center text-sm font-medium text-muted-foreground">
                People
              </th>
              <th className="px-2 sm:px-4 py-2 text-center text-sm font-medium text-muted-foreground w-[40px] sm:w-[50px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-muted/30">
                <td className="px-2 sm:px-4 py-2 text-sm text-foreground">{product.name}</td>
                <td className="px-2 sm:px-4 py-2 text-sm text-foreground text-right">
                  ฿{product.price.toFixed(2)}
                </td>
                <td className="px-2 sm:px-4 py-2 text-sm text-foreground">
                  {people.length === 0 ? (
                    <div className="text-center text-muted-foreground">No people added</div>
                  ) : (
                    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                      {people.map((person, personIndex) => (
                        <label
                          key={personIndex}
                          className="inline-flex items-center text-xs sm:text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={checkboxStates[product.name]?.[person.name] || false}
                            onChange={() => onCheckboxChange(product.name, person.name)}
                            className="form-checkbox h-3 w-3 sm:h-4 sm:w-4 text-primary rounded border-input focus:ring-ring"
                          />
                          <span className="ml-1 sm:ml-2 text-foreground">{person.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-2 sm:px-4 py-2 text-center">
                  <button
                    onClick={() => onRemoveProduct(index)}
                    className="text-destructive hover:text-destructive/80 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            <tr className="hover:bg-muted/30">
              <td className="px-2 sm:px-4 py-2 text-sm text-foreground">
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={e => handleFieldChange('name', e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                  placeholder="Enter product name"
                  className={`w-full px-1 sm:px-2 py-1 text-xs sm:text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary ${
                    touched.name && errors.name ? 'border-destructive' : 'border-input'
                  }`}
                />
              </td>
              <td className="px-2 sm:px-4 py-2 text-sm text-foreground text-right">
                <input
                  type="number"
                  value={newProduct.price || ''}
                  onChange={e => handleFieldChange('price', parseFloat(e.target.value) || 0)}
                  onBlur={() => setTouched(prev => ({ ...prev, price: true }))}
                  placeholder="0.00"
                  className={`w-full px-1 sm:px-2 py-1 text-xs sm:text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary text-right ${
                    touched.price && errors.price ? 'border-destructive' : 'border-input'
                  }`}
                />
              </td>
              <td className="px-2 sm:px-4 py-2 text-sm text-foreground">
                <div className="flex flex-col items-center gap-1">
                  <div className="text-center text-muted-foreground text-xs sm:text-sm">
                    New item
                  </div>
                  {(touched.name && errors.name) || (touched.price && errors.price) ? (
                    <div className="text-[10px] sm:text-xs text-destructive text-center">
                      {errors.name || errors.price}
                    </div>
                  ) : null}
                </div>
              </td>
              <td className="px-2 sm:px-4 py-2 text-center">
                <button
                  onClick={handleAddProduct}
                  className={`text-primary hover:text-primary/80 focus:outline-none ${
                    Object.keys(errors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={Object.keys(errors).length > 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
