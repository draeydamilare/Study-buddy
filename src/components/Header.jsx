import React from 'react'
import arr from '../assets/arrow.svg';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/services/auth/authSlice';

const Header = () => {
  const auth = useSelector(state => state.persistedReducer.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut())
  }
 
  return (
    <div className='w-full h-[78px] flex items-center justify-end gap-5 px-10'>
    <div className='w-max flex items-center gap-2  '>
        EN <img src={arr} className='w-3 h-3' />
    </div>

    {auth.access_token ? (

      <button onClick={handleLogOut}  className='appearance-none w-[110px] h-[45px] bg-[#3A5AFF] rounded-xl shadow-md shadow-black/60 text-white cursor-pointer'>Log Out</button>
    ): (
      <button onClick={() => navigate('login')}  className='appearance-none w-[110px] h-[45px] bg-[#3A5AFF] rounded-xl shadow-md shadow-black/60 text-white cursor-pointer'>Log In</button>
    )}
    </div>
  )
}

export default Header