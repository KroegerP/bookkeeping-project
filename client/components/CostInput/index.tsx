import type { Control } from "react-hook-form";

import { FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";



interface CostInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  title?: string;
}

export function CostInput({ control, title }: CostInputProps) {
  return ( 
    <FormField
      control={control}
      name="cost"
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>{title}</FormLabel>
          <Input />
        </FormItem>
      )}
    />
  );
}