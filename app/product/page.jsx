import { ProductForm } from "@/components/product/productform"
import { ProductTable } from "@/components/product/product-table"

export default function ProductPage() {

    return (
        <div className='lg:flex w-full gap-20 lg:flex-row lg:w-full'>
            <div className="w-full lg:w-1/3">
                <ProductForm />
            </div>
            <div className='lg:w-2/3 items-center w-full p-6'>
                <h2 className='font-semibold text-lg lg:text-4xl lg:my-5 text-center'>Product List</h2>
                <ProductTable />
            </div>
        </div>
    )
}
