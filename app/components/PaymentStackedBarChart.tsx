import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Person {
  name: string;
}

interface Product {
  name: string;
  price: number;
}

interface PaymentStackedBarChartProps {
  people: Person[];
  products: Product[];
  checkboxStates: Record<string, Record<string, boolean>>;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--primary)'
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => {
          if (entry.value > 0) {
            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.name}: ฿{entry.value.toFixed(2)}
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

const PaymentStackedBarChart: React.FC<PaymentStackedBarChartProps> = ({
  people,
  products,
  checkboxStates,
}) => {
  // Transform data for stacked bar chart
  const chartData = products.map(product => {
    const data: Record<string, string | number> = {
      name: product.name,
    };

    // Calculate each person's contribution to this product
    people.forEach(person => {
      if (checkboxStates[product.name]?.[person.name]) {
        // Count how many people are selected for this product
        const selectedPeople = people.filter(p => checkboxStates[product.name]?.[p.name]);
        const splitAmount = product.price / selectedPeople.length;
        data[person.name] = splitAmount;
      } else {
        data[person.name] = 0;
      }
    });

    return data;
  });

  return (
    <div className="card-section col-span-2 h-[30vh]  rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Payment Distribution</h2>
        <div className="flex items-center gap-2">
          {people.map((person, index) => (
            <div key={person.name} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-foreground">{person.name}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'var(--foreground)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={{ stroke: 'var(--border)' }}
          />
          <YAxis 
            tick={{ fill: 'var(--foreground)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={{ stroke: 'var(--border)' }}
            tickFormatter={(value) => `฿${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          {people.map((person, index) => (
            <Bar
              key={person.name}
              dataKey={person.name}
              name={person.name}
              stackId="a"
              fill={COLORS[index % COLORS.length]}
              radius={[4, 4, 0, 0]}
              stroke="var(--border)"
              strokeWidth={1}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentStackedBarChart; 