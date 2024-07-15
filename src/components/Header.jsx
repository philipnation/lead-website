"use client";

import { useAuthContext } from '@/context/AuthContext.context';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {MdMenu, MdRemoveCircleOutline, MdSearch} from 'react-icons/md'
import { RiSearchLine } from "react-icons/ri";
import Button from './Button';


const Header = () => {
    const {userInfo} = useAuthContext();
    const router = useRouter();
    const [isShow, setIsShow] = useState(false)

  return (
    <div className='flex items-center relative'>
        <div className='flex-[4]'>
            <span className='text-[25px] text-gray-500 font-bold'>Welcome, {userInfo?.firstName}</span>
        </div>
        <div className='flex items-center gap-3 flex-[3]'>
            <div className='w-full flex items-center gap-3 justify-end'>
                <div className='md:flex hidden items-center flex-[2] gap-1 w-full bg-transparent border-[2px] border-[#fafaf5] rounded-[14px] p-2'>
                    <RiSearchLine className='text-[#000]' fontSize={"1.5rem"} />
                    <input type="text" placeholder='Search' className='bg-transparent text-[#000] border-none text-[12px] focus:outline-none w-full' />
                </div>
                <div className='relative'>
                    <div onClick={()=> router.push("/dashboard/profile")} className='p-3 cursor-pointer grid place-items-center border-[2px] border-[#fafaf5] text-black font-bold text-[14px] rounded-full bg-white'>
                        <span>{userInfo?.firstName?.slice(0,1)}{userInfo?.lastName?.slice(0,1)}</span>
                    </div>
                    <div className=''></div>
                </div>
                <div className='md:hidden flex'>
                    <MdMenu fontSize={'2rem'} onClick={()=> setIsShow((prev)=> !prev)} className='cursor-pointer' color='black' />
                </div>
            </div>
        </div>
        {isShow && <MobileNav setIsShow={setIsShow} />}
    </div>
  )
}

export default Header



function MobileNav({setIsShow}){
    const pathname = usePathname();
    const {logout, userInfo} = useAuthContext()

    const navlinks = [
        {
            id: 1,
            name: "Home",
            href: "/dashboard",
            targetSegment: 'dashboard',
          },
          {
            id: 2,
            name: "Leads",
            href: "/dashboard/leads",
            targetSegment: 'leads',
          },
          {
            id: 3,
            name: "Reward",
            href: "/dashboard/reward",
            targetSegment: 'reward',
          },
          {
            id: 4,
            name: "Users",
            href: "/dashboard/users",
            targetSegment: 'users',
          },
          {
            id: 5,
            name: "Posts",
            href: "/dashboard/posts",
            targetSegment: 'posts',
          },
          {
            id: 6,
            name: "Contacts",
            href: "/dashboard/contacts",
            targetSegment: 'contacts',
          },
    ]
    return (
        <div className='bg-black px-4 py-8 fixed md:hidden flex flex-col top-0 w-[100%] ml-[-20px] z-20 h-[100dvh] overflow-auto slide-left'>
            <div className='flex justify-between items-center'>
                <span className="text-[24px] font-bold">Leads-Pal</span>
                <MdRemoveCircleOutline fontSize={"2rem"} onClick={()=> setIsShow(false)} className='text-gray-200 cursor-pointer' />
            </div>
            <div className='grid place-items-center'>
                <div className='flex flex-col gap-5 divide-y w-full'>
                    {navlinks.slice(0,3).map((link, index) => {
                        const isActive = pathname == link.href;
                        return (
                            <Link href={"#"} key={index} className='text-center pt-4 w-full'>
                                <span className={`${isActive ? 'text-white' : 'text-gray-200'} hover:text-gray-200 active:text-gray-200 font-bold text-center text-[14px]`}>{link.name}</span>
                            </Link>
                        )                
                    })}
                    {userInfo.isAdmin == true && navlinks.slice(4,6).map((link, index) => {
                        const isActive = pathname == link.href;
                        return (
                            <Link href={"#"} key={index} className='text-center pt-4 w-full'>
                                <span className={`${isActive ? 'text-bgSecondary' : 'text-black'} hover:text-bgSecondary active:text-bgSecondary font-bold text-center text-[14px]`}>{link.name}</span>
                            </Link>
                        )                
                    })}
                    <Button
                        text={"Logout"}
                        btnStyle={'bg-bgSecondary text-white w-full'}
                        onBtnClick={logout}
                    />
                </div>
            </div>
        </div>
    )
}