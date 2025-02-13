import Header from '@/components/Header';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb" 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useGetMyTestsQuery, useGetSingleTestQuery } from '@/services/TestApiSlice'
import React from 'react'
import { Link, useParams } from 'react-router';
import fail from '../assets/fail.svg';
import pass from '../assets/pass.svg';

function Review() {
    const params = useParams()
    const {data} = useGetSingleTestQuery(params.id);
  return (
   <div>
    <Header />
    <div className='mt-20 w-[90%] mx-auto '>
         <div className='w-full flex items-center justify-between'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink> <Link to='/'>Home</Link> </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink> <Link to='/test'>Test</Link> </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink> <Link to='/test-history'>History</Link> </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primary">Reviews</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        {data?.questions?.map((items, index) => {
             const isCorrect = items.selectedAnswers === items.correctAnswer;
             const initial = items.options.indexOf(items.selectedAnswer)
             console.log(items.options[initial])
            return ( 
            <div key={index} className='w-full flex flex-col gap-3 my-10'>
                <div className='flex items-center gap-2 font-semibold'>
                    <span>{items.label}.</span>
                    <div className='flex items-center gap-3'>
                        <h1>{items.question} </h1>
                        
                        <h1 className={`${isCorrect ? 'text-[#11B24F]' : "text-[#EE0202]"}`} >{isCorrect ? "PASSED" : "FAILED"}</h1>
                    </div>
                </div>



                <RadioGroup onValueChange={(value) => handleSelection(index, value)} defaultValue={items.options[initial]}>
                    {items.options.map((a, i) => {
                        
                        return (
                        <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem value={a}  id={`${index}-${i}`} />
                            <Label htmlFor={`${index}-${i}`}>{a}</Label>
                            {items.correctAnswer === a && isCorrect ? (
                                <img src={pass} alt="status" className="w-5 h-5 ml-2" />
                            ): (<img src={fail} alt="status" className="w-5 h-5 ml-2" />)}
                        </div>
                        )
        })}
                </RadioGroup>
            </div>
            )
        })}
       </div>
    </div>
  )
}

export default Review