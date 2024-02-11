import { useQuery } from "@apollo/client";

import { GetCategoriesDocument } from "@/generated/graphql";



export function useGetCategories() {
  const { data: categoryData, loading } = useQuery(GetCategoriesDocument, { fetchPolicy: "cache-and-network" });


  return { categories: categoryData?.categories ?? [], loading };
}