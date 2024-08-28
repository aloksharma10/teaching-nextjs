"use client"

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
import { useCustomerProvider } from "@/components/provider/customer-provider";

export const CustomerForm = () => {
  const {hasEditingCustomer, handleEditCustomer, handleCreateCustomer } = useCustomerProvider()

  const formSchemaCustomer = z.object({
    customerName: z.string().min(2, {
      message: "Customer name must be at least 2 characters.",
    }),
    address: z.string(),
    gstIn: z.string(),
    state: z.string(),
    stateCode: z.string(),
  })

  const form = useForm({
    resolver: zodResolver(formSchemaCustomer),
    defaultValues: {
      customerName: "",
      address: "",
      gstIn: "",
      state: "",
      stateCode: "",
    },
  })

  const onSubmit = async (values) => {
    let resetFlagCustomer = false
    if (hasEditingCustomer._id) {
      resetFlagCustomer = await handleEditCustomer(values);
    } else {
      resetFlagCustomer = await handleCreateCustomer(values);
    }
    if (resetFlagCustomer) {
      form.reset()
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:mx-14 lg:my-20 items-center p-6 font-semibold w-screen lg:w-full lg:text-xl">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input placeholder="Customer Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gstIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GSTIN</FormLabel>
              <FormControl>
                <Input placeholder="GSTIN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stateCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State Code</FormLabel>
              <FormControl>
                <Input placeholder="state code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}