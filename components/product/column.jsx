"use client"

import { ColumnDef } from "@tanstack/react-table"

export const Payment = {
    id: String,
    productName: String,
    hsnCode: Number,
    cgstRate: Number,
    sgstRate: Number,
}

export const columns = [
    {
        accessorKey: "productName",
        header: "productName",
    },
    {
        accessorKey: "hsnCode",
        header: "hsnCode",
    },
    {
        accessorKey: "cgstRate",
        header: "cgstRate",
    },
    {
        accessorKey: "sgstRate",
        header: "sgstRate",
    },
  
]