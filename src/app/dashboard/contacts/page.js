"use client";

import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { useAuthContext } from '@/context/AuthContext.context';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { PiHandCoinsFill } from 'react-icons/pi';

const Page = () => {
    const {fetchAllUsers, isContactFetching, fetchAllContacts, rewardUserByUserId, contacts, deleteUser, userInfo, isLoading} = useAuthContext()
    const router = useRouter();

    useEffect(()=>{
        fetchAllContacts();
    },[isLoading])

    // function deleteUserHandler(userId){
    //     let isConfirmed = window.confirm("Are you sure to Delete this User")
    //     if(isConfirmed){
    //         deleteUser(userId);
    //     }
    // }


    // function rewardUserByUserIdHandler(userId){
    //     let isConfimred = window.confirm("Are you sure to reward this User")
    //     if(isConfimred){
    //         rewardUserByUserId(userId);
    //     }
    // }
  return (
    <div className='flex-[4] mt-8'>
        <div className=''>
            <span className="text-black md:text-[30px] font-bold text-[20px]">All Contacts</span>
        </div>
        <div className='bg-white border-2 border-[#fafaf5] overflow-auto rounded-[14px] p-8 mt-8'>
            <div className=''>
                <input type="text" placeholder='Search' className='p-3 border-[2px] bg-transparent border-[#bdbdbd] rounded-[9px] w-full' />
            </div>
            <div className='mt-3'>
                <table>
                    <thead className='font-bold text-black md:text-[16px] text-[14px]'>
                        <tr>
                            <th>Contact ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Phone Number</th>
                            <th>LookUpKey</th>
                            <th>Image Available</th>
                            <th>createdAt</th>
                        </tr>
                    </thead>
                    {isContactFetching == true ? (
                        <div className='grid place-items-center w-full'>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {contacts.length > 0 ? (
                                <tbody className='divide-y'>
                                    {contacts.map((_,i)=>(
                                        <tr key={i} className='text-[#1e1d1d] py-6 font-bold md:text-[14px] text-[12px]'>
                                            <td>{_.firstName}</td>
                                            <td>{_.lastName}</td>
                                            <td>{_.phoneNumber}</td>
                                            <td>{_.lookUp}</td>
                                            <td>{_.imageAvailable}</td>
                                            <td>{new Date(_.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <div className=''>No data Available</div>
                            )}
                        </>
                    )}
                </table>
            </div>
        </div>
    </div>
  )
}

export default Page