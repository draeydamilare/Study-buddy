import Header from '@/components/Header'
import React, { useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb" 
import { Link, useNavigate } from 'react-router'
import Questions from '@/components/Questions'
import { data } from '@/lib/data'
import { useGeneratQuestionsMutation, useSubmitQuestionsMutation } from '@/services/TestApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearQuestions } from '@/services/questionsSlice'


function TestQuestions() {
 const question = useSelector(state => state.persistedReducer.question)
 const [selectedAnswers, setSelectedAnswers] = useState({});
 const [submitQuestions, {isLoading}] = useSubmitQuestionsMutation()
 const dispatch = useDispatch()
 const navigate = useNavigate();

 // Handle selection change
 const handleSelection = (index, value) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [index]: value, // Store answer by question index
    }));
  };
  // Check if object length matches the required fields length
  const isFormComplete = Object.keys(selectedAnswers).length === question.questions.length;


  const handleSubmitTest = async () => {
    if (!isFormComplete) {
        toast.error("Please fill in all fields before submitting.");
        return;
      }
    try {
        const response = await submitQuestions({id: question._id, answers: selectedAnswers}).unwrap()
        if(response){
            toast.success("Good Job Mate!")
            dispatch(clearQuestions());
            navigate('/test-history')
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
        <Header />
        <div className='w-full px-20'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link to='/'>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link to='/test'>Test</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-primary">Title</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className='font-semibold -mb-7 mt-10'>Test Title</h1>
            <div className='w-full'>
                <Questions data={question} handleSelection={handleSelection} />
            </div>

            <div className='flex items-center gap-5 my-7'>
                <button onClick={handleSubmitTest} className='w-max h-[54px] appearance-none bg-primary text-white text-sm rounded-2xl px-8 cursor-pointer'>
                    {isLoading ? "Submitting Test" : "Submit Test"}
                </button>
                <Link to="/test" className='w-max h-[54px] flex items-center justify-center appearance-none bg-transparent text-black text-sm rounded-2xl px-8 border-[1px] border-black/40 cursor-pointer'>
                   Leave Test
                </Link>
            </div>
        </div>
    </div>
  )
}

export default TestQuestions