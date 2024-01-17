import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "../DatePicker";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Select } from "../ui/select";



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
    },
  });

  const costWatcher = form.watch("cost");

  const totalCalc = useMemo(() => DEFAULT_TOTAL + parseFloat(costWatcher.toString()), [costWatcher]);

  console.log(totalCalc);

  useEffect(() => form.setValue("total", totalCalc), [totalCalc, form]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = useCallback<SubmitHandler<z.infer<typeof formSchema>>>(async (data) =>
    console.log(data)
  , []);
  
  return (
    <div className="p-4 max-h-fit bg-slate-400">
      <h1>Enter Data</h1>
      <Form {...form}>
        <form 
          className="flex flex-col gap-2 justify-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <DatePicker 
            control={form.control} 
            title="Date"
          />
          <FormField 
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-5">Description</FormLabel>
                <FormControl>
                  <Input placeholder="Desription" {...field}/>
                </FormControl>
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cost</FormLabel>
                <Input type="number" placeholder="0" {...field}/>
              </FormItem>
            )}
          />
          <FormField 
            name="total"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-5">Total</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Total" {...field} />
                </FormControl>
              </FormItem>
            )} />
          <FormField 
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-5">Category</FormLabel>
                <FormControl>
                  <Select 
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )} />
          <Button type="submit" className="my-4" >Submit</Button>
        </form>
      </Form>
    </div>
  );
}