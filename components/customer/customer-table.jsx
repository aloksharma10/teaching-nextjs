"use client"

import {  columns } from "@/components/customer/column"
import { DataTableDemo } from "@/components/customer/data-table"
import { useEffect, useState } from "react";
import { useCustomerProvider } from "../provider/customer-provider";

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

export default function CustomerTable() {
    const { customers } = useCustomerProvider();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the customer data and set it to the state
            const formattedData = customers?.map((item) => ({
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
    }, [customers]); // Only re-run the effect if customers change

    return (
        <div className="container mx-auto py-10">
            <DataTableDemo data={data} columns={columns} />
        </div>
    )
}
