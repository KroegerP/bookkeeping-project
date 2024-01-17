import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CostInput } from "../CostInput";
import { DatePicker } from "../DatePicker";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";



const DEFAULT_TOTAL = 1000;

const formSchema = z.object({
  date: z.date(),
  description: z.string().min(2),
  cost: z.number(),
  total: z.number(),
  category: z.number(),
});

export function PurchseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      cost: 0,
    },
  });

  const costWatcher = form.watch("cost");

  const totalCalc = useMemo(() => DEFAULT_TOTAL + costWatcher, [costWatcher]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = useCallback((data: any) => console.log(data), []);
  
  return (
    <div className="p-4 max-h-fit bg-slate-400">
      <h1>Enter Data</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 last:${pt-4} justify-center">
          <DatePicker 
            control={form.control} 
            title="Date"
          />
          <FormField 
            name="description"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className="mr-5">Description</FormLabel>
                <FormControl>
                  <Input placeholder="Desription" />
                </FormControl>
              </FormItem>
            )} />
          <CostInput 
            control={form.control} 
            title="Cost"
          />
          <FormField 
            name="total"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className="mr-5">Date</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Date" disabled value={totalCalc} />
                </FormControl>
              </FormItem>
            )} />
          <FormField 
            name="date"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className="mr-5">Date</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Date" />
                </FormControl>
              </FormItem>
            )} />
          <Button type="submit" >Submit</Button>
        </form>
      </Form>
    </div>
  );
}