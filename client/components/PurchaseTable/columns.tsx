import type { ColumnDef } from "@tanstack/react-table";

import type { PurchaseBasicFragment } from "@/generated/graphql";



export const columns: ColumnDef<PurchaseBasicFragment>[] = [
  {
    accessorKey: "description",
    header: "Description",
    // cell: (cellProps) => {
    //   const desc = cellProps.row.getValue("description") as string;

    //   return <PurchaseContextMenu row={cellProps.row}>
    //     {desc}
    //   </PurchaseContextMenu>;
    // },
  },
  {
    accessorKey: "cost",
    header: "Cost",
    // cell: (cellProps) => {
    //   const cost = Number.parseFloat(cellProps.row.getValue("cost"));

    //   return <div className="w-[40px]">{cost}</div>;
    // },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (cellProps) => {
      console.log(cellProps);
      const date = new Date(cellProps.row.getValue("date"));

      return <div>{date.toLocaleDateString()}</div>;
    },
  },
];
