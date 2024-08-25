"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useFetchData } from "@/hook/fetchData"

export const ProductContext = createContext(null)

// const PRODUCT_BACKEND_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/product`
const PRODUCT_BACKEND_BASE_URL = `/api/product`

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [hasEditingProduct, setHasEditingProduct] = useState({})
    const [alertVisibleProduct, setAlertVisibleProduct] = useState("")

    const { data, fetchData: getProducts } = useFetchData({
        url: PRODUCT_BACKEND_BASE_URL,
    });
    const { fetchData: newProductAPI } = useFetchData({})

    const { fetchData: editProduct } = useFetchData({})

    const { fetchData: deleteProduct } = useFetchData({})

    const handleCreateProduct = async (value) => {
        try {
            // if (value.productName.length <= 0) {
            //     toast.error("Product Name is Required")
            //     return false
            // }
            // if (value.hsnCode.length <= 0) {
            //     toast.error("HSN Code is Required")
            //     return false
            // }
            // if (value.cgstRate.length <= 0) {
            //     toast.error("CGST Rate is Required")
            //     return false
            // }
            // if (value.sgstRate.length <= 0) {
            //     toast.error("SGST Rate is Required")
            //     return false
            // }
            await newProductAPI({
                _url: PRODUCT_BACKEND_BASE_URL,
                _method: 'POST',
                body: value,
                successMessage: 'Product Created Successfully!',
                errorMessage: 'Failed to Create'
            })
            await getProducts()
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditProduct = async (value) => {
        try {
            // if (value.productName.length <= 0) {
            //     toast.error("Product Name is Required")
            //     return false
            // }
            // if (value.hsnCode.length <= 0) {
            //     toast.error("HSN Code is Required")
            //     return false
            // }
            // if (value.cgstRate.length <= 0) {
            //     toast.error("CGST Rate is Required")
            //     return false
            // }
            // if (value.sgstRate.length <= 0) {
            //     toast.error("SGST Rate is Required")
            //     return false
            // }
            await editProduct({
                _url: `${PRODUCT_BACKEND_BASE_URL}/${value._id}`,
                _method: 'PUT',
                body: value,
                successMessage: `Product Updated Successfully!`,
                errorMessage: 'Failed to Update'
            })
            await getProducts()
            setHasEditingProduct(null)
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct({
                _url: `${PRODUCT_BACKEND_BASE_URL}/${id}`,
                _method: "DELETE",
                successMessage: `Product Deleted Successfully!`,
                errorMessage: 'Failed to Delete'
            })
            await getProducts()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!data) getProducts()
        setProducts(data)
    }, [getProducts,data]);

    return (
        <ProductContext.Provider value={{ products, handleCreateProduct, handleDeleteProduct, handleEditProduct, hasEditingProduct, setHasEditingProduct, alertVisibleProduct, setAlertVisibleProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductProvider = () => {
    const context = useContext(ProductContext)
    if (context === null) {
        throw new Error("useProductProvider must be used within an ProductProvider")
    }
    return context
}

