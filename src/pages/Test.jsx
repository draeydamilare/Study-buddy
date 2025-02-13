import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb" 
import { Input } from '@/components/ui/input'
import review from "../assets/review.svg";
import upload from '../assets/upload.svg'
import SelectComponent from '@/components/selectComponent';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testSchema } from '@/lib/schema';
import { cloudinaryUpload } from '@/lib/utils';
import { useGeneratQuestionsMutation } from '@/services/TestApiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setQuestions } from '@/services/questionsSlice';

  


const Test = () => {
    const [generateQuestions, {data, isLoading, isSuccess}] = useGeneratQuestionsMutation()
    const [fileName, setFileName] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { register, handleSubmit,  setValue, formState: { errors } } = useForm({
        resolver: zodResolver(testSchema),
        defaultValues:{
            fileUrl: "",
            questionNumber: "",
            title: "",
        }
    });
    
    // FILE UPLOAD TO CLOUDINARY HANDLER
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        try {
            const response = await cloudinaryUpload(file)
            setValue("fileUrl", response)
            setFileName(response)
        } catch (error) {
            console.log(error)
        }
    };

     //GENERATE QUESTIONS SUBMIT FORM
    const onSubmit = async (data) => {
        try {
            const response = await generateQuestions(data).unwrap()
            if(response){
                toast.success("Questions Generated successfully!!")
                dispatch(setQuestions(response))
                navigate('/test-questions')
            }
        } catch (error) {
            console.log(error)
        }
    };


  return (
    <div>
        <Header />
        <div className='mt-20 w-[70%] mx-auto '>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary">Test</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

            <div className='w-full flex items-start justify-between gap-20 py-7'>
                <form onSubmit={handleSubmit(onSubmit)} className='grow h-full flex flex-col gap-6'>
                    <Input type='text' {...register("title")} placeholder='Title of test' className='appearance-none p-8 ' />
                    {errors.title && <p className="text-red-500 text-sm -mt-4">{errors.title.message}</p>}


                    <div className="flex items-center justify-center w-full">
                        <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-[305px] border-2 border-dashed border-[#544837]/30 rounded-lg cursor-pointer bg-transparent"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <img src={upload} className='w-10 h-10 my-4' />
                            <p className="mb-2 text-sm text-gray-600">
                                <span className="font-semibold text-lg">Upload File</span>
                            </p>
                            <p className="text-xs text-gray-500">docx, txt, doc, pdf, json</p>
                            </div>
                            {fileName && (
                            <p className="-mt-2 text-sm text-gray-600 text-ellipsis w-[400px] overflow-hidden">Selected file: {fileName}</p>
                        )}
                            <input id="file-upload" accept=".pdf,.doc,.docx,.txt" type="file" className="hidden" onChange={handleFileChange} />
                        </label>

                        
                    </div>

                    <SelectComponent title='multiple choice' options={['Yes']} />
                    <SelectComponent valueSet={setValue}  title='Number of Questions' options={['5', '10', '15', '20', '25', '30']} />
                    {errors.questionNumber && <p className="text-red-500 text-sm -mt-4">{errors.questionNumber.message}</p>}
           

                    <button type='submit' className='appearance-none w-[187px] h-[54px] rounded-[10px] bg-primary p-1 text-white'>
                      {isLoading ? "Generating" : "Generate Questions"}  
                    </button>
                </form>

                <div className='w-[410px] '>
                    {/* TOP SECTION */}
                    <div className='w-full flex items-center justify-between text-sm my-4'>
                        <p>Test history</p>
                        <Link to='/test-history' className='text-primary cursor-pointer'>See all</Link>
                    </div>

                    {/* TEST HISTORY ARRAY DISPLAY */}
                    <div className='w-full h-max py-4 flex flex-col gap-8'>
                        {[1,2,3].map((items, index) => (
                             <div key={index} className='w-full h-[127px] bg-white drop-shadow-sm rounded-3xl flex flex-col gap-3 p-5'>
                             {/* TEST TITLE AREA */}
                             <div className='w-full flex items-center justify-between'>
                                 <p className='font-semibold'>Test Title</p>
                                 <p className='text-[#121212]/40 text-xs'>08:25 AM . 10/January/2025</p>
                             </div>
                             {/* SCORE AREA */}
                             <div className='w-full flex items-baseline'>
                                 <p className='text-xl font-bold'>40/</p>
                                 <p className='text-sm'>50</p>
                             </div>
     
                             {/* REVIEW AND DURATION AREA */}
                             <div className='w-full flex items-center justify-between'>
                                 <div className='flex items-center gap-1 font-semibold'>
                                     <img src={review} className='w-4 h-4'/>
                                     <p className='text-primary '>Review</p>
                                 </div>
                                 <p className='text-[#111111]/70'>Questions: 50</p>
                                 <p className='text-[#111111]/70'>Duration: 60 mins</p>
                             </div>
                         </div>
                        ))}
                    </div>
                   

                </div>
            </div>
        </div>
    </div>
  )
}

export default Test