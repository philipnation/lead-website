"use client";

import React from 'react'
import Button from './Button';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext.context';

const UpgradeNotice = () => {
    const router = useRouter();
    const {userInfo} = useAuthContext()

  return (
    <div className='bg-transparent border-2 border-[#fafaf5] p-3 rounded-[12px] flex md:flex-row flex-col gap-2 items-center justify-between mt-6'>
        <div className='text-black font-bold md:text-[16px] text-[12px]'>{userInfo.kycStatus == "pending" ? 'Your Kyc Upgrade Is still under review' : 'Complete Your KYC to upgrade your account'}</div>
        <div className=''>
            <Button
                text={"Upgrade Now!"}
                btnStyle={"bg-bgSecondary text-white font-bold text-[14px] p-4"}
                onBtnClick={()=> router.push("/dashboard/upgrade")}
            />
        </div>
    </div>
  )
}

export default UpgradeNotice