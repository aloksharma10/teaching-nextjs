import { CustomerTable } from "@/components/customer/customer-table"
import { CustomerForm } from "@/components/customer/customerform"

export default function Customer  ()  {

    return (
        <div className='lg:flex w-full gap-20 lg:flex-row lg:w-full'>
            <div className="w-full lg:w-1/3">
                <CustomerForm />
            </div>
            <div className='lg:w-2/3 items-center w-full p-6'>
                <h2 className='font-semibold text-lg lg:text-4xl lg:my-5 text-center'>Customer List</h2>
                <CustomerTable />
            </div>
        </div>
    )
} 