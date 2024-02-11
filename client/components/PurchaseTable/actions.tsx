import { useMutation } from "@apollo/client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import type { Row } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { useCallback, useState } from "react";

import { EditPurchaseDialog } from "../EditPurchase";
import { Dialog } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdownMenu";
import { useToast } from "../ui/useToast";
import type { Purchase } from "@/generated/graphql";
import { DeletePurchaseDocument, GetMostRecentPurchaseDocument, GetPurchasesDocument } from "@/generated/graphql";



interface TableActionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: Row<Purchase>;
}

export function TableActions({ row }: Readonly<TableActionsProps>) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [deletePurchase] = useMutation(DeletePurchaseDocument, {
    refetchQueries: [GetPurchasesDocument, GetMostRecentPurchaseDocument], 
  });

  const deleteRow = useCallback(() => deletePurchase({
    variables: {
      where: {
        id: row.getValue("id"),
      },
    },
  })
    .then(({ data }) => {
      toast({
        title: "Deleted Purchase",
        description: `${data?.deletePurchase?.description}`,
        duration: 5000,
      });
    })
  , [deletePurchase, row, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger><DotsVerticalIcon /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{row.getValue("description")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <EditIcon size="20px" /> 
            <div className="ml-1">
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteRow()}>
            <Trash size="20px" color="red" />
            <div className="ml-1">
            Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditPurchaseDialog purchase={row.original} onCancel={() => setOpen(false)} />
    </Dialog>
  );
}