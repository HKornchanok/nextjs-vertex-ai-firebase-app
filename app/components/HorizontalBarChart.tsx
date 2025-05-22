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

interface Product {
  name: string;
  price: number;
}

interface Person {
  name: string;
}

interface HorizontalBarChartProps {
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
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  people,
  products,
  checkboxStates,
}) => {
  // Calculate how many people are assigned to each product
  const chartData = products.map(product => {
    const selectedPeopleCount = people.filter(
      person => checkboxStates[product.name]?.[person.name]
    ).length;

    return {
      name: product.name,
      peopleCount: selectedPeopleCount,
      fill: COLORS[selectedPeopleCount % COLORS.length  - 1]
    };
  });

  return (
    <div className="card-section col-span-2 h-[30vh] rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-foreground">People per Menu Item</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 50, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            type="number" 
            allowDecimals={false}
            tick={{ fill: 'var(--foreground)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={{ stroke: 'var(--border)' }}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={100}
            tick={{ fill: 'var(--foreground)' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={{ stroke: 'var(--border)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="peopleCount"
            fill="fill"
            name="Number of People"
            radius={[0, 4, 4, 0]}
            stroke="var(--border)"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart; 