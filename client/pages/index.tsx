import { useQuery } from "@apollo/client";
import { useMemo } from "react";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { PurchseForm } from "@/components/PurchaseForm";
import { PurchaseTable } from "@/components/PurchaseTable";
import { GetMostRecentPurchaseDocument } from "@/generated/graphql";



const Home = () => {
  const { data, loading } = useQuery(GetMostRecentPurchaseDocument);

  const previousTotal = useMemo(() => data?.purchases?.[0]?.total ?? 0, [data?.purchases]);

  return (
    <div className="w-full flex justify-center items-center">
      {loading? <LoadingIndicator /> : <PurchseForm previousTotal={previousTotal} />}
      <PurchaseTable />
    </div>
  );
};

export default Home;