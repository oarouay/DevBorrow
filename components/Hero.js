"use client";

import React from 'react'
import Button from './Button';
import { useRouter } from 'next/navigation';
import { Fugaz_One } from "next/font/google";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });
export default function Hero() {
  const router = useRouter();
  const handleStart = () => {
    console.log("oussama")
    router.push('/dashboard');
  };
  return (
    <div className='py-4 md:py-12 flex flex-col gap-4 sm:gap-8'>
      <h1 className={`text-5xl sm:text-text-6xl md:text-7xl text-center ${fugaz.className}`}>
        <span className='textGradient'>DevBorrow</span> Why buy when you can <span className='textGradient'> Borrow!</span></h1>

        <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[700px]'>Choose the device you want, <span className='font-semibold'>
        Borrow anytime, for any period of time.</span></p>

      <div className='w-fit mx-auto'>
        <Button onClick={handleStart} text="Get Started"/>
      </div>
      
      </div>

  )
}
