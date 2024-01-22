import { useQuery } from "@apollo/client";
import type { NextPage } from "next";

import { GetPurchasesDocument, OrderDirection } from "@/generated/graphql";



const ChartsPage: NextPage = () => {
  const { data } = useQuery(GetPurchasesDocument, {
    variables: {
      orderBy: [
        { createdAt: OrderDirection.Desc },
        { date: OrderDirection.Desc },
      ],
    },
  });

  console.log(data);

  return (
    <div className="flex justify-center align-middle box-border w-full h-screen bg-slate-700">
      <div className="w-3/4 flex justify-center align-middle">
      </div>
    </div>
  );
};

export default ChartsPage;