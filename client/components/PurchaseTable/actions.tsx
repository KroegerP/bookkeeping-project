import { useMutation } from "@apollo/client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import type { Row } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { useCallback } from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdownMenu";
import { useToast } from "../ui/useToast";
import { DeletePurchaseDocument, GetMostRecentPurchaseDocument, GetPurchasesDocument } from "@/generated/graphql";



interface TableActionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: Row<any>;
}

export function TableActions({ row }: Readonly<TableActionsProps>) {
  const { toast } = useToast();
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
    <DropdownMenu>
      <DropdownMenuTrigger><DotsVerticalIcon /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{row.getValue("description")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
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
  );
}

//     <Select>
//       <SelectTriggerCustomIcon iconOverride={<DotsVerticalIcon />}></SelectTriggerCustomIcon>
//       <SelectContent>
//         <SelectGroup title={`${row.getValue("description")}`}>
//           <SelectItem value="edit">
//             <div className="flex flex-row justify-between">
//               <EditIcon size="20px" /> <div className="ml-1">Edit</div>
//             </div>
//           </SelectItem>
//           <SelectItem value="delete">
//             <div className="flex flex-row justify-between">
//               <Trash size="20px" /> <div className="ml-1">Delete</div>
//             </div>
//           </SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }