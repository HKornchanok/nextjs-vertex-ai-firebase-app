import React, { useState } from 'react';

interface Person {
  name: string;
}

interface PaymentSummaryProps {
  people: Person[];
  personTotals: Record<string, number>;
  vatRate: number;
  serviceChargeRate: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  people,
  personTotals,
  vatRate,
  serviceChargeRate,
}) => {
  const [roundUp, setRoundUp] = useState(false);
  const roundAmount = (amount: number) => {
    if (!roundUp) return amount;
    return Math.ceil(amount);
  };

  return (
    <div className="card-section h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Payment Summary</h2>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {people.map((person, index) => {
          const subtotal = personTotals[person.name] / (1 + (vatRate + serviceChargeRate) / 100);
          const vatAmount = (subtotal * vatRate) / 100;
          const serviceChargeAmount = (subtotal * serviceChargeRate) / 100;
          const total = roundAmount(personTotals[person.name]);

          return (
            <div key={index} className="bg-card rounded-lg shadow p-4 border border-border">
              <h3 className="text-lg font-medium text-card-foreground mb-2">{person.name}</h3>
              <p className="text-2xl font-bold text-primary">฿{total.toFixed(2)}</p>
              <div className="text-sm text-muted-foreground mt-1 space-y-1">
                <p>Subtotal: ฿{subtotal.toFixed(2)}</p>
                <p>
                  VAT ({vatRate}%): ฿{vatAmount.toFixed(2)}
                </p>
                <p>
                  Service ({serviceChargeRate}%): ฿{serviceChargeAmount.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentSummary;
