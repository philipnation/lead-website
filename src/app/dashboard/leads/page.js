"use client"

import Button from '@/components/Button'
import { useAuthContext } from '@/context/AuthContext.context'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
    const {userInfo} = useAuthContext()
    const [leads, setLeads] = useState([])
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        requirement: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    function resetInput(){
        data.name = "";
        data.email = "";
        data.phone = "";
        data.requirement = "";
    }


    const newLeadHandler = async () => {
        console.log({...data})
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
            console.log(data)
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
                setLeads(data.response)
            } catch (error) {
                const err = error.response?.data;
                setIsLoading(false)
                toast(err?.msg)
            }
        }

        fetchLeads()
    },[isLoading, userInfo?._id])

  return (
    <div className='mt-[2rem] relative'>
        <div className=''>
            <span className='md:text-[25px] text-[16px] font-bold text-black'>Create New Leads</span>
        </div>
        <div className='flex md:flex-row flex-col gap-4 mt-3'>
            <div className='flex-[3]'>
                <div className='md:w-[450px] w-full p-8 border-[2px] border-[#fafaf5] rounded-[14px] bg-white'>
                    <div className=''>
                        <span className='text-white font-bold md:text-[20px] text-[16px]'>Add New Leads</span>
                    </div>
                    <div className='flex flex-col gap-8 mt-4'>
                        <input value={data.name} onChange={(e)=> setData({...data, name: e.target.value})} type='text' placeholder='Leads name' className='bg-transparent border-[1px] border-[#bdbdbd] text-[#bdbdbd] p-3 rounded-[9px]' />
                        <input value={data.email} onChange={(e)=> setData({...data, email: e.target.value})} type='email' placeholder='Leads email' className='bg-transparent border-[1px] border-[#bdbdbd] text-[#bdbdbd] p-3 rounded-[9px]' />
                        <input value={data.phone} onChange={(e)=> setData({...data, phone: e.target.value})} type='text' placeholder='Leads phone number' className='bg-transparent border-[1px] border-[#bdbdbd] text-[#bdbdbd] p-3 rounded-[9px]' />
                        <select onChange={(e)=> setData({...data, requirement: e.target.value})} className="bg-transparent border-[1px] text-[#bdbdbd] border-[#bdbdbd] p-3 rounded-[9px]">
                            <option>Select Requirement</option>
                            <option>Web Development</option>
                            <option>App Development</option>
                            <option>Blockchain Development</option>
                            <option>Crypto coin Development</option>
                            <option>E-commerce</option>
                            <option>Existing Software management</option>
                        </select>
                        <Button 
                            text={"Submit"}
                            btnStyle={`text-white font-bold p-3 rounded-[9px] bg-bgSecondary`}
                            onBtnClick={newLeadHandler}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </div>
            <div className='flex-[4]'>
                <div className='bg-white border-[2px] border-[#fafaf5] rounded-[14px] p-8'>
                    <div className=''>
                        <input type="text" placeholder='Search' className='p-3 border-[2px] bg-transparent border-[#bdbdbd] rounded-[9px] w-full' />
                    </div>
                    <div className='mt-3 overflow-auto'>
                        <table>
                            <thead className='font-bold text-black md:text-[16px] text-[14px]'>
                                <tr>
                                    <th>Lead Name</th>
                                    <th>Lead Mail</th>
                                    <th>Lead Phone</th>
                                    <th>Requirement</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y'>
                                {leads.map((_,i)=>(
                                    <tr key={i} className='text-[#353535] py-6 font-bold md:text-[14px] text-[12px]'>
                                        <td>{_.name}</td>
                                        <td>{_.email}</td>
                                        <td>{_.phone}</td>
                                        <td>{_.requirement}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page