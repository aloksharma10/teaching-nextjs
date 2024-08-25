"use client"

import { Pencil, Trash2 } from 'lucide-react';
import { useCustomerProvider } from '@/components/provider/customer-provider';

export const CustomerTable = () => {
    const { customers, setHasEditingCustomer, setAlertVisibleCustomer } = useCustomerProvider();

    return (
        <>
                <div className='max-h-[500px] lg:max-h-[700px] lg:max-w-[900px] relative rounded-md border border-gray-200 overflow-x-scroll overflow-y-scroll sidebarscroll-hide'>
                    <table className="items-center bg-transparent border-collapse w-full">
                        <thead className='sticky top-0 w-full bg-customColor-100 text-white uppercase'>
                            <tr>
                                <th className="px-3 text-xs lg:text-lg align-middle py-3 whitespace-nowrap font-semibold">
                                    Customer Name</th>
                                <th className="px-3 text-xs lg:text-lg align-middle py-3 whitespace-nowrap font-semibold">
                                    Address
                                </th>
                                <th className="px-3 text-xs lg:text-lg align-middle py-3 whitespace-nowrap font-semibold">
                                    GSTIN
                                </th>
                                <th className="px-3 text-xs lg:text-lg align-middle py-3 whitespace-nowrap font-semibold">
                                    State
                                </th>
                                <th className="px-3 text-xs lg:text-lg align-middle py-3 whitespace-nowrap font-semibold">
                                    State Code
                                </th>

                                <th className="px-3 text-xs lg:text-lg align-middle py-3 whitespace-nowrap font-semibold" colSpan={2}>
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody className='lg:text-lg'>
                            {customers?.map((item) => (
                                <tr key={item._id} className='h-10 text-center'>
                                    <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                        {item.customerName}
                                    </td>
                                    <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                        {item.address}
                                    </td>
                                    <td className="px-3 lg:p-3 align-center border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                        {item.gstin}
                                    </td>
                                    <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                        {item.state}
                                    </td>
                                    <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap">
                                        {item.stateCode}
                                    </td>
                                    <td onClick={() => setHasEditingCustomer(item)} className="px-3 lg:px-5 lg:my-10 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap cursor-pointer">
                                        <Pencil className="text-gray-500" size={20} /></td>
                                    <td onClick={() => setAlertVisibleCustomer(item._id)} className="px-3 lg:px-5 lg:my-10 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap cursor-pointer">
                                        <Trash2 className='text-red-500' size={20} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </>
    )
} 