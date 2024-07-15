"use client";

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuthContext } from '@/context/AuthContext.context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'
import { toast } from 'react-toastify';


const Page = ()=>{
    const [data, setData] = useState({
        fullname: "",
        phone: "",
        dob: "",
        country: "",
        state: "",
        address: "",
        zipCode: "",
        bankName: "",
        accName: "",
        accNumber: "",
    });
    const [aadharFrontCardUrl, setAadharFrontCardUrl] = useState("")
    const [aadharBackCardUrl, setAadharBackCardUrl] = useState("")
    const [panCardUrl, setPanCardUrl] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const {userInfo} = useAuthContext()
    const router = useRouter()

    const kycHandler = async ()=>{
        // console.log({...data, aadharFrontCardUrl, aadharBackCardUrl, panCardUrl, userId: userInfo._id})
        const payload = {
            ...data,
            aadharFrontCardUrl, 
            aadharBackCardUrl, 
            panCardUrl, 
            userId: userInfo._id
        }
        setIsLoading(true)
        try {
            const {data} = await axios.post('/api/user/upgrade', payload, {ContentType: "application/json"})
            if(data.msg === "success"){
                setIsLoading(false)
                toast("Kyc Verification Submitted, please wait for review")
                router.push('/dashboard')
            }
        } catch (error) {
            const err = error.response?.data
            setIsLoading(false)
            toast(err?.msg)
        }
    }


    const storeImage = (img, setFile, name)=>{
        if(!img){
            toast('Please Select an Image', {type: 'warning'})
        }

        if(img.type === 'image/jpeg' || img.type === 'image/png' || img.type === 'image/gif' || img.type === 'image/svg'){
            const data = new FormData();
            data.append('file', img)
            data.append('upload_preset', 'pinterest')
            data.append('cloud_name', 'samueladexcloudinary')

            fetch('https://api.cloudinary.com/v1_1/samueladexcloudinary/image/upload', {
                method: "post",
                body: data
            }).then((res)=> res.json())
            .then((data)=>{
                console.log(data);
                setFile(data.url.toString())
                toast(`${name} Attachment Added successfully`, {type: 'success'})
            }).catch((err)=>{
                console.log(err)
                toast("Unable to add Attachment to the this form, try again later", {type: 'warning'})
            })
        }
    }
    
    return (
        <div className='mt-[2rem] flex md:flex-row flex-col gap-8 relative'>
            <div className='flex-[3]'>
                <div className='rounded-[14px] flex flex-col gap-3 p-4 bg-[#fff] border-2 rounded-[12px] border-[#fafaf5]'>
                    <h1 className='text-black font-bold text-[30px]'>Start your KYC to Upgrade your Account</h1>
                    <p className=''></p>
                   <Button
                        text={userInfo.kycStatus === "pending" ? "Reviewing" : userInfo.kycStatus === "completed" ? "Completed" : userInfo.kycStatus === "rejected" ? 'Rejected' : 'Not Started'}
                        btnStyle={"bg-bgSecondary p-4 text-white font-bold text-[14px]"}
                    />
                </div>
            </div>
            <div className='flex-[4]'>
                <div className='rounded-[12px] p-4 border-2 border-[#fafaf5]'>
                    <div className='rounded-[12px] p-4 text-[#000] border-2 border-[#fafaf5]'>
                        <p className=''>Kindly fill in the details below carefully and with caution, in order to proceed to the verification of your kyc</p>
                    </div>
                    <div className='w-full mt-4'>
                        <div className='text-[#bdbdbd] '>Personal Information</div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                            <Input value={data.fullname} onChangeEvent={(e)=> setData({...data, fullname: e.target.value})} placeholder={"Full Legal Name"} width={'100%'} style={'w-full'} inputType={"text"} />
                            <Input value={data.phone} onChangeEvent={(e)=> setData({...data, phone: e.target.value})} placeholder={"Phone Number"} width={'100%'} style={'w-full'} inputType={"text"} />
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                            <Input value={data.dob} onChangeEvent={(e)=> setData({...data, dob: e.target.value})} placeholder={"DOB"} width={'100%'} style={'w-full'} inputType={"date"} />
                            <Input value={data.country} onChangeEvent={(e)=> setData({...data, country: e.target.value})} placeholder={"Country"} width={'100%'} style={'w-full'} inputType={"text"} />
                        </div>                        
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                            <Input value={data.state} onChangeEvent={(e)=> setData({...data, state: e.target.value})} placeholder={"State"} width={'100%'} style={'w-full'} inputType={"text"} />
                            <Input value={data.address} onChangeEvent={(e)=> setData({...data, address: e.target.value})} placeholder={"Resident Address"} width={'100%'} style={'w-full'} inputType={"text"} />
                        </div>                        
                        <Input value={data.zipCode} onChangeEvent={(e)=> setData({...data, zipCode: e.target.value})} placeholder={"Zip Code"} width={'100%'} style={'w-full'} inputType={"text"} />
                        <div className='text-[#bdbdbd] mt-5'>Payout Details</div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                            <Input value={data.bankName} onChangeEvent={(e)=> setData({...data, bankName: e.target.value})} placeholder={"Bank Name"} width={'100%'} style={'w-full'} inputType={"text"} />
                            <Input value={data.accName} onChangeEvent={(e)=> setData({...data, accName: e.target.value})} placeholder={"Account Name"} width={'100%'} style={'w-full'} inputType={"text"} />
                        </div>                        
                        <Input value={data.accNumber} onChangeEvent={(e)=> setData({...data, accNumber: e.target.value})} placeholder={"Account Number"} width={'100%'} style={'w-full'} inputType={"text"} />
                        <div className='text-[#bdbdbd] mt-5'>Identity Verification</div>
                        <div className='text-[#bdbdbd] font-bold mt-2'>Upload Aadhar Card</div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                            <Input onChangeEvent={(e)=> storeImage(e.target.files[0], setAadharFrontCardUrl, "Aadhar Front Card")} labelName={'Upload Aadhar Card Front'} labelStyle={'text-white'} width={'100%'} style={'w-full text-white block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-pink-700 hover:file:bg-blue-100'} inputType={"file"} />
                            <Input onChangeEvent={(e)=> storeImage(e.target.files[0], setAadharBackCardUrl, "Aadhar Back Card")} labelName={'Upload Aadhar Card Back'} labelStyle={'text-white'} width={'100%'} style={'w-full text-white block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-pink-700 hover:file:bg-blue-100'} inputType={"file"} />
                        </div>                        
                        <Input onChangeEvent={(e)=> storeImage(e.target.files[0], setPanCardUrl, "Pan Card")} labelName={"Upload PAN Card"} labelStyle={'text-white'} width={'100%'} style={'w-full text-white block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-pink-700 hover:file:bg-blue-100'} inputType={"file"} />

                        <Button
                            text={'Submit'}
                            btnStyle={'bg-bgSecondary text-white p-4 font-bold text-[14px] w-full mt-4'}
                            onBtnClick={kycHandler}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;