import { connectToDB } from "@/utils/database";
import { jsonRes } from "@/utils/stringifyResponse";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User.model";



export async function PUT(request){
    const {userId} = await request.json();

    try {
        await connectToDB();
        
        const res = await User.findByIdAndUpdate({_id: userId})
        res.kycStatus = "completed"
        res.isKyc = true

        const response = await res.save()
        if(response){
            return new Response(jsonRes({msg: "success"}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "success"}), {status: 400})
        }

    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}