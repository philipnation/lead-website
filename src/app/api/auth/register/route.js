import { connectToDB } from "@/utils/database";
import User from "@/models/User.model";
import { jsonRes } from "@/utils/stringifyResponse";
import { NextRequest, NextResponse } from "next/server";
import {firststageService} from '@/services/auth'


export async function POST(request){
    const {firstName, lastName, email, username, password, referral} = await request.json();

    try {
        await connectToDB()

        if(!firstName || !lastName || !email || !username || !password){
            return new Response(jsonRes({msg: "field can't be empty"}), {status: 400})
        }

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({msg: "User already exists"}, {status: 400})
        }

        

        if(referral){
            const isReferral = await User.findOne({username: referral})
            if(!isReferral){
                return new Response(jsonRes({msg: "This referral username doesn't exist"}), {status: 400})
            }
        }

        
        const res = await firststageService({
            firstName, 
            lastName, 
            email, 
            username, 
            password, 
            referral
        });
        if(res){
            return new Response(jsonRes({response: res, msg: "success"}), {status: 200});
        }else{
            return new Response(jsonRes({msg: "Unable to create new user"}), {status: 400});
        }


    } catch (error) {
        console.log(error.message)
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}