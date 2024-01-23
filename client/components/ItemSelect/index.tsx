/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



interface ItemSelectProps {
  items: { id: string; name?: string | null; [x: string]: any }[];
  control: Control<any>;
  loading?: boolean;
}

export function ItemSelect({ items, control, loading = false }: ItemSelectProps) {
  return (
    <FormField 
      name="category"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mr-5">Category</FormLabel> 
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={loading}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={loading ? "Loading" : "Select a Category"} />
              </SelectTrigger>
            </FormControl>

            <SelectContent position="popper">
              {items.map((category, index) => (
                        
                <SelectItem 
                  className={index % 2 === 0 ? "bg-slate-100 dark:bg-slate-900" : ""}
                  key={category.id} 
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
                
        </FormItem>
      )} />
  );
}