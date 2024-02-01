import { useQuery } from "@apollo/client";
import { SelectValue } from "@radix-ui/react-select";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { PurchaseChart } from "@/components/PurchaseChart";
import { TIME_FRAME_OPTIONS, getISOString } from "@/components/PurchaseChart/utils";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { GetPurchasesDocument, OrderDirection } from "@/generated/graphql";



const ChartsPage: NextPage = () => {
  const [timeFrame, setTimeFrame] = useState<string>("All Time");
  const { data, refetch } = useQuery(GetPurchasesDocument, {
    variables: {
      orderBy: [
        { createdAt: OrderDirection.Desc },
        { date: OrderDirection.Desc },
      ],
    },
  });

  useEffect(() => {
    const isoString = getISOString(timeFrame);

    refetch({
      where: {
        date: {
          gte: isoString,
        },
      },
    });
  }, [timeFrame, refetch]);

  return (
    <div className="flex flex-col justify-center items-center h-full py-6">
      <div className="flex justify-start w-[200px] pb-4">
        <Select 
          onValueChange={(value) => setTimeFrame(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Time Frame"/>
          </SelectTrigger>
          <SelectContent>
            {TIME_FRAME_OPTIONS.map((timeFrame) => (
              <SelectItem key={timeFrame.label} value={timeFrame.label}>
                {timeFrame.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <PurchaseChart 
        data={data?.purchases ?? []}
      />
    </div>
  );
};

export default ChartsPage;