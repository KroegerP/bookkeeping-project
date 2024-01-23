import { useQuery } from "@apollo/client";
import { useMemo } from "react";

import { PurchseForm } from "@/components/PurchaseForm";
import { PurchaseTable } from "@/components/PurchaseTable";
import { TotalDisplay } from "@/components/TotalDisplay";
import { GetMostRecentPurchaseDocument } from "@/generated/graphql";



const Home = () => {
  const { data, loading, refetch } = useQuery(GetMostRecentPurchaseDocument);

  const previousTotal = useMemo(() => data?.purchases?.[0]?.total ?? 0, [data?.purchases]);

  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex flex-col mt-8">
        <div className="mb-12">
          <TotalDisplay total={previousTotal} refetch={() => refetch()} loading={loading}/>
        </div>
        <PurchseForm previousTotal={previousTotal} />
      </div>
      <div>
        
      </div>
      <PurchaseTable />
    </div>
  );
};

export default Home;