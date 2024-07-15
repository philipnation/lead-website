import User from "@/models/User.model";
import { connectToDB } from "@/utils/database";
import { jsonRes } from "@/utils/stringifyResponse";
import { compareSync } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from "@/utils/config";


export async function POST(request){
    const {email, password} = await request.json();

    try {
        await connectToDB();

        if(!email || !password){
            return new Response(jsonRes({msg: "field can't be empty"}), {status: 400})
        }

        const user = await User.findOne({email});
        
        if(!user){
            return new Response(jsonRes({msg: "user doesn't exists"}), {status: 400})
        }
        const isUserPassword = compareSync(password, user.password);
        if(!isUserPassword){
            return new Response(jsonRes({msg: "incorrect password"}), {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, process.env?.TOKEN_SECRET || JWT_TOKEN_SECRET, {expiresIn: "1d"})

        // Create a JSON response indicating successful login
        // const response = new Response(jsonRes({success: true}), {status: 200})
        const response = NextResponse.json({
            msg: "success",
        }, {status: 200})

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}


export async function GET(request){
    return new Response(jsonRes({msg: "Leads API Working fine"}), {status: 200})
}