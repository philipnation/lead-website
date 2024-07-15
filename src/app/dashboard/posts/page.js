"use client";

import Button from '@/components/Button';
import Input from '@/components/Input';
import React, { useState } from 'react'
import { MdEdit, MdRemoveCircle } from 'react-icons/md';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; 
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '@/context/AuthContext.context';
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

const Page = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const {userInfo} = useAuthContext()

    const createPostHandler = async ()=>{
        const Data = {
            title: title,
            body: body,
            category: category,
            user: userInfo._id
        }
        console.log(Data)
        setIsLoading(true)
        try{
            const {data} = await axios.post(`/api/admin/post`, Data, {ContentType: 'application/json'})
            if(data.msg == "success"){
                setIsLoading(false)
                toast("Post Created Successfully!!!")
            }
        }catch(error){
            let err = error.response?.data;
            toast(err.msg)
            setIsLoading(false)
        }
    }

  return (
    <div className='mt-[2rem] relative'>
        <div className=''>
            <span className='md:text-[25px] text-[16px] font-bold text-black'>Manage Posts</span>
        </div>
        <div className='flex md:flex-row flex-col mt-3 gap-4'>
            <div className='flex-[2] border-2 border-[#fafaf5] p-6 rounded-[14px]'>
                <div className='divide-y-4'>
                    <span className="text-[25px] font-bold text-black">New Post</span>
                </div>
                <div className='w-full'>
                    <div className='w-full flex flex-col gap-4'>
                        <Input labelName={"Title"} width={'100%'} value={title} onChangeEvent={(e)=> setTitle(e.target.value)} inputType={"text"} style={"w-full"} placeholder={"Post Title"} />

                        <select value={category} required onChange={(e)=> setCategory(e.target.value)} className='border-2 border-[#fafaf5] rounded-[12px] p-3'>
                            <option value=''>-- Select Category --</option>
                            <option value="regular">Regular</option>
                            <option value="highlights">Highlights</option>
                            <option value="feature">Feature</option>
                        </select>

                        <div className='border-[1px] rounded-[12px] overflow-hidden'>
                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                editorState={body}
                                onEditorStateChange={(editorState) => setBody(editorState)}
                            />
                        </div>

                        <Button 
                            text={"Submit"}
                            btnStyle={'bg-bgSecondary p-3 text-white w-full'}
                            onBtnClick={createPostHandler}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </div>
            <div className='flex-[3]'>
                <div className='bg-white border-[2px] overflow-auto border-[#fafaf5] rounded-[14px] p-8'>
                    <div className=''>
                        <input type="text" placeholder='Search' className='p-3 border-[2px] bg-transparent border-[#bdbdbd] rounded-[9px] w-full' />
                    </div>
                    <div className='mt-3 overflow-auto'>
                        <table>
                            <thead className='font-bold text-black md:text-[16px] text-[14px]'>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y'>
                                <tr className='text-[#353535] py-6 font-bold md:text-[14px] text-[12px]'>
                                    <td>{"Normal"}</td>
                                    <td>{"npormal"}</td>
                                    <td>
                                        <MdEdit fontSize={"2.3rem"} color='green' className='cursor-pointer hover:bg-[#fafaf5] active:bg-[#fafaf5] p-2 rounded-[100%]' />
                                    </td>
                                    <td>
                                        <MdRemoveCircle fontSize={"2.3rem"} color='red' className='cursor-pointer hover:bg-[#fafaf5] active:bg-[#fafaf5] p-2 rounded-[100%]' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page;