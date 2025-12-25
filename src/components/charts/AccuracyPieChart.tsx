import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AccuracyPieChart: React.FC = () => {
  const data = [
    { name: 'Correct', value: 75 },
    { name: 'Incorrect', value: 25 },
  ];
  const COLORS = ['#607afb', '#f1f0f4'];

  return (
    <div className="h-[180px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-2xl font-bold text-[#111218]">75%</span>
        <span className="text-[10px] text-[#6e6388] uppercase font-bold tracking-wider">
          Success
        </span>
      </div>
    </div>
  );
};

export default AccuracyPieChart;
