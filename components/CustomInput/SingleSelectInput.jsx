"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";


export const CustomInput = ({ options, set, show, placeholder, labelName, className, }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            <h2 className="text-left w-full font-semibold">{labelName}</h2>
            <div className={cn(
                "relative border shadow-md rounded-md cursor-pointer z-10 p-2 lg:my-2 w-full",
                className
            )}
                onClick={() => setIsVisible(!isVisible)}>
                <div className="flex justify-between min-w-full">{placeholder}<ChevronDown /></div>
                <div
                    className={cn(
                        "absolute bg-gray-100 -ml-2 top-12 w-full rounded-lg max-h-32 p-3 space-y-3 font-semibold overflow-y-auto ",
                        isVisible ? 'block' : 'hidden'
                    )}
                >
                    {
                        options?.map((option) => (
                            <div
                                key={option._id}
                                className={cn("hover:bg-opacity-50 hover:bg-gray-300 rounded-sm px-1 z-20 cursor-pointer w-full",
                                    option.customerName === placeholder ? "bg-gray-300 rounded-sm px-1" : "" || option.address === placeholder ? "bg-gray-300 rounded-sm px-1" : ""

                                )}
                                onClick={() => {
                                    set(option)
                                }}>

                                {option[show]}

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}