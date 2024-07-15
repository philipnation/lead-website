"use client";

import Image from 'next/image';
import React, { useContext, useState } from 'react'
import bgImg from '../../../public/images/undraw_Logic.png'
import Link from 'next/link';
import {useAuthContext} from '@/context/AuthContext.context';
import Button from '@/components/Button';
import axios from 'axios';

const Page = () => {
    const {login, isLoading, testing, testingFunction} = useAuthContext()
    const [data, setData] = useState({
        email: "",
        password: ""
    })

  return (
    <div className='h-[100dvh] flex items-center'>
        <div className='flex-[3] md:flex hidden h-[100vh] bg-orange-100'>
            <Image
                src={bgImg}
                alt=''
                className='w-full h-full object-cover opacity-[0.4]'
            />
        </div>
        <div className='flex-[2.3] max-w-[600px] md:py-8 py-4 md:px-[4rem] px-[2rem] m-[0px] m-auto'>
            <div className='flex justify-center'>
                <div className='p-14 rounded-[100%] bg-[#fafafa]'>

                </div>
            </div>
            <div className='text-black mt-5'>
                <h1 className='md:text-[30px] text-[20px] font-bold'>Sign In {testing}</h1>
            </div>
            <div className='mt-[2rem] flex flex-col gap-5'>
                <div className='flex flex-col gap-1 text-black'>
                    <label>Email</label>
                    <input value={data.email} onChange={(e)=> setData({...data, email: e.target.value})} className='p-3 rounded-[9px] bg-transparent border-[1px] border-[#f5f5fa]' type='email' placeholder='Enter email' />
                </div>
                <div className='flex flex-col gap-1 text-black'>
                    <label>Password</label>
                    <input value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} className='p-3 rounded-[9px] bg-transparent border-[1px] border-[#f5f5fa]' type='password' placeholder='Enter password' />
                </div>
                <Button
                    text={"Sign in"}
                    btnStyle={"w-full p-3 rounded-[9px] border-none bg-bgSecondary text-white text-center"}
                    onBtnClick={()=> login(data.email, data.password)}
                    loading={isLoading}
                />                
                <div className='text-[12px] flex justify-center'>
                    <p className='text-black'>{"Don't have an account?"} <Link className='text-orange-500 font-bold' href={'/register'}>Signup</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page