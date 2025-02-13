import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from '@/lib/schema';
import { Link, useNavigate } from 'react-router';
import { useRegisterUserMutation } from '@/services/authApiSlice';
import authImg from "../assets/authImg.svg";
import { Input } from '@/components/ui/input';
import eyeOff from "../assets/eye-off.svg"
import logo from "../assets/logo.svg"
import { toast } from 'react-toastify';


const Register = () => {
    const  [registerUser, {isLoading}] = useRegisterUserMutation()
    const navigate = useNavigate()

    const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm({
            resolver: zodResolver(signUpSchema),
        });

        const handleRegister = async (data) => {
            console.log(data)
            try {
                const response = await registerUser(data);
                console.log(response);
                if(response.data){
                    toast.success("Registeration is successful", {
                        className:'bg-green-300 text-white'
                    })
                    navigate('/login');
                }
            } catch (error) {
                if (error) {
                    toast.error(error);
                  } 
            }
        };
  return (
     <div className='w-full h-screen'>
            <div className='flex items-center gap-3 px-10 mt-3'>
                <img src={logo} className='w-6 h-6' />
                <p className='text-[23px] font-semibold'>Study Buddy</p>
            </div>
            <div className='w-full h-full flex items-start px-20'>
            <form onSubmit={handleSubmit(handleRegister)} className='w-[800px] flex flex-col items-start justify-center gap-6 h-full bg-white p-6 px-12'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-3xl text-left font-semibold py-3'>Sign In</h2>
                        <p className='text-[#969696CC]'>Please login to continue to your account.</p>
                    </div>
                    <div className=' w-full flex flex-col gap-1'>
                        <Input
                            id='firstName'
                            className='p-6 focus:border-primary focus:outline-primary rounded-md'
                            type='text'                        
                            {...register('firstName')}
                            placeholder='First Name'
                          
                        />
                        {errors.firstName && (<p className="mt-1 text-red-500 text-sm">{errors.firstName.message}</p>)}
                    </div>

                    <div className=' w-full flex flex-col gap-1'>
                        <Input
                            id='lastName'
                            className='p-6 focus:border-primary focus:outline-primary rounded-md'
                            type='text'                        
                            {...register('lastName')}
                            placeholder='Last Name'
                          
                        />
                        {errors.lastName && (<p className="mt-1 text-red-500 text-sm">{errors.lastName.message}</p>)}
                    </div>


                    <div className=' w-full flex flex-col gap-1'>
                        <Input
                            id='email'
                            className='p-6 focus:border-primary focus:outline-primary rounded-md'
                            type='email'                        
                            {...register('email')}
                            placeholder='Email'
                          
                        />
                        {errors.email && (<p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>)}
                    </div>


                    <div className='w-full flex flex-col gap-1 '>
                        <div className=''>
                            <Input
                                id='password'
                                {...register("password")}
                                className='p-6 focus:border-primary focus:outline-primary rounded-md'
                                type='password'
                                placeholder='Password'
                            />
                        </div>
                        {errors.password && (<p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>)}
                    </div>
     
                    <button type='submit' className='w-full h-[50.11px] appearance-none bg-primary text-white text-sm rounded-lg px-5'>
                        {isLoading ? "Signing Up" : 'Sign Up'}
                    </button>
            
                    <span className='w-full text-center'>
                       Already have an account?
                        <Link className='underline text-primary  px-1' to='/login'>
                          Sign In
                        </Link>
                    </span>
            </form>
    
                <div  className='w-full h-full object-cover '>
                    <img src={authImg} className='w-full h-full' />
                </div>
            </div>
        </div>
  )
}

export default Register