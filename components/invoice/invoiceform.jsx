"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { useInvoiceProvider } from "@/components/provider/invoice-provider";
import { useProductProvider } from "@/components/provider/product-provider";
import { useCustomerProvider } from "@/components/provider/customer-provider";
import { formatDate } from "@/lib/utils";

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
import { useForm, useFormContext } from "react-hook-form"
import { CalendarIcon, Check, ChevronsUpDown, PanelsTopLeft } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { MultiSelect } from "../multi-select-1";

const frameworksList = [
    {
      value: "next.js",
      label: "Next.js",
      icon: PanelsTopLeft,
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
      icon: PanelsTopLeft,
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
      icon: PanelsTopLeft,
    },
    {
      value: "remix",
      label: "Remix",
      icon: PanelsTopLeft,
    },
    {
      value: "astro",
      label: "Astro",
      icon: PanelsTopLeft,
    },
  ];

export const InvoiceForm = () => {
    const { invoices, hasEditingInvoice, handleEditInvoice, handleCreateInvoice } = useInvoiceProvider()
    const { products } = useProductProvider()
    const { customers } = useCustomerProvider()

    const formSchemaInvoice = z.object({
        invoicedate: z.date({
            required_error: "Invoice date is required.",
        }),
        customerId: z.string({
            required_error: "Please select a Customer.",
        }),
        address: z.string({
            required_error: "Please select a Customer.",
        }),
        gstIn: z.string({
            required_error: "Please select a Customer.",
        }),
        state: z.string({
            required_error: "Please select a Customer.",
        }),
        stateCode: z.string({
            required_error: "Please select a Customer.",
        }),
        value: z.string({
            required_error: "Please select a Customer.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchemaInvoice),
        defaultValues: {
            invoicedate: "",
            customerId: "",
            address: "",
            gstIn: "",
            state: "",
            stateCode: "",
            frameworks: ["next.js", "nuxt.js"],
        },
    })

    const onSubmit = async (values) => {
        let resetFlagInvoice = false
        if (hasEditingInvoice._id) {
            resetFlagInvoice = await hasEditingInvoice(values);
        } else {
            resetFlagInvoice = await handleCreateInvoice(values);
        }
        if (resetFlagInvoice) {
            form.reset()
        }
        console.log(values)
    }

    console.log(customers, "customers")
    const currCustomerId = form.watch("customerId")

    useEffect(() => {
        const currCustomer = customers.find((customer) => customer._id == currCustomerId)
        if (currCustomerId) {
            form.setValue("address", currCustomer.address)
            form.setValue("gstIn", currCustomer.gstIn)
            form.setValue("state", currCustomer.state)
            form.setValue("stateCode", currCustomer.stateCode)
        }
    }, [currCustomerId])

    const frameworksList = [
        { value: "react", label: "React", icon: Turtle },
        { value: "angular", label: "Angular", icon: Cat },
        { value: "vue", label: "Vue", icon: Dog },
        { value: "svelte", label: "Svelte", icon: Rabbit },
        { value: "ember", label: "Ember", icon: Fish },
    ];


    const [value, setValue] = useState([])

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:mx-14 lg:my-20 items-center p-6 font-semibold w-screen lg:w-full lg:text-xl">


                <FormField
                    control={form.control}
                    name="invoicedate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Invoice Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Select a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Customer</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? customers.find(
                                                    (customer) => customer._id === field.value
                                                )?.customerName
                                                : "Select Customer"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Customer..." />
                                        <CommandList>
                                            <CommandEmpty>No Customer found.</CommandEmpty>
                                            <CommandGroup>
                                                {customers?.map((customer) => (
                                                    <CommandItem
                                                        value={`${customer?.customerName} - ${customer?.address}`}
                                                        key={customer.id}
                                                        onSelect={() => {
                                                            form.setValue("customerId", customer._id)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                customer._id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {`${customer?.customerName} - ${customer?.address}`}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input disabled placeholder="GSTIN" {...field} />
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
                                <Input disabled placeholder="GSTIN" {...field} />
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
                                <Input disabled placeholder="GSTIN" {...field} />
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
                                <Input disabled placeholder="GSTIN" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="frameworks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Frameworks</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    options={frameworksList}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    placeholder="Select options"
                                    variant="inverted"
                                    animation={2}
                                    maxCount={3}
                                />
                            </FormControl>
                            <FormDescription>
                                Choose the frameworks you are interested in.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cgstRate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input placeholder="QTY" {...field} />
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
                            <FormLabel>Rate</FormLabel>
                            <FormControl>
                                <Input placeholder="Rate" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                < Button type="submit" > Create Invoice</Button >
            </form >
        </Form >
    )
}