"use client"

import { Pencil, Trash2 } from 'lucide-react';
import { useProductProvider } from '@/components/provider/product-provider';

export const ProductTable = () => {
    const { products, setHasEditingProduct, setAlertVisibleProduct } = useProductProvider()
    return (
        <div className='max-h-[500px] lg:max-h-[700px] lg:w-fit relative rounded-md border border-gray-200 overflow-x-scroll overflow-y-scroll sidebarscroll-hide'>
            <table className="items-center bg-transparent border-collapse">
                <thead className='sticky top-0 w-full bg-customColor-100 text-white uppercase'>
                    <tr>
                        <th className="whitespace-nowrap px-3 text-xs lg:text-lg align-middle py-3 font-semibold">
                            Product Name</th>
                        <th className="whitespace-nowrap px-3 text-xs lg:text-lg align-middle py-3 font-semibold">
                            HSN Code
                        </th>
                        <th className="whitespace-nowrap px-3 text-xs lg:text-lg align-middle py-3 font-semibold">
                            CGST Rate
                        </th>
                        <th className="whitespace-nowrap px-3 text-xs lg:text-lg align-middle py-3 font-semibold">
                            SGST Rate
                        </th>
                        <th className="whitespace-nowrap px-3 text-xs lg:text-lg align-middle py-3 font-semibold" colSpan={2}>Actions
                        </th>

                    </tr>
                </thead>
                <tbody className='lg:text-lg'>
                    {products?.map((item) => (
                        <tr key={item._id} className='h-10 text-center'>
                            <th className="whitespace-nowrap px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg">
                                {item.productName}
                            </th>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg">
                                {item.hsnCode}
                            </td>
                            <td className="px-3 lg:p-3 align-center border-gray-200 border-b text-xs lg:text-lg">
                                {item.cgstRate}
                            </td>
                            <td className="px-3 lg:p-3 align-middle border-gray-200 border-b text-xs lg:text-lg">
                                {item.sgstRate}
                            </td>
                            <td onClick={() => setHasEditingProduct(item)} className="px-3 lg:px-5 lg:my-10 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap cursor-pointer">
                                <Pencil className="text-gray-500" size={20} /></td>
                            <td onClick={() => setAlertVisibleProduct(item._id)} className="px-3 lg:px-5 lg:my-10 align-middle border-gray-200 border-b text-xs lg:text-lg whitespace-nowrap cursor-pointer">
                                <Trash2 className='text-red-500' size={20} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}