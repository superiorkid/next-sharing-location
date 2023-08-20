import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatisticCardProps {
  title: string;
  description: string;
  value: number;
}

function StatisticCard({ value, title, description }: StatisticCardProps) {
  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <strong className="absolute top-1/3 right-7 text-gray-800 text-4xl">
        {value}
      </strong>
    </Card>
  );
}

export default StatisticCard;
