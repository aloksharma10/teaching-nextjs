

"use client"
import { Payment, columns } from "@/components/customer/column"
import { DataTable } from "@/components/customer/data-table"
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from "react";
import { useProductProvider } from "../provider/product-provider";

// export function getData() {
//     const { customers, setHasEditingCustomer, setAlertVisibleCustomer } = useCustomerProvider()

//     return customers.map((item) => ({
//         id: item.id,
//         customerName: item.customerName,
//         address: item.address,
//         gstIn: item.gstIn,
//         state: item.state,
//         stateCode: item.stateCode,  
//     }));

// }

export default function DemoPageProduct() {
    const { products } = useProductProvider();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the customer data and set it to the state
            const formattedData = customers.map((item) => ({
                id: item.id,
                customerName: item.customerName,
                address: item.address,
                gstIn: item.gstIn,
                state: item.state,
                stateCode: item.stateCode,
            }));
            setData(formattedData);
        };

        fetchData();
    }, [products]); // Only re-run the effect if customers change


    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
