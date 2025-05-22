import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Person {
  name: string;
}

interface PaymentDonutChartProps {
  people: Person[];
  personTotals: Record<string, number>;
}

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--primary)'
];

const PaymentDonutChart: React.FC<PaymentDonutChartProps> = ({ people, personTotals }) => {
  // Transform data for the chart
  const chartData = people.map(person => ({
    name: person.name,
    value: personTotals[person.name] || 0,
  }));

  // Calculate total for percentage display
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="card-section col-span-1 h-[34vh] md:h-[34vh]">
                <h2 className="text-xl font-semibold text-foreground">Payment Distribution</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ bottom: 30 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `฿${value.toFixed(2)} (${((value / total) * 100).toFixed(1)}%)`,
              name
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentDonutChart; 