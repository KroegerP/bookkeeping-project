

import { RefreshCcw } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Button } from "../ui/button";



const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const fontSize = "24px";

interface TotalDisplayProps {
  total: number;
  refetch: () => void;
  loading: boolean;
}

export function TotalDisplay({ total, refetch, loading }: Readonly<TotalDisplayProps>) {  
  const colorClass = useMemo(() => total > 0 ? "text-green-700 dark:text-green-400" : "text-red-800 dark:text-red-400", [total]);
  
  const totalForRender = useMemo(() => (
    <AnimatedNumbers
      className={colorClass}
      transitions={(index) => ({
        type: "spring",
        duration: index / 4,
      })}
      fontStyle={{ fontSize: fontSize }}
      animateToNumber={loading ? 123_456 : total}
    />
  ), [loading, total, colorClass]);
  
  return (
    <div className="flex flex-col justify-end items-center w-full h-24 p-2 pt-8 rounded border border-slate-300">
      <div className="relative bottom-12 right-32">
        <p className="absolute text-sm">Total: </p>
      </div>
      <div className="relative bottom-[3rem] left-[5.75rem]">
        <Button 
          className="absolute" 
          variant="defaultDark" 
          size="icon" 
          onClick={refetch}
        >
          <RefreshCcw color="white" />
        </Button>
      </div>
      <div className="flex items-center">
        <div className={`${colorClass} text-[24px]`}>$</div>
        {totalForRender}
      </div>
    </div>
  );
}