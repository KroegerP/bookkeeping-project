import type { ColumnDef } from "@tanstack/react-table";

import { TableActions } from "./actions";
import type { PurchaseBasicFragment } from "@/generated/graphql";



export const columns: ColumnDef<PurchaseBasicFragment>[] = [
  {
    accessorKey: "description",
    header: "Description",
    size: 800,
  },
  {
    accessorKey: "cost",
    header: "Cost",
    size: 300,
    cell: (cellProps) => {
      const cost: string | undefined = cellProps.row.getValue("cost");

      return (
        <div className={`${cost?.toString().startsWith("-") ? "text-red-800 dark:text-red-400" : "text-green-700 dark:text-green-400"}`}>
          {cost ?? "NO DATA"}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    size: 150,
    cell: (cellProps) => {
      const total: string | undefined = cellProps.row.getValue("total");

      return (
        <div className={`${total?.toString().startsWith("-") ? "text-red-800 dark:text-red-400" : "text-green-700 dark:text-green-400"}`}>
          {total}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 100,
    cell: (cellProps) => {
      const date = new Date(cellProps.row.getValue("date"));

      return <>{date.toLocaleDateString()}</>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    size: 50,
    cell: (cellProps) => {
      return <TableActions row={cellProps.row}/>;
    },
  },
];
