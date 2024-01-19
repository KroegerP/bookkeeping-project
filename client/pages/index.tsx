import { useQuery } from "@apollo/client";
import { useMemo } from "react";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { PurchseForm } from "@/components/PurchaseForm";
import { GetPurchasesDocument, OrderDirection } from "@/generated/graphql";



const Home = () => {
  const { data, loading } = useQuery(GetPurchasesDocument, {
    variables: {
      orderBy: [
        { date: OrderDirection.Desc },
        { id: OrderDirection.Desc },
      ],
    },
  });

  const previousTotal = useMemo(() => data?.purchases?.[0]?.total ?? 0, [data?.purchases]);

  return (
    <div className="flex justify-center h-screen">
      <div className="w-3/4 flex justify-center items-center">
        {loading? <LoadingIndicator /> : <PurchseForm previousTotal={previousTotal} />}
      </div>
    </div>
  );
};

export default Home;