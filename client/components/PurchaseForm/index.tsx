import type { ApolloError } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "../DatePicker";
import { ItemSelect } from "../ItemSelect";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/useToast";
import { CreatePurchaseDocument, GetCategoriesDocument, GetMostRecentPurchaseDocument, GetPurchasesDocument } from "@/generated/graphql";



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

  const [createPurchase] = useMutation(CreatePurchaseDocument, {
    refetchQueries: [GetPurchasesDocument, GetMostRecentPurchaseDocument],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      category: "",
      cost: "",
    },
  });

  useEffect(() => {
    form.reset();
  }, [form, form.formState.isSubmitSuccessful]);

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
      .then(({ data }) => {
        toast({
          title: "Added Purchase",
          description: `${data?.createPurchase?.description}-${new Date(data?.createPurchase?.date ?? "0").toISOString()}`,
          duration: 5000,
        });
      })      
      .catch((error: ApolloError) => {
        toast({
          title: "Error creating purchase",
          description: `${error.message}`,
          duration: 5000,
        });
      });
  }, [createPurchase, form, toast, totalCalc]);
  
  return (
    <div className="p-4 bg-slate-400 dark:bg-slate-500 rounded">
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
                  <Textarea {...field} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <ItemSelect 
            items={categoryData?.categories ?? []}
            control={form.control}
            loading={loading}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cost</FormLabel>
                <Input type="float" placeholder="0" {...field} value={field.value}/>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormItem className="flex flex-col">
            <FormLabel>Total</FormLabel>
            <Input type="number" placeholder="Total" disabled value={totalCalc}/>
          </FormItem> */}
          <Button type="submit" className="my-4" >Submit</Button>
        </form>
      </Form>
    </div>
  );
}