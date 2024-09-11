"use client";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="name"
            fontSize={12}
            stroke="#0EA5E9"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            fontSize={12}
            stroke="#0EA5E9"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value: number) => [`$${value}`, "Total"]}
            cursor={{ fill: "rgba(3, 105, 161, 0)" }}
          />
          <Legend verticalAlign="top" height={36} />
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <Bar dataKey="total" fill="#0EA5E9" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
