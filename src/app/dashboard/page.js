"use client";

import React, { useEffect, useState } from 'react'
import { SiGoogleadsense } from "react-icons/si";
import { RiGift2Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { PiHandCoinsFill } from "react-icons/pi";
import { MdAdd, MdRemoveCircleOutline } from 'react-icons/md';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useAuthContext } from '@/context/AuthContext.context';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
    const [isNewLead, setIsNewLead] = useState(false);
    const {userInfo, leads, fetchAllLeads, users, fetchAllUsers} = useAuthContext()
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        requirement: ""
    })
    const [userLeads, setUserLeads] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [earning, setEarning] = useState(0)
    const router = useRouter();

    function resetInput(){
        data.name = "";
        data.email = "";
        data.phone = "";
        data.requirement = "";
    }


    const newLeadHandler = async () => {
        const Data = {
            name: data.name, 
            email: data.email, 
            phone: data.phone, 
            requirement: data.requirement, 
            user: userInfo._id
        }
        setIsLoading(true)
        try {
            const {data} = await axios.post('/api/leads', Data, {ContentType: "application/json"});

            setIsLoading(false)
            if(data.msg == "success"){
                router.push("/dashboard/leads")
                toast("Lead Created Successfully")
            }
            resetInput()
        } catch (error) {
            const err = error.response?.data;
            setIsLoading(false)
            toast(err?.msg)
        }
    }

    useEffect(()=>{
        async function fetchLeads(){
            try {
                const {data} = await axios.get(`/api/leads/${userInfo?._id}`);
                setUserLeads(data.response)
            } catch (error) {
                const err = error.response?.data;
                setIsLoading(false)
                toast(err?.msg)
            }
        }

        fetchLeads()
    },[isLoading, userInfo?._id])
    
    
    useEffect(()=>{
        async function fetchPoint(){
            try {
                const {data} = await axios.get(`/api/admin/points`);
                if(data.msg === "success"){
                    setEarning(data.response)
                }

            } catch (error) {
                const err = error.response?.data;
                // setIsLoading(false)
                toast(err?.msg)
            }
        }

        fetchPoint()
    
    }, [])


    useEffect(()=>{
        fetchAllLeads()
    },[isLoading])

    useEffect(()=>{
        fetchAllUsers()
    },[])
  return (
    <div className='mt-[2rem] flex md:flex-row flex-col gap-8 relative'>
        <div className='flex-[3]'>
            <div className='grid grid-cols-2 gap-5'>
                <div className='flex items-center gap-4 bg-gray-200 border-[2px] border-[#fafaf5] rounded-[20px] p-4'>
                    <div className='bg-bgPrimary rounded-[14px] p-3'>
                        <SiGoogleadsense className="rounded-[12px] text-bgSecondary" fontSize={"3rem"} />
                    </div>
                    <div className='flex flex-col gap-[3px]'>
                        <span className='md:text-[10px] text-[8px] font-bold text-[#000]'>Leads</span>
                        <span className='md:text-[20px] text-[16px] font-bold text-[#000]'>{userLeads?.length}</span>
                    </div>
                </div>
                <div className='flex items-center gap-4 bg-gray-200 border-[2px] border-[#fafaf5] rounded-[20px] p-4'>
                    <div className='bg-bgPrimary rounded-[14px] p-3'>
                        <RiGift2Line className="rounded-[12px] text-bgSecondary" fontSize={"3rem"} />
                    </div>
                    <div className='flex flex-col gap-[3px]'>
                        <span className='md:text-[10px] text-[8px] font-bold text-[#000]'>Earnings</span>
                        <span className='md:text-[20px] text-[16px] font-bold text-[#000]'>₹{eval(userInfo?.points * earning[0]?.cashEquivalent)}</span>
                    </div>
                </div>
                {userInfo.isAdmin == true && <div className='flex items-center gap-4 bg-gray-200 border-[2px] border-[#fafaf5] rounded-[20px] p-4'>
                    <div className='bg-bgPrimary rounded-[14px] p-3'>
                        <FiUsers className="rounded-[12px] text-bgSecondary" fontSize={"3rem"} />
                    </div>
                    <div className='flex flex-col gap-[3px]'>
                        <span className='md:text-[10px] text-[8px] font-bold text-[#000]'>Total Users</span>
                        <span className='md:text-[20px] text-[16px] font-bold text-[#000]'>{users?.length}</span>
                    </div>
                </div>}
                {userInfo?.isAdmin !== true && <div className='flex items-center gap-4 bg-gray-200 border-[2px] border-[#fafaf5] rounded-[20px] p-4'>
                    <div className='bg-bgPrimary rounded-[14px] p-3'>
                        <FiUsers className="rounded-[12px] text-bgSecondary" fontSize={"3rem"} />
                    </div>
                    <div className='flex flex-col gap-[3px]'>
                        <span className='md:text-[10px] text-[8px] font-bold text-[#000]'>Total Referrals</span>
                        <span className='md:text-[20px] text-[16px] font-bold text-[#000]'>{userInfo?.total_referrals}</span>
                    </div>
                </div>}
                <div className='flex items-center gap-4 bg-gray-200 border-[2px] border-[#fafaf5] rounded-[20px] p-4'>
                    <div className='bg-bgPrimary rounded-[14px] p-3'>
                        <PiHandCoinsFill className="rounded-[12px] text-bgSecondary" fontSize={"3rem"} />
                    </div>
                    <div className='flex flex-col gap-[3px]'>
                        <span className='md:text-[10px] text-[8px] font-bold text-[#000]'>Point</span>
                        <span className='md:text-[20px] text-[16px] font-bold text-[#000]'>{userInfo.points}</span>
                    </div>
                </div>
            </div>
            <div className='rounded-[20px] bg-transparent border-[2px] border-[#fafaf5] mt-5 text-black p-7 h-[50%]'>
                Charts
            </div>
        </div>
        <div className='flex-[3]'>
            <div className="rounded-[20px] border-[2px] bg-gray-200 border-[#fafaf5] py-4 px-7">
                <div className="">
                    <span className="md:text-[20px] text-[16px] font-bold text-black">All Leads</span>
                </div>
                <div className="mt-3 divide-y-[0.7px] flex flex-col h-[20%] gap-3 overflow-auto">
                    {leads.map((_, i)=>(
                        <div key={i} className="flex justify-between items-center py-3 text-[#686767] md:text-[15px] text-[13px]">
                            <div className="flex items-center gap-2">
                                <div className='bg-gray-500 rounded-full p-2'>
                                    <FiUsers className='text-gray-200' fontSize={"1.2rem"} />
                                </div>
                                <span className="">{_.name}</span>
                            </div>
                            <div className="">
                                <span className="">{new Date(_.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 font-semibold">
                                <span className=''>10</span>
                                <PiHandCoinsFill className="" fontSize={"1.3rem"} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {isNewLead == true && (
            <Modal
                isOpen={isNewLead}
                onCloseModal={()=> setIsNewLead(false)}
            >
                <div className='md:w-[450px] w-full p-8 rounded-[14px] bg-white border-[2px] border-[#fafaf5] shadow-md'>
                    <div className='flex justify-between items-center'>
                        <span className='text-bgSecondary font-bold md:text-[20px] text-[16px]'>Add New Leads</span>
                        <MdRemoveCircleOutline onClick={()=> setIsNewLead(false)} className='cursor-pointer' fontSize={'1.7rem'} />
                    </div>
                    <div className='flex flex-col gap-8 mt-4'>
                        <input value={data.name} onChange={(e)=> setData({...data, name: e.target.value})} type='text' placeholder='Leads name' className='bg-transparent border-[1px] text-[#bdbdbd] border-[#bdbdbd] p-3 rounded-[9px]' />
                        <input value={data.email} onChange={(e)=> setData({...data, email: e.target.value})} type='text' placeholder='Leads email' className='bg-transparent border-[1px] text-[#bdbdbd] border-[#bdbdbd] p-3 rounded-[9px]' />
                        <input value={data.phone} onChange={(e)=> setData({...data, phone: e.target.value})} type='text' placeholder='Leads phone number' className='bg-transparent border-[1px] text-[#bdbdbd] border-[#bdbdbd] p-3 rounded-[9px]' />
                        <select onChange={(e)=> setData({...data, requirement: e.target.value})} className="bg-transparent border-[1px] text-[#bdbdbd] border-[#bdbdbd] p-3 rounded-[9px]">
                            <option>Select Requirement</option>
                            <option value={"web development"}>Web Development</option>
                            <option value={"app development"}>App Development</option>
                            <option value={"blockchain development"}>Blockchain Development</option>
                            <option value={"crypto coin development"}>Crypto coin Development</option>
                            <option value={"e-commerce"}>E-commerce</option>
                            <option value={"existing software management"}>Existing Software management</option>
                        </select>
                        <Button 
                            text={"Submit"}
                            btnStyle={`text-white font-bold p-3 rounded-[9px] bg-bgSecondary`}
                            onBtnClick={newLeadHandler}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </Modal>
        )}
        <button onClick={()=> setIsNewLead(true)} className='text-black rounded-[100%] border-[2px] border-[#fafaf5] bg-white px-5 cursor-pointer py-5 animate-bounce fixed bottom-3 right-6 active:bg-opacity-80 hover:bg-opacity-80'>
            <MdAdd fontSize={"2rem"} />
        </button>
    </div>
  )
}

export default Page