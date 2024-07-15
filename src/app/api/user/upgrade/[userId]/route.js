import { connectToDB } from "@/utils/database";
import { jsonRes } from "@/utils/stringifyResponse";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User.model";


export async function GET(request, route){
    const userId = route.params.userId;

    try {
        await connectToDB();

        const res = await User.findById({_id: userId})

        if(res){
            return new Response(jsonRes({response: res, msg: 'success'}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "Unable to proceed with KYC"}), {status: 400})
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}