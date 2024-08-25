"use client"

import { createContext, useContext, useState, useEffect, } from "react";
import { useFetchData } from "@/hook/fetchData"

export const InvoiceContext = createContext(null)

const INVOICE_BACKEND_BASE_URL = `/api/invoice`

export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([])
    const [hasEditingInvoice, setHasEditingInvoice] = useState({})
    const [invoiceTemplate, setInvoiceTemplate] = useState({})

    const { data, fetchData: getInvoice } = useFetchData({
        url: INVOICE_BACKEND_BASE_URL
    })

    const { fetchData: newInvoiceAPI } = useFetchData({})

    const { fetchData: editInvoice } = useFetchData({})

    const handleCreateInvoice = async (value) => {
        try {
            // if (value?.invoicedate?.length <= 0) {
            //     toast.error("Invoice Date is Required")
            //     return false

            // }
            // if (!value?.customerId || value?.customerId?.length <= 0) {
            //     toast.error("Customer must be selected")
            //     return false
            // }

            // if (value?.pricedProductIds?.length <= 0 || value?.pricedProductIds?.every((item) => !!item.qty && !!item.rate) <= 0) {
            //     toast.error("Product details must Required")
            //     return false
            // }

            await newInvoiceAPI({
                _url: INVOICE_BACKEND_BASE_URL,
                _method: 'POST',
                body: value,
                successMessage: 'Invoice Created Successfully!',
                errorMessage: 'Failed to Create Invoice!'
            })
            await getInvoice()
            return true
        }
        catch (error) {
            console.log(error)
        }
    };

    const handleEditInvoice = async (value) => {
        try {
            // if (value?.invoicedate?.length <= 0) {
            //     toast.error("Invoice Date is Required")
            //     return false

            // }
            // if (!value?.customerId || value?.customerId?.length <= 0) {
            //     toast.error("Customer must be selected")
            //     return false
            // }

            // if (value?.pricedProductIds?.length <= 0 || value?.pricedProductIds?.every((item) => !!item.qty && !!item.rate) <= 0) {
            //     toast.error("Product details must Required")
            //     return false
            // }
            await editInvoice({
                _url: `${INVOICE_BACKEND_BASE_URL}/${value._id}`,
                _method: 'PUT',
                body: value,
                successMessage: 'Invoice Updated Successfully!',
                errorMessage: 'Failed to Update Invoice!'
            })
            await getInvoice()
            setHasEditingInvoice(null)
            return true
        }
        catch (error) {
            console.log(error)
        }
    }

    // const handleDeleteInvoice = async (id) => {
    //     try {
    //         await deleteInvoice({
    //             _url: `${INVOICE_BACKEND_BASE_URL}/${id}`,
    //             _method: 'DELETE',
    //             successMessage: 'Invoice Deleted Successfully!',
    //             errorMessage: 'Failed to Delete Invoice!'
    //         })
    //         await getInvoice()
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        if (!data) getInvoice()
        setInvoices(data)
    }, [getInvoice, data])

    return (
        <InvoiceContext.Provider value={{ invoices, hasEditingInvoice, setHasEditingInvoice, handleEditInvoice, handleCreateInvoice, invoiceTemplate, setInvoiceTemplate }}>
            {children}
        </InvoiceContext.Provider>
    )
}

export const useInvoiceProvider = () => {
    const context = useContext(InvoiceContext);
    if (context === null) {
        throw new Error('useInvoiceProvider must be used within an InvoiceProvider');
    }
    return context
}
