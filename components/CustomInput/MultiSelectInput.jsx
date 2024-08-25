"use client"

import { useEffect, useState } from "react"
import { ChevronDown, } from "lucide-react";
import { cn } from "@/lib/utils";


export const MultiselectInput = ({ options, set, show, placeholder, labelName, resetFlagInvoice }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option))
        } else {
            setSelectedOptions([...selectedOptions, option])
        }
    }

    useEffect(() => {
        set(selectedOptions)
    }, [selectedOptions])

    useEffect(() => {
        if (resetFlagInvoice || placeholder == "Select Product") {
            setSelectedOptions([])
        }
    }, [resetFlagInvoice])


    return (
        <>
            <h2 className="font-semibold">{labelName}</h2>
            <div className="relative flex justify-between border shadow-md rounded-md z-10 cursor-pointer p-2 lg:my-2"
                onClick={() => setIsVisible(!isVisible)}>
                <div>{placeholder}</div>
                <div><ChevronDown /></div>
                <div
                    className={cn(
                        "absolute bg-gray-100 -ml-2 top-12 w-full rounded-lg max-h-32 p-3 space-y-3 font-semibold overflow-y-auto ",
                        isVisible ? 'block' : 'hidden'
                    )}
                >
                    {
                        options?.map((option, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "hover:bg-opacity-50 hover:bg-gray-300 rounded-sm px-1 z-20 cursor-pointer w-full",
                                    (!!selectedOptions.length && selectedOptions.includes(option)) && "bg-gray-300 rounded-sm px-1"
                                )}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option[show]}
                            </div>
                        ))
                    }
                </div>
            </div >
        </>
    )
}
