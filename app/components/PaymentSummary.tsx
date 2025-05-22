import React, { useState, useEffect } from 'react';

interface Person {
  name: string;
}

interface PaymentSummaryProps {
  people: Person[];
  personTotals: Record<string, number>;
  onTotalChange?: (total: number) => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  people,
  personTotals,
  onTotalChange,
}) => {
  const [roundUp, setRoundUp] = useState(false);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [vat, setVat] = useState(0);
  const [vatOption, setVatOption] = useState<'total' | 'totalWithService'>('total');
  const [showVatSheet, setShowVatSheet] = useState(false);

  const roundAmount = (amount: number) => {
    if (!roundUp) return amount;
    return Math.ceil(amount);
  };

  const calculateTotalWithCharges = (baseAmount: number) => {
    const serviceAmount = (baseAmount * serviceCharge) / 100;
    const vatBase = vatOption === 'totalWithService' ? baseAmount + serviceAmount : baseAmount;
    const vatAmount = (vatBase * vat) / 100;
    return roundAmount(baseAmount + serviceAmount + vatAmount);
  };

  const handleVatOptionSelect = (option: 'total' | 'totalWithService') => {
    setVatOption(option);
    setShowVatSheet(false);
  };

  // Calculate total for all people and notify parent component
  useEffect(() => {
    const total = people.reduce((sum, person) => {
      const baseAmount = personTotals[person.name];
      return sum + calculateTotalWithCharges(baseAmount);
    }, 0);
    onTotalChange?.(total);
  }, [people, personTotals, serviceCharge, vat, vatOption, roundUp, onTotalChange]);

  return (
    <div className="card-section col-span-2 h-full md:h-[34vh] overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">Payment Summary</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Service Charge (%)</span>
            <input
              type="number"
              value={serviceCharge}
              onChange={(e) => setServiceCharge(Number(e.target.value))}
              className="w-20 px-2 py-1 border border-border rounded"
              min="0"
              max="100"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">VAT (%)</span>
            <input
              type="number"
              value={vat}
              onChange={(e) => setVat(Number(e.target.value))}
              className="w-20 px-2 py-1 border border-border rounded"
              min="0"
              max="100"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">VAT Option</span>
            {/* Desktop dropdown */}
            <select
              value={vatOption}
              onChange={(e) => setVatOption(e.target.value as 'total' | 'totalWithService')}
              className="hidden sm:block px-2 py-1 border border-border rounded"
            >
              <option value="total">VAT on Base Amount</option>
              <option value="totalWithService">VAT on (Base + Service)</option>
            </select>
            {/* Mobile button */}
            <button
              onClick={() => setShowVatSheet(true)}
              className="sm:hidden px-2 py-1 border border-border rounded text-left w-40"
            >
              {vatOption === 'total' ? 'VAT on Base Amount' : 'VAT on (Base + Service)'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Round Up</span>
            <button
              onClick={() => setRoundUp(!roundUp)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                roundUp ? 'bg-primary' : 'bg-secondary'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  roundUp ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile VAT Option Sheet */}
      {showVatSheet && (
        <div className="fixed inset-0 bg-black/50 z-50 sm:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-xl p-4 animate-slide-up">
            <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-4">Select VAT Option</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleVatOptionSelect('total')}
                className={`w-full p-4 text-center rounded-lg ${
                  vatOption === 'total' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                VAT on Base Amount
              </button>
              <button
                onClick={() => handleVatOptionSelect('totalWithService')}
                className={`w-full p-4 text-center rounded-lg  ${
                  vatOption === 'totalWithService' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
              >
                VAT on (Base + Service)
              </button>
            </div>
            <button
              onClick={() => setShowVatSheet(false)}
              className="bg-secondary rounded-lg w-full mt-4 p-4 text-center text-muted-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {people.map((person, index) => {
          const baseAmount = personTotals[person.name];
          const serviceAmount = (baseAmount * serviceCharge) / 100;
          const vatBase = vatOption === 'totalWithService' ? baseAmount + serviceAmount : baseAmount;
          const vatAmount = (vatBase * vat) / 100;
          const total = calculateTotalWithCharges(baseAmount);

          return (
            <div key={index} className="bg-card rounded-lg shadow p-4 border border-border">
              <h3 className="text-lg font-medium text-card-foreground mb-2">{person.name}</h3>
              <p className="text-2xl font-bold text-primary">฿{total.toFixed(2)}</p>
              <div className="text-sm text-muted-foreground mt-1 space-y-1">
                <p>Base: ฿{baseAmount.toFixed(2)}</p>
                <p>Service: ฿{serviceAmount.toFixed(2)}</p>
                <p>VAT: ฿{vatAmount.toFixed(2)}</p>
                <p>Total: ฿{total.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentSummary;
