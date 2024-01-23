

import { RefreshCcw } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Button } from "../ui/button";



const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});



interface TotalDisplayProps {
  total: number;
  refetch: () => void;
  loading: boolean;
}

export function TotalDisplay({ total, refetch, loading }: Readonly<TotalDisplayProps>) {  
  const totalForRender = useMemo(() => (
    <AnimatedNumbers
      transitions={(index) => ({
        type: "spring",
        duration: index / 4,
      })}
      fontStyle={{ fontSize: "24px" }}
      animateToNumber={loading ? 123_456 : total}
    />
  ), [loading, total]);
  
  return (
    <div className="flex flex-col items-center w-full p-4 pt-8 rounded border border-slate-300">
      <div className="relative bottom-8 right-32">
        <p className="absolute text-sm">Total: </p>
      </div>
      <div className="relative bottom-7 left-[5.2rem]">
        <Button 
          className="absolute" 
          variant="defaultDark" 
          size="sm" 
          onClick={refetch}
        >
          <RefreshCcw color="white" />
        </Button>
      </div>
      <div>
        {totalForRender}
      </div>
    </div>
  );
}