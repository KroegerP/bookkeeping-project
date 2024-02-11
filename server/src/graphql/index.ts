import type { Context } from ".keystone/types";
import { graphql } from "@keystone-6/core";

import { OrderDirection } from "../../generated/graphql";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortItems(a: any , b: any) {          
  if (a.createdAt === b.createdAt || !a.createdAt || !b.createdAt) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  return a.createdAt > b.createdAt ? 1 : -1;
}


export const extendGraphqlSchema = graphql.extend((base) => {
  return {
    query: {
      getOrderedPurchases: graphql.field({
        type: base.object("Purchase"),
        args: { 
          cutOffDate: graphql.arg({ type: graphql.DateTime }),
        },
        async resolve(source, { cutOffDate }, context: Context) {
          const initialSort = await context.db.Purchase.findMany({
            where: cutOffDate ? {
              date: {
                lte: cutOffDate.toISOString(),
              },
            } : undefined,
            orderBy: {
              createdAt: OrderDirection.Desc,
            },
          });

          const finalSort = initialSort.toSorted(sortItems);
          
          
          return finalSort;
        },
      }),
    },
  };
});