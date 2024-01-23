import { useQuery } from "@apollo/client";
import type { NextPage } from "next";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { PurchaseChart } from "@/components/PurchaseChart";
import { GetPurchasesDocument, OrderDirection } from "@/generated/graphql";



const ChartsPage: NextPage = () => {
  const { data, loading } = useQuery(GetPurchasesDocument, {
    variables: {
      orderBy: [
        { createdAt: OrderDirection.Desc },
        { date: OrderDirection.Desc },
      ],
    },
  });

  return (
    <div className="flex flex-col justify-center bg-slate-700">
      {loading ? <LoadingIndicator /> : <PurchaseChart data={data?.purchases ?? []}/>}
    </div>
  );
};

export default ChartsPage;