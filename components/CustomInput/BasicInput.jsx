import { cn } from "@/lib/utils"


export const Input = ({ labelName, handleChange, value, iName, type, disabled = false, className }) => {
    return (
        <div className="my-3 w-full">
            <h2 className="font-semibold">{labelName}</h2>
            <input onChange={handleChange} value={value} name={iName} disabled={disabled}
                className={cn(
                    "border shadow-md rounded-md p-2 lg:my-2 w-full cursor-pointer",
                    className
                )} type={type} />
        </div>
    )
}