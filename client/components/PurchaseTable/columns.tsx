import type { ColumnDef } from "@tanstack/react-table";

import { TableActions } from "./actions";
import type { PurchaseBasicFragment } from "@/generated/graphql";



export const columns: ColumnDef<PurchaseBasicFragment>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (cellProps) => {
      console.log(cellProps);
      const date = new Date(cellProps.row.getValue("date"));

      return <>{date.toLocaleDateString()}</>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: (cellProps) => {
      return <TableActions row={cellProps.row}/>;
    },
  },
];
