import dynamic from "next/dynamic";
import type { Layout } from "plotly.js";

import type { PurchaseBasicFragment } from "@/generated/graphql";



const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

const defaultLayout = { title: "Purchases Chart", xaxis: { title: "Date" }, yaxis: { title: "Total" } };

interface PurchaseChartProps {
  data: PurchaseBasicFragment[];
  layout?: Partial<Layout>;
}

export function PurchaseChart({ data, layout }: Readonly<PurchaseChartProps>) {
  return (
    <>
      <Plot 
        data={[
          {
            x: data.map(({ date }) => date),
            y: data.map(({ total }) => total),
            type: "scatter",
            mode: "lines",
          },
        ]}
        layout={{ ...defaultLayout, ...layout }}
      />
    </>
  );
}