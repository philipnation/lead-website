"use client";

import Image from 'next/image';
import React, { useContext, useState } from 'react'
import bgImg from '../../../public/images/undraw_Logic.png'
import Link from 'next/link';
import Button from '@/components/Button';
import {useAuthContext} from '@/context/AuthContext.context';

const Page = (props) => {
    const {register, isLoading} = useAuthContext()
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        referral: props.searchParams?.username || "",
    });

  return (
    <div className='h-[100dvh] flex items-center'>
        <div className='flex-[3] h-[100vh] bg-orange-100 md:flex hidden flex-col gap-3 relative'>
            <div className='absolute p-7'>
                <span className="font-[#000] font-bold text-[40px]">Leads-Pal</span>
            </div>
            <Image
                src={bgImg}
                alt=''
                className='w-full h-full object-cover opacity-[0.4]'
            />
        </div>
        <div className='flex-[2.3] max-w-[600px] md:py-8 py-4 md:px-[4rem] px-[2rem] m-[0px] m-auto'>
            <div className='text-orange-500'>
                <h1 className='md:text-[30px] text-[20px] font-bold'>Sign Up</h1>
            </div>
            <div className='mt-[2rem] flex flex-col gap-5'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                    <div className='flex flex-col gap-1'>
                        <label>FirstName</label>
                        <input value={data.firstName} onChange={(e)=> setData({...data, firstName: e.target.value})} className='p-3 rounded-[9px] bg-transparent border-[1px] border-[#000]' type='text' placeholder='Enter username' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>LastName</label>
                        <input value={data.lastName} onChange={(e)=> setData({...data, lastName: e.target.value})} className='p-3 rounded-[9px] bg-transparent border-[1px] border-[#000]' type='text' placeholder='Enter username' />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Username</label>
                    <input value={data.username} onChange={(e)=> setData({...data, username: e.target.value})} className='p-3 rounded-[9px] bg-transparent border-[1px] border-[#000]' type='text' placeholder='Enter username' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Email</label>
                    <input value={data.email} onChange={(e)=> setData({...data, email: e.target.value})} className='p-3 rounded-[9px] bg-transparent border-[1px] border-[#000]' type='email' placeholder='Enter email' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Password</label>
                    <input value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} className='p-3 rounded-[9px] bg-transparent border-[1px] border-[#000]' type='password' placeholder='Enter password' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Referral</label>
                    <input value={data.referral} onChange={(e)=> setData({...data, referral: e.target.value})} className='p-3 rounded-[9px] bg-transparent border-[1px] border-[#000]' type='text' placeholder='Referral username' />
                </div>
                <Button
                    text={"Sign up"}
                    btnStyle={"w-full bg-[#000] p-3 rounded-[9px] border-none text-white text-center"}
                    onBtnClick={()=> register(data.firstName, data.lastName, data.username, data.email, data.password, data.referral)}
                    loading={isLoading}
                />
                <div className='text-[12px] flex justify-center'>
                    <p className='text-black'>{"Already have an account?"} <Link className='text-orange-500 font-bold' href={'/login'}>Signin</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page