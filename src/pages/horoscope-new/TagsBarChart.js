import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

// Define a set of colors for variety
const COLORS = [
  '#6366F1', // Indigo
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#A855F7', // Purple
  '#14B8A6', // Teal
  '#F43F5E', // Rose
];

const TagsBarChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className='w-full h-[300px] border border-secondary rounded-sm p-5 shadow-sm bg-white pb-10'>
      <h3 className="text-lg font-semibold mb-4 text-center">Tag Insights</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TagsBarChart;
