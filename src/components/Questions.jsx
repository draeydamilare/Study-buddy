import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


function Questions({data, handleSelection}) { 

  return (
    <div>
        {data?.questions?.map((items, index) => {
            //  const isCorrect = selectedAnswers[index] === items.correctAnswer;
            return ( 
            <div key={index} className='w-full flex flex-col gap-3 my-10'>
                <div className='flex items-center gap-2 font-semibold'>
                    <span>{items.label}.</span>
                    <h1>{items.question}</h1>
                </div>
                <RadioGroup onValueChange={(value) => handleSelection(index, value)} defaultValue=''>
                    {items.options.map((a, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem value={a} id={`${index}-${i}`} />
                        <Label htmlFor={`${index}-${i}`}>{a}</Label>
                        {/* {isCorrect && selectedAnswers[index] === a ? (
                            <img src={isCorrect ? pass : fail} alt="status" className="w-5 h-5 ml-2" />
                        ): null} */}
                    </div>
                    ))}
                </RadioGroup>
            </div>
             )
        })}
    </div>
  )
}

export default Questions