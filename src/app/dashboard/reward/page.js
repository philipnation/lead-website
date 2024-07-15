"use client";


import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import TargetImg from '../../../../public/images/target.png'
import Image from 'next/image';

const Page = () => {
  const [isEarning, setIsEarning] = useState(false)
  const [isEarningRules, setIsEarningRules] = useState(false)
  const [points, setPoints] = useState([]);
  
  useEffect(()=>{
    const getPoints = async ()=>{
      try {
        const {data} = await axios('/api/admin/points')
        if(data.msg === "success"){
          setPoints(data.response)
        }
      } catch (error) {
        const err = error.response?.data
        toast(err.msg)
      }
    }

    getPoints()

  },[isEarningRules])

  const [val, setVal] = useState({
    point: points[0]?.point,
    cashEquivalent: points[0]?.cashEquivalent,
    leadPoint: points[0]?.leadPoint
  })

  const earningRulesHandler = async ()=>{
    const Data = {
      point: val.point,
      cashEquivalent: val.cashEquivalent,
      leadPoint: val.leadPoint,
      id: points[0]?._id
    }
    console.log(Data)
    setIsEarningRules(true)
    try {
      const {data} = await axios.post('/api/admin/points', Data, {ContentType: 'application/json'});
      setIsEarningRules(false)
      toast(data.msg);
    } catch (error) {
      const err = error.response?.data
      setIsEarningRules(false)
      toast(err.msg)
    }  
  }


  return (
    <div className='mt-[2rem] relative'>
        <div className='flex items-center justify-between'>
            <span className='md:text-[25px] text-[16px] font-bold text-black'>Earnings</span>
            <Button
              text={"Earning Rules"}
              btnStyle={"p-4 bg-bgSecondary text-white font-bold"}
              onBtnClick={()=> setIsEarning(true)}
            />
        </div>

        <div className='flex flex-wrap md:flex-row flex-col gap-8 mt-8'>
          <div className='rounded-[25px] p-5 flex-1 bg-gray-200'>
            <div className='bg-black text-white p-8 rounded-[25px] relative overflow-hidden'>
              <Image src={TargetImg} alt='' className='absolute right-0 top-[-10px]' />
              <span className='font-bold md:text-[20px] text-[16px]'>Points</span>
            </div>
          </div>
          <div className='rounded-[25px] p-5 flex-1 bg-gray-200'>
            <div className='bg-black text-white p-8 rounded-[25px] relative overflow-hidden'>
              <Image src={TargetImg} alt='' className='absolute right-0 top-[-10px]' />
              <span className='font-bold md:text-[20px] text-[16px]'>₹ Cash Equivalent</span>
            </div>
          </div>
          <div className='rounded-[25px] p-5 flex-1 bg-gray-200'>
            <div className='bg-black text-white p-8 rounded-[25px] relative overflow-hidden'>
              <Image src={TargetImg} alt='' className='absolute right-0 top-[-10px]' />
              <span className='font-bold md:text-[20px] text-[16px]'>Lead Rewards</span>
            </div>
          </div>
          
        </div>

        {isEarning && <Modal
          isOpen={isEarning}
          onCloseModal={()=> setIsEarning(false)}
        >
          <div className="bg-white p-8 rounded-[12px] md:w-[60%] w-full">
            <div className=''>
              <span className="font-bold text-black md:text-[20px] text-[14px]">Earning Rules</span>
            </div>
            <div className='flex items-start text- gap-2 mt-3'>
              <span className='bg-gray-200 p-2 rounded-full md:text-[14px] text-[12px]'>Points: {points[0]?.point || 0}</span>
              <span className='bg-gray-200 p-2 rounded-full md:text-[14px] text-[12px]'>Cash: ₹{points[0]?.cashEquivalent || 0}</span>
              <span className='bg-gray-200 p-2 rounded-full md:text-[14px] text-[12px]'>Leads: {points[0]?.leadPoint || 0}</span>
            </div>
            <div className='flex flex-col gap-3'>
              <Input placeholder={`Points Per Referral: ${points[0]?.point}`} width={"100%"} value={val.point} onChangeEvent={(e)=> setVal({...val, point: e.target.value})} />
              <div className='flex items-center gap-3'>
                <Input placeholder={`Cash Equivalent: ₹${points[0]?.cashEquivalent}`} value={val.cashEquivalent} onChangeEvent={(e)=> setVal({...val, cashEquivalent: e.target.value})} width={"100%"} />
                <Input placeholder={`Points Per Leads: ${points[0]?.leadPoint}`} value={val.leadPoint} onChangeEvent={(e)=> setVal({...val, leadPoint: e.target.value})} width={"100%"} />
              </div>
              <Button
                text={"Initiate"}
                btnStyle={"text-white bg-bgSecondary font-bold p-4"}
                onBtnClick={earningRulesHandler}
                loading={isEarningRules}
              />
            </div>
          </div>
        </Modal>}
    </div>
  )
}

export default Page