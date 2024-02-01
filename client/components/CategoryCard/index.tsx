import { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { categoryLimits } from "@/constants";



interface CategoryCardProps {
  category: string;
  value: number;
}

const categoryColorOptions = {
  none: "bg-green-400 dark:bg-green-700",
  low: "bg-lime-400 dark:bg-lime-700",
  medium: "bg-yellow-400 dark:bg-yellow-700",
  high: "bg-orange-400 dark:bg-orange-700",
  veryHigh: "bg-red-400 dark:bg-red-700",
};

export function CategoryCard({ category, value }: Readonly<CategoryCardProps>) {
  const categoryLimitVal = useMemo(() => categoryLimits[category as keyof typeof categoryLimits], [category]);

  const categoryColor = useMemo(() => {
    const ratio = value / categoryLimitVal;
    if (ratio < 0.2) {
      return categoryColorOptions.none;
    } else if (ratio < 0.4) {
      return categoryColorOptions.low;
    } else if (ratio < 0.6) {
      return categoryColorOptions.medium;
    } else if (ratio < 0.8) {
      return categoryColorOptions.high;
    } else {
      return categoryColorOptions.veryHigh;
    }
  }, [categoryLimitVal, value]);
  
  return (
    <Card className={categoryColor}>
      <CardHeader>
        <CardTitle>{category}</CardTitle>
        {/* <CardDescription>PlaceholderText</CardDescription> */}
      </CardHeader>
      <CardContent >
        {value.toFixed(2)} / {categoryLimitVal}
        <Progress value={(value / categoryLimitVal) * 100}/>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}