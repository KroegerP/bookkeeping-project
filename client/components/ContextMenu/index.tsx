import type { Row } from "@tanstack/table-core";
import type { ReactNode } from "react";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/contextMenu";



interface Temp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: Row<any>;
  children?: ReactNode | ReactNode[];
}

export function PurchaseContextMenu({ row, children }: Readonly<Temp>) {
  console.log(row); 

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem disabled>{row.getValue("description")}</ContextMenuItem>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function OnContextMenuElement({ row }: Readonly<Temp>) {
  console.log(row); 

  return (
    <div>HI</div>
  );
}