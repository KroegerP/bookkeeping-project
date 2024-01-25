import { useQuery } from "@apollo/client";
import { useMemo } from "react";

import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { LoadingIndicator } from "../LoadingIndicator";
import { GetPurchasesDocument, OrderDirection } from "@/generated/graphql";



// const paginationSchema = z.object({ take: z.number(), skip: z.number() });

// type PaginationType = z.infer<typeof paginationSchema>;

export function PurchaseTable() {
  // const [pagination, setPagination] = useState<PaginationType>({ take: 10, skip: 0 });
  const { data, loading } = useQuery(GetPurchasesDocument, {
    variables: {
      orderBy: {
        createdAt: OrderDirection.Desc,
      },
    },
  });

  const purchaseData = useMemo(() => [...data?.purchases ?? []], [data]);

  return (
    <div className="container mx-auto py-8">
      {loading ? <LoadingIndicator className="w-full flex justify-center"/> 
        : <DataTable columns={columns} data={purchaseData.sort((a, b) => (a.createdAt ?? "0") < (b.createdAt ?? "0") ? 1 : -1)} />}
    </div>
  );
}
