"use client";

import Link from 'next/link';
import React from 'react'
import { LuLayoutDashboard, LuGift } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { useAuthContext } from '@/context/AuthContext.context';
import { FiUsers } from 'react-icons/fi';
import { RiBookletLine, RiContactsLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const {logout, userInfo} = useAuthContext()
    const pathname = usePathname();

  return (
    <div className='fixed w-[7%] h-[90%] lg:block hidden border-[2px] border-[#fafaf5] bg-black rounded-[16px]'>
        <div className='text-center p-4 text-gray-200 font-extrabold'>
            <span>PK Panel</span>
        </div>
        <div className='flex flex-col justify-between h-[85%] relative'>
            <div className=''>
                <div className={`flex justify-center w-full rounded-[5px] text-[#bdbdbd] hover:text-gray-200 ${pathname == '/dashboard' && 'text-gray-200 bg-gray-500'} p-4 hover:ease-linear hover:bg-gray-500`}>
                    <Link href={"/dashboard"} className="flex flex-col no-underline gap-1 items-center">
                        <LuLayoutDashboard fontSize={"1.6rem"} className='font-bold' />
                        <div className="text-[11px] font-bold">Home</div>
                    </Link>
                </div>
                <div className={`flex justify-center w-full rounded-[5px] text-[#bdbdbd] hover:text-gray-200 ${pathname == '/dashboard/leads' && 'text-gray-200 bg-gray-500'}  p-4 hover:ease-linear hover:bg-gray-500`}>
                    <Link href={"/dashboard/leads"} className="flex flex-col no-underline gap-1 items-center">
                        <IoCreateOutline fontSize={"1.6rem"} className='font-bold' />
                        <div className="md:text-[11px] font-bold">Lead</div>
                    </Link>
                </div>
                <div className={`flex justify-center w-full rounded-[5px] text-[#bdbdbd] hover:text-gray-200 ${pathname == '/dashboard/reward' && 'text-gray-200 bg-gray-500'}  p-4 hover:ease-linear hover:bg-gray-500`}>
                    <Link href={"/dashboard/reward"} className="flex flex-col no-underline gap-1 items-center">
                        <LuGift fontSize={"1.6rem"} className='font-bold' />
                        <div className="md:text-[11px] font-bold">Earnings</div>
                    </Link>
                </div>
                {userInfo.isAdmin == true && <div className={`flex justify-center w-full rounded-[5px] text-[#bdbdbd] hover: ${pathname == '/dashboard/users' && 'text-gray-200 bg-gray-500'}  p-4 hover:ease-linear hover:bg-gray-500`}>
                    <Link href={"/dashboard/users"} className="flex flex-col no-underline gap-1 items-center">
                        <FiUsers className="font-bold" fontSize={"1.6rem"} />
                        <div className="md:text-[11px] font-bold">Users</div>
                    </Link>
                </div>}
                {userInfo.isAdmin == true && <div className={`flex justify-center w-full rounded-[5px] text-[#bdbdbd] hover:text-gray-200 ${pathname == '/dashboard/posts' && 'text-gray-200 bg-gray-500'}  p-4 hover:ease-linear hover:bg-gray-500`}>
                    <Link href={"/dashboard/posts"} className="flex flex-col no-underline gap-1 items-center">
                        <RiBookletLine className="font-bold" fontSize={"1.6rem"} />
                        <div className="md:text-[11px] font-bold">Posts</div>
                    </Link>
                </div>}
                {userInfo.isAdmin == true && <div className={`flex justify-center w-full rounded-[5px] text-[#bdbdbd] hover:text-gray-200 ${pathname == '/dashboard/contacts' && 'text-gray-200 bg-gray-500'}  p-4 hover:ease-linear hover:bg-gray-500`}>
                    <Link href={"/dashboard/contacts"} className="flex flex-col no-underline gap-1 items-center">
                        <RiContactsLine className="font-bold" fontSize={"1.6rem"} />
                        <div className="md:text-[11px] font-bold">Contacts</div>
                    </Link>
                </div>}
            </div>
            <div className='flex justify-center'>
                <BiLogOutCircle fontSize={"1.8rem"} onClick={logout} className='text-gray-200 active:text-bgPrimary cursor-pointer' />
            </div>
        </div>
    </div>
  )
}

export default Sidebar