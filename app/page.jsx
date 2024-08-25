"use client"

import { NotepadText, Pencil } from 'lucide-react';
import { useInvoiceProvider } from '@/components/provider/invoice-provider';
import Link from 'next/link';

export default function InvoiceTable() {

    const { invoices, setHasEditingInvoice, setInvoiceTemplate } = useInvoiceProvider()

    return (
        <div className='lg:max-w-screen-2xl max-h-[750px] lg:max-h-[880px] overflow-x-scroll overflow-y-scroll m-6 lg:mx-20 sidebarscroll-hide relative rounded-md'>
            <table className="items-center border-collapse border border-gray-200 ">
                <thead className='sticky top-0 w-full bg-customColor-100 text-white uppercase'>
                    <tr>
                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold" colSpan={2}>
                            Actions
                        </th>
                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold ">
                            Invoice Number</th>
                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold ">
                            Invoice Date
                        </th>
                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold ">
                            Customer Name
                        </th>
                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold ">
                            Customer Address
                        </th>
                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold ">
                            Product Name
                        </th>

                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold ">
                            Total Taxable Value
                        </th>
                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold ">
                            Total Tax GST
                        </th>
                        <th className=" p-3 text-xs lg:text-lg align-middle whitespace-nowrap font-semibold ">
                            Total Invoice Value
                        </th>

                    </tr>
                </thead>

                <tbody className='lg:text-lg'>
                    {invoices?.map((item) => (
                        <tr key={item._id} className='h-12 text-center'>
                            <td onClick={() => setInvoiceTemplate(item)} className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg">
                                <Link href={"/invoice/download"}>
                                    <NotepadText className='text-red-500' size={20} />
                                </Link>
                            </td>
                            <td onClick={() => setHasEditingInvoice(item)} className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg">
                                <Link href={"/invoice"}>
                                    <Pencil className="text-gray-500" size={20} />
                                </Link>
                            </td>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                {item.id}
                            </td>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                {new Date(item.invoicedate).toLocaleString()}
                            </td>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                {item.customerId?.customerName}
                            </td>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap ">
                                {item.customerId?.address}
                            </td>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap ">
                                {item.pricedProductIds?.productId?.productName}
                            </td>
                            <td className="px-3 lg:p-3 align-center border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                {item.totalTaxableValue}
                            </td>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                {item.totalTaxGST}
                            </td>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                {item.totalInvoiceValue}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
} 