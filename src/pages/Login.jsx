import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/lib/schema';
import { Link, useNavigate } from 'react-router';
import { useLoginUserMutation } from '@/services/authApiSlice';
import authImg from "../assets/authImg.svg";
import { Input } from '@/components/ui/input';
import eyeOff from "../assets/eye-off.svg"
import logo from "../assets/logo.svg"
import { toast } from 'react-toastify';

function Login() {
    const [loginUser, {isLoading,error}] = useLoginUserMutation()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(loginSchema),
    });

    

    const handleLogin  = async (data) => {
        try {
          const response = await loginUser(data).unwrap()
          if(response){
            toast.success('Login successful')
              navigate('/test');
          }
        } catch (error) {
          toast.error(JSON.stringify(error));
        } 
  };

  useEffect(() => {
    if(error){
        toast.error(JSON.stringify(error.message))
    }
  },[error])
  return (
    <div className='w-full h-screen'>
         <div className='flex items-center gap-3 px-10 mt-3'>
            <img src={logo} className='w-6 h-6' />
            <p className='text-[23px] font-semibold'>Study Buddy</p>
        </div>
        <div className='w-full h-full flex items-start px-20'>
        <form onSubmit={handleSubmit(handleLogin)} className='w-[800px] flex flex-col items-start justify-center gap-4 h-full bg-white p-6 px-12'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-3xl text-left font-semibold py-3'>Sign In</h2>
                    <p className='text-[#969696CC]'>Please login to continue to your account.</p>
                </div>
                <div className=' w-full flex flex-col gap-1'>
                    <Input
                        id='email'
                        {...register("email")}
                        className='p-6 focus:border-primary focus:outline-primary rounded-md'
                        type='email'                        
                        placeholder='Email'
                      
                    />
                    {errors.email && (<p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>)}
                </div>
                <div className='w-full flex flex-col gap-1 '>
                    {/* <label htmlFor='password'>Password:</label> */}
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

                    <div className='w-full flex items-center justify-between text-sm my-3'>
                        <div className='w-max flex items-center gap-3'>
                            <Input type='checkbox' className='h-4 w-4'/>
                            <p>Keep me logged In</p>
                        </div>

                        <p className='text-primary'>Forgot password </p>
                    </div>
              
                    <button type='submit' className='w-full h-[50.11px] appearance-none bg-primary text-white text-sm rounded-lg px-5'>
                        {isLoading ? "Logging In" : 'Login'}
                    </button>
        
                <span className='w-full text-center'>
                   Need an account?
                    <Link className='underline text-primary  px-1' to='/signup'>
                       Create One
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

export default Login