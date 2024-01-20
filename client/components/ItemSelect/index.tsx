/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ControllerRenderProps } from "react-hook-form";

import { LoadingIndicator } from "../LoadingIndicator";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";



// const zItem = z.object({
//   id: z.string(),
//   name: z.string(),
// });

interface ItemsType {
  id: string;
  name?: string | null;
}


interface ItemSelectProps<T> {
  items: (T & ItemsType)[];
  field: ControllerRenderProps<{[x: string]: any}, string>;
  loading?: boolean;
}

export function ItemSelect<T>({ items, field, loading = false }: ItemSelectProps<T>) {
  return (
    <Select
      onValueChange={field?.onChange}
      {...field}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={loading ? (<LoadingIndicator />) : "Select a Category"} />
      </SelectTrigger>

      <SelectContent position="popper">
        {items.map((category, index) => (
          <>
            <SelectLabel>{index}. </SelectLabel>
            <SelectItem 
              className={index % 2 === 0 ? "bg-slate-100 dark:bg-slate-900" : ""}
              key={category.id} 
              value={category.id}
            >
              {category.name}
            </SelectItem>
          </>
        ))}
      </SelectContent>
    </Select>
  );
}