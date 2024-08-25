"use client"

import { useProductProvider } from '@/components/provider/product-provider';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const ProductForm = () => {
  const { handleCreateProduct, handleEditProduct, hasEditingProduct } = useProductProvider();

  const formSchemaProduct = z.object({
    productName: z.string().min(2, {
      message: "Product name must be at least 2 characters.",
    }),
    hsnCode: z.string(),
    cgstRate: z.string().max(2, {
      message: "CGST Rate cannot be more than 2 characters."
    }),
    sgstRate: z.string().max(2, {
      message: "SGST Rate cannot be more than 2 characters."
    }),
  })

  const form = useForm({
    resolver: zodResolver(formSchemaProduct),
    defaultValues: {
      productName: "",
      hsnCode: "",
      cgstRate: "",
      sgstRate: "",
    },
  })

  const onSubmit = async (values) => {
    let resetFlagProduct = false
    if (hasEditingProduct._id) {
      resetFlagProduct = await handleEditProduct(values);
    } else {
      resetFlagProduct = await handleCreateProduct(values);
    }
    if (resetFlagProduct) { 
      form.reset()
    }
    console.log(values)
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:mx-14 lg:my-20 items-center p-6 font-semibold w-screen lg:w-full lg:text-xl">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hsnCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HSN Code</FormLabel>
              <FormControl>
                <Input placeholder="HSN Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cgstRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CGST Rate</FormLabel>
              <FormControl>
                <Input placeholder="CGST Rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sgstRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SGST Rate</FormLabel>
              <FormControl>
                <Input placeholder="SGST Rate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
