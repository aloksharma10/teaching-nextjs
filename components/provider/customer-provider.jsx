"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { useFetchData } from "@/hook/fetchData";

export const CustomerContext = createContext(null)

const CUSTOMER_BACKEND_BASE_URL = `/api/customer`
// https://backend-ycni.onrender.com

export const CustomerProvider = ({ children }) => {

    const [customers, setCustomers] = useState([])
    const [hasEditingCustomer, setHasEditingCustomer] = useState({})
    const [alertVisibleCustomer, setAlertVisibleCustomer] = useState("")


    const { data, fetchData: getCustomers } = useFetchData({
        url: CUSTOMER_BACKEND_BASE_URL,
    })

    const { fetchData: newCustomerAPI } = useFetchData({})

    const { fetchData: editCustomer } = useFetchData({})

    const { fetchData: deleteCustomer } = useFetchData({})

    const handleCreateCustomer = async (value) => {
        try {
            // if (value.customerName.length <= 0) {
            //     toast.error("Customer Name is Required")
            //     return false
            // }
            // if (value.address.length <= 0) {
            //     toast.error("Address is Required")
            //     return false
            // }
            // if (value.gstin.length <= 0) {
            //     toast.error("GSTIN is Required")
            //     return false
            // }
            // if (value.state.length <= 0) {
            //     toast.error("State is Required")
            //     return false
            // }
            // if (value.stateCode.length <= 0) {
            //     toast.error("State Code is Required")
            //     return false
            // }
            await newCustomerAPI({
                _url: CUSTOMER_BACKEND_BASE_URL,
                _method: 'POST',
                body: value,
                successMessage: 'Customer Created Successfully',
                errorMessage: 'Failed to Create Customer'
            })
            await getCustomers()
            return true
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleEditCustomer = async (value) => {
        try {
            // if (value.customerName.length <= 0) {
            //     toast.error("Customer Name is Required")
            //     return false 
            // }
            // if (value.address.length <= 0) {
            //     toast.error("Address is Required")
            //     return false
            // }
            // if (value.gstin.length <= 0) {
            //     toast.error("GSTIN is Required")
            //     return false
            // }

            // if (value.state.length <= 0) {
            //     toast.error("State is Required")
            //     return false
            // }

            // if (value.stateCode.length <= 0) {
            //     toast.error("State Code is Required")
            //     return false
            // }

            await editCustomer({
                _url: `${CUSTOMER_BACKEND_BASE_URL}/${value._id}`,
                _method: 'PUT',
                body: value,

                successMessage: 'Customer Updated Successfully',
                errorMessage: 'Failed to Update Customer'
            })
            await getCustomers()
            setHasEditingCustomer(null)
            return true

        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteCustomer = async (id) => {
        try {
            await deleteCustomer({
                _url: `${CUSTOMER_BACKEND_BASE_URL}/${id}`,
                _method: 'DELETE',
                successMessage: 'Customer Deleted Successfully',
                errorMessage: 'Failed to Delete Customer'
            })
            await getCustomers()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!data) getCustomers()
        setCustomers(data)
    }, [getCustomers, data])

    return (
        <CustomerContext.Provider value={{ customers, handleCreateCustomer, handleDeleteCustomer, handleEditCustomer, hasEditingCustomer, setHasEditingCustomer, setAlertVisibleCustomer, alertVisibleCustomer }}>
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomerProvider = () => {
    const context = useContext(CustomerContext)
    if (context === null) {
        throw new Error("useCustomerProvider must be used within an CustomerProvider")
    }
    return context
}