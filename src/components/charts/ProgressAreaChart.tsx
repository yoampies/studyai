import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ProgressAreaChartProps {
  data: { name: string; files: number }[];
}

const ProgressAreaChart: React.FC<ProgressAreaChartProps> = ({ data }) => (
  <div className="h-[200px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorFiles" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#607afb" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#607afb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f0f4" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6e6388', fontSize: 12 }}
        />
        <YAxis hide />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="files"
          stroke="#607afb"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorFiles)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default ProgressAreaChart;
