"use client"

import { useEffect, useState } from "react";
import { useInvoiceProvider } from "@/components/provider/invoice-provider";
import { useProductProvider } from "@/components/provider/product-provider";
import { useCustomerProvider } from "@/components/provider/customer-provider";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import MultipleSelector from "../ui/MultipleSelector";
import { ScrollArea } from "@/components/ui/scroll-area"
import { DayPicker } from 'react-day-picker';


export const InvoiceForm = () => {
    const { invoices, hasEditingInvoice, handleEditInvoice, handleCreateInvoice } = useInvoiceProvider()
    const [productsOpt, setProductsOpt] = useState([])
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
        productId: z.string({
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
            productId: [],
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
    const currCustomerId = form.watch("customerId")

    useEffect(() => {
        const currCustomer = customers?.find((customer) => customer._id == currCustomerId)
        if (currCustomerId) {
            form.setValue("address", currCustomer?.address)
            form.setValue("gstIn", currCustomer?.gstIn)
            form.setValue("state", currCustomer?.state)
            form.setValue("stateCode", currCustomer?.stateCode)
        }
    }, [currCustomerId])


    useEffect(() => {
        if (products) {
            const OPTIONS = products?.map((item) => ({
                value: item._id,
                label: item.productName,
                hsnCode: item.hsnCode,
                cgstRate: item.cgstRate,
                sgstRate: item.sgstRate,
            }))
            setProductsOpt(OPTIONS)
        }
    }, [products])

    const selectProduct = form.watch("productId");

    const qtyOfProduct = form.watch("qty")
    const rateOfProduct = form.watch("rate")

    const productTaxableValue = qtyOfProduct * rateOfProduct

    useEffect(() => {


        if (selectProduct) {
            form.setValue("taxableValue", productTaxableValue)
            form.setValue("")
            form.setValue("")
        }

    }, [selectProduct])

    const months = [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"
    ];


    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:mx-14 lg:my-20 items-center p-6 font-semibold w-screen lg:w-full lg:text-xl border">

                <div className="flex gap-5 w-full justify-center items-center">
                    <FormField
                        control={form.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Invoice Number</FormLabel>
                                <FormControl>
                                    <Input disabled placeholder="Invoice Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="month"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Select Month</FormLabel>
                                <FormControl>
                                    <DayPicker
                                        // mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        showOutsideDays={false}
                                        captionLayout="dropdown"
                                        fromYear={2023}
                                        toYear={2025}
                                        footer={null}
                                        mode="month"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="invoicedate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col ">
                                <FormLabel>Invoice Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] text-left font-normal",
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
                </div>

                <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel>Customer</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between",
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
                                <PopoverContent className="w-auto p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Customer..." />
                                        <CommandList>
                                            <ScrollArea className="h-[300px] w-full rounded-md border pr-3">
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
                                            </ScrollArea>
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
                                <Input disabled placeholder="address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-5 w-full">
                    <FormField
                        control={form.control}
                        name="gstIn"
                        render={({ field }) => (
                            <FormItem className="w-full">
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
                            <FormItem className="w-full">
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input disabled placeholder="state" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stateCode"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>State Code</FormLabel>
                                <FormControl>
                                    <Input disabled placeholder="state code" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="productId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Products</FormLabel>
                                <FormControl >
                                        <MultipleSelector
                                            className="p-2"
                                            placeholder="select products..."
                                            {...field}
                                            commandProps={{
                                                className: "border"
                                            }}
                                            defaultOptions={productsOpt || []}
                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {selectProduct?.map(productIds => {
                    // const productName = form.watch(`productName.${framework}`) || 0;
                    // const qty = form.watch(`qtys.${framework}`) || 0;
                    // const rate = form.watch(`rates.${framework}`) || 0;
                    // const cgstRate = form.watch(`cgstRates.${framework}`) || 0;
                    // const sgstRate = form.watch(`sgstRates.${framework}`) || 0;


                    // console.log(framework,"cgstRate")/
                    return (
                        <div key={productIds} className="mt-3 flex gap-5 ">
                            <h3 className="text-lg font-medium mb-2">{productsOpt?.find(opt => opt.value === productIds)?.label}</h3>
                            <FormField
                                control={form.control}
                                name={`${productIds}.label`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input type="string" disabled step="0.01" {...field} defaultValue={productIds.label} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="qty"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" {...field} defaultValue={productIds.qty} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" {...field} defaultValue={productIds.rate} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`${productIds}.taxableValue`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Taxable Value</FormLabel>
                                        <FormControl>
                                            <Input type="number" disabled step="0.01" {...field} defaultValue={productIds.taxableValue} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`${productIds}.cgstRate`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CGST Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" disabled step="0.01" {...field} defaultValue={productIds.cgstRate} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`${productIds}.sgstRate`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SGST Rate</FormLabel>
                                        <FormControl>
                                            <Input type="number" disabled step="0.01" {...field} defaultValue={productIds.sgstRate} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`${productIds}.cgstAmt`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CGST Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" disabled step="0.01" {...field} defaultValue={productIds.cgstAmt} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`${productIds}.sgstAmt`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SGST Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" disabled step="0.01" {...field} defaultValue={productIds.sgstAmt} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`${productIds}.productTotalValue`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Total Value</FormLabel>
                                        <FormControl>
                                            <Input type="number" disabled step="0.01" {...field} defaultValue={productIds.productTotalValue} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                    );
                })}

                <FormField
                    control={form.control}
                    name="totalTaxableValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Taxable Value</FormLabel>
                            <FormControl>
                                <Input disabled placeholder="Total Taxable Value" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="totalTaxGST"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Tax Value</FormLabel>
                            <FormControl>
                                <Input disabled placeholder="Total Tax Value" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="totalInvoiceValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Invoice Value</FormLabel>
                            <FormControl>
                                <Input disabled placeholder="Total Invoice Value" {...field} />
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