import { Trash2 } from "lucide-react"
import { useProductProvider } from "./Provider/Product-Provider"

export const AlertDialogProduct = ({ id, title }) => {

    const { handleDeleteProduct, setAlertVisibleProduct } = useProductProvider()

    return (
        <div className="w-screen h-screen fixed bg-gray-200 bg-opacity-50 flex justify-center items-center z-30">
            <div className="w-80 lg:w-2/6 shadow-lg p-5 rounded-lg bg-gray-50">
                <div className="text-lg lg:text-2xl font-bold flex items-center gap-2">
                    <div>
                        <Trash2 className='text-red-700' />
                    </div>
                    <div>{title}</div>
                </div>
                <p className="w-full text-sm lg:text-md my-2 text-gray-700">
                    Are you sure want to delete. This action can't be revert?
                </p>
                <div className="flex justify-center lg:justify-end items-center gap-3 pt-3">
                    <button onClick={() => {
                        setAlertVisibleProduct(null)
                    }} className="px-4 py-2 bg-customColor-50 rounded-full hover:bg-customColor-100 text-customColor-100 hover:text-white font-semibold">Cancel</button>
                    <button onClick={() => {
                        handleDeleteProduct(id)
                        setAlertVisibleProduct(null)
                    }} className="px-4 py-2 text-white rounded-full bg-customColor-100 hover:text-white font-semibold">Delete</button>
                </div>
            </div>
        </div>
    )
}