import { Button } from "../ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useCustomerProvider } from "@/components/provider/customer-provider"

export const EditandDelete = ({item}) => {
    const { setHasEditingCustomer, setAlertVisibleCustomer } = useCustomerProvider()

    return (
        <>
            <DropdownMenuItem
                onClick={() => setHasEditingCustomer(item)}
            ><Pencil
                    className='text-grey-500 mx-1'
                    size={14}
                />
                <span>Edit Customer</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Trash2
                    onClick={() => handleDeleteCustomer(item._id)}
                    className='text-red-500 mx-1'
                    size={14}
                />
                <span>Delete Customer</span></DropdownMenuItem>
        </>

    )
}

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "customerName",
        header: "Customer Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("customerName")}</div>
        ),
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("address")}</div>
        ),
    },
    {
        accessorKey: "gstIn",
        header: "GSTIN",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("gstIn")}</div>
        ),
    },
    {
        accessorKey: "state",
        header: "State",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("state")}</div>
        ),
    },
    {
        accessorKey: "stateCode",
        header: "State Code",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("stateCode")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EditandDelete item={payment}/>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]