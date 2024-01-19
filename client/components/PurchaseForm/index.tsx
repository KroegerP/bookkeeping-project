import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "../DatePicker";
import { LoadingIndicator } from "../LoadingIndicator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/useToast";
import { CreatePurchaseDocument, GetCategoriesDocument, GetPurchasesDocument } from "@/generated/graphql";



const ROUNDING_NUMBER = 100;

const formSchema = z.object({
  date: z.date(),
  description: z.string().min(2),
  cost: z.string(), // Weird form thing going on here
  category: z.string(),
});

interface PurchaseFormProps {
  previousTotal: number;
}

export function PurchseForm({ previousTotal }: Readonly<PurchaseFormProps>) {
  const { toast } = useToast();

  const { data: categoryData, loading } = useQuery(GetCategoriesDocument);

  const [createPurchase] = useMutation(CreatePurchaseDocument, { refetchQueries: [GetPurchasesDocument] });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const costWatcher = form.watch("cost");

  const totalCalc = useMemo(() => Math.round((previousTotal * ROUNDING_NUMBER) + (Number.parseFloat(costWatcher ?? "0") * ROUNDING_NUMBER)) / ROUNDING_NUMBER, [previousTotal, costWatcher]);

  const onSubmit = useCallback<SubmitHandler<z.infer<typeof formSchema>>>(async (data) => {
    console.log(data);
    createPurchase({ variables: {
      data: {
        ...data,
        cost: Number.parseFloat(data.cost),
        date: data.date.toISOString(),
        total: totalCalc,
        category: {
          connect: {
            id: data.category,
          },
        },
      },
    } })
      .then((res) => toast({
        title: "Added Purchase",
        description: `${res?.data?.createPurchase?.description}`,
        duration: 5,
      }))
      .then(() => form.resetField("cost"))
      .catch((error) => console.error(error.message));
  }, [createPurchase, form, toast, totalCalc]);
  
  return (
    <div className="p-4 max-h-fit h-fit bg-slate-400 dark:bg-slate-500 rounded">
      <h1 className="mb-4">Enter Data</h1>
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
                  {/* <Input placeholder="Desription" {...field}/> */}
                  <Textarea {...field} />
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
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={loading ? (<LoadingIndicator />) : "Select a Category"} />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      {categoryData?.categories?.map((category, index) => (
                        <SelectItem 
                          className={index % 2 === 0 ? "bg-slate-100 dark:bg-slate-900" : ""}
                          key={category.id} 
                          value={category.id}
                        >
                          {category.name} {index + 1} 
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cost</FormLabel>
                <Input type="float" placeholder="0" {...field}/>
              </FormItem>
            )}
          />
          <FormItem className="flex flex-col">
            <FormLabel>Total</FormLabel>
            <Input type="number" placeholder="Total" disabled value={totalCalc}/>
          </FormItem>
          <Button type="submit" className="my-4" >Submit</Button>
        </form>
      </Form>
    </div>
  );
}