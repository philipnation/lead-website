"use client";

import Button from '@/components/Button';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Page = ({params}) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isRejected, setIsRejected] = useState(false)
    const [isVerify, setIsVerify] = useState(false)

    useEffect(()=>{
        const fetchUserKyc = async ()=>{
            setIsLoading(true)
            try {
                const {data} = await axios.get(`/api/user/upgrade/${params.userId}`)
                if(data.msg === "success"){
                    setIsLoading(false)
                    setData(data.response)
                }
            } catch (error) {
                const err = error.response?.data
                setIsLoading(false)
                toast(err?.msg)
            }
        }

        fetchUserKyc()

    },[params.userId])

    const verifyKYCHandler = async ()=>{
        const payload = {
            userId: params.userId
        }
        setIsVerify(true)
        try {
            const {data} = await axios.put(`/api/user/upgrade/verify`, payload)
            if(data.msg === "success"){
                setIsVerify(false)
                toast("Kyc Verify Successfully!")
            }
        } catch (error) {
            const err = error.response?.data;
            setIsVerify(false)
            toast(err?.msg)
        }
    }


    const rejectKYCHandler = async ()=>{
        const payload = {
            userId: params.userId
        }
        setIsRejected(true)
        try {
            const {data} = await axios.put(`/api/user/upgrade/reject`, payload)
            if(data.msg === "success"){
                setIsRejected(false)
                toast("Kyc Rejected Successfully!")
            }
        } catch (error) {
            const err = error.response?.data;
            setIsRejected(false)
            toast(err?.msg)
        }
    }

    console.log(data)

  return (
    <div className='flex-[4] mt-8'>
        <div className=''>
            <span className="text-black md:text-[30px] font-bold text-[20px]">Verify User KYC</span>
        </div>
        <div className="text-black font-bold flex flex-col gap-6">
            <div className='overflow-auto'>
                <table className='overflow-auto'>
                    <thead className='text-primary'>
                        <tr>
                            <th>Fullname</th>
                            <th>Phone</th>
                            <th>DOB</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>Address</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>Account Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.fullname}</td>
                            <td>{data.phone}</td>
                            <td>{new Date(data.dob).toLocaleDateString()}</td>
                            <td>{data.country}</td>
                            <td>{data.state}</td>
                            <td>{data.address}</td>
                            <td>{data.bankName}</td>
                            <td>{data.accNumber}</td>
                            <td>{data.accName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className=''>
                <div className=''>Aadhar Front Card</div>
                <Image
                   src={data.aadharFrontCardUrl}
                   alt=''
                   width={400}
                   height={300}
                />
            </div>
            <div className=''>
                <div className=''>Aadhar Back Card</div>
                <Image
                   src={data.aadharBackCardUrl}
                   alt=''
                   width={400}
                   height={300}
                />
            </div>
            <div className=''>
                <div className=''>PAN Card</div>
                <Image
                   src={data.panCardUrl}
                   alt=''
                   width={400}
                   height={300}
                />
            </div>
            {data.isKyc == true ? (
                <div className=''>
                    <div className='grid place-items-center p-6 rounded-[14px] bg-green-500 bg-opacity-[2] text-opacity-[100%] border-[5px] border-green-500 border-spacing-2'>
                        <span className='text-[#000]'>This User KYC has Been Verified</span>
                    </div>
                </div>
            ) : (
                <div className='flex items-center gap-2'>
                    <Button
                        text={"Reject KYC"}
                        btnStyle={"bg-red-500 md:p-3 p-2 w-full text-white font-bold md:text-[16px] text-[13px]"}
                        onBtnClick={rejectKYCHandler}
                        loading={isRejected}
                    />
                    <Button
                        text={"Verify KYC"}
                        btnStyle={"bg-bgSecondary md:p-3 p-2 w-full text-white font-bold md:text-[16px] text-[13px]"}
                        onBtnClick={verifyKYCHandler}
                        loa1ding={isVerify}
                    />
                </div>
            )}            
        </div>
    </div>
  )
}

export default Page