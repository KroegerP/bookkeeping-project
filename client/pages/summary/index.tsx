import { useQuery } from "@apollo/client";
import { groupBy, omit, sum } from "lodash";
import type { NextPage } from "next";
import { useMemo } from "react";

import { CategoryCard } from "@/components/CategoryCard";
import { GetPurchasesDocument, OrderDirection } from "@/generated/graphql";



const SummaryPage: NextPage = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const { data } = useQuery(GetPurchasesDocument, {
    variables: {
      where: {
        date: {
          gte: firstDay.toISOString(),
        },
      },
      orderBy: {
        createdAt: OrderDirection.Desc,
      }, 
    },
  });

  const summaryData = useMemo(() => {
    const groupedData = groupBy(data?.purchases, "category.name");

    return groupedData;
  }, [data?.purchases]);

  console.log(summaryData);

  return (
    <div className="flex basis-1/2 flex-wrap gap-2 py-6">
      {Object.keys(omit(summaryData, "Gain")).map((key) => (
        <CategoryCard 
          key={key}
          category={key}
          value={Math.abs(sum(summaryData[key].map(({ cost }) => cost)))}
        />
      ))}
    </div>
  );
};

export default SummaryPage;