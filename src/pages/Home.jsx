import React from 'react'
import arr from "../assets/arrow.svg"

const Home = () => {
  return (
    <div className='w-full h-[78px] bg-amber-400 flex items-center justify-end gap-5'>
        <div className='w-max flex items-center gap-3  '>
            EN <img src={arr} className='w-5 h-5' />
        </div>

        <button>Log Out</button>
    </div>
  )
}

export default Home