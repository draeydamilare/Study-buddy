import React from 'react'
 import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function SelectComponent({title, options, valueSet}) {
  return (
    <Select onValueChange={(value) => valueSet ? valueSet('questionNumber',value) : console.log(value)}>
        <SelectTrigger className="w-full p-6">
            <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
            {options.map((option, index) => (
            <SelectItem  key={index} value={option}>{option}</SelectItem>
            ))}
          
        </SelectContent>
    </Select>
  )
}

export default SelectComponent