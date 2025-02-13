import Header from '@/components/Header'
import { Input } from '@/components/ui/input'
import React from 'react'
import { CgSearch } from "react-icons/cg";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb" 
import { Link, useNavigate } from 'react-router';
import question from '../assets/question.svg'
import duration from '../assets/duration.svg';
import { useGetMyTestsQuery } from '@/services/TestApiSlice';

function TestHistory() {
    const {data} = useGetMyTestsQuery();
    const navigate = useNavigate()

    console.log(data)
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
                            <BreadcrumbPage className="text-primary">History</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='w-[561px] h-[62px] relative'>
                    <Input className='w-full h-full px-16 bg-[#F5F5F5]' placeholder='search Tests' />
                    <CgSearch className='absolute top-5 left-7 w-6 h-6' />
                </div>
            </div>

            <div className='w-full h-full flex items-center flex-wrap gap-7 my-10'>
                {data?.map((item, index) => (
                    <div key={item._id} className='w-[300px] 2xl:w-[310px] h-[146px] bg-white flex flex-col gap-3 drop-shadow-sm rounded-2xl p-3'>
                        <div className='w-full flex items-center justify-between'>
                            <p className='font-semibold'>{item.title}</p>
                            <p className='text-[#121212]/40 text-[10px]'>08:25 AM . 10/January/2025</p>
                        </div>
                        <div className='w-full flex items-baseline gap-3'>
                            <div className='flex items-center gap-1'>
                                <img src={question} className='' />
                                <p className=''>50</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <img src={duration} className='' />
                                <p className=''>60 Mins</p>
                            </div>
                        </div>
                        <div className='w-full h-[.7px] bg-[#544837]/10'></div>
                        <div className='w-full flex items-center justify-between'>
                            <button onClick={() => navigate(`/review/${item._id}`)} className='w-[96px] h-[33px] appearance-none bg-primary text-white text-sm rounded-2xl px-5'>
                                Review
                            </button>
                            <div className='flex items-baseline'>
                                <p className='text-xl font-bold'>{item.totalScore}/</p>
                                <p className='text-sm'>{item.questions.length}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default TestHistory