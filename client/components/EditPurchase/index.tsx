import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "../DatePicker";
import { ItemSelect } from "../ItemSelect";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { Purchase } from "@/generated/graphql";
import { UpdatePurchaseDocument  } from "@/generated/graphql";
import { useGetCategories } from "@/hooks";



const formSchema = z.object({
  date: z.date(),
  description: z.string().min(5),
  cost: z.number(), // Weird form thing going on here
  category: z.string(),
}).strict();

interface EditPurchaseDialogProps {
  purchase: Purchase;
  onCancel: () => void;
}

export function EditPurchaseDialog({ purchase, onCancel }: Readonly<EditPurchaseDialogProps>) {
  const { categories, loading } = useGetCategories();

  const [updatePurchase] = useMutation(UpdatePurchaseDocument);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...purchase,
      date: new Date(purchase.date) ?? new Date(),
      category: categories.find((cat) => cat.name === purchase.category.name)?.id ?? "",
    },
  });

  const onSubmit = useCallback(() => {
    const data = form.getValues();
    console.log(data);

    let newTotal = purchase.total;
    if (purchase.cost != data.cost) {
      newTotal = purchase.total + (data.cost - purchase.cost);
    }

    updatePurchase({
      variables: {
        where: {
          id: purchase.id,
        },
        data: {
          date: data.date.toISOString(),
          cost: data.cost,
          description: data.description,
          total: newTotal,
          category: {
            connect: {
              id: data.category,
            },
          },
        },
      },
    });
  }, [form, purchase.cost, purchase.id, purchase.total, updatePurchase]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit &quot;{purchase.description}&quot;</DialogTitle>
        <DialogDescription>
        Edit dialog content
        </DialogDescription>
      </DialogHeader>
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
            items={categories}
            control={form.control}
            loading={loading}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cost</FormLabel>
                <Input 
                  type="number" 
                  step="0.01" 
                  placeholder="0" 
                  {...field} 
                  value={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button onClick={onSubmit}>Update</Button>
            <Button type="reset" variant="secondary">Reset</Button>
            <Button variant="destructive" onClick={onCancel}>Cancel</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}