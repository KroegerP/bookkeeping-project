import { useMemo } from "react";

import type { PurchaseBasicFragment } from "@/generated/graphql";



interface PurchaseChartProps {
  data: PurchaseBasicFragment[];
}

export function PurchaseChart({ data }: Readonly<PurchaseChartProps>) {
  const chartData = useMemo(() => data, [data]);

  return (
    <div>{chartData.length}</div>
  );
}