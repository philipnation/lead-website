import User from '@/models/User.model'
import { connectToDB } from '@/utils/database'
import { jsonRes } from '@/utils/stringifyResponse'
import ResponseCache from 'next/dist/server/response-cache';
import { NextResponse, NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from '@/utils/config';


export async function GET(request){

    try {
        await connectToDB();


        const users = await User.find()

        if(users){
            return new Response(jsonRes({response: users, msg: "success"}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "Unable to fetch users"}), {status: 400})
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}

export async function POST(request, route){
    const {userId} = await request.json();
    try {
        await connectToDB();

        const res = await User.findByIdAndDelete({_id: userId})
        if(res){
            return new Response(jsonRes({msg: "success"}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "Unable to delete users"}), {status: 400})
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}


export async function PUT(request, route){
    // const userId = route.params.userId
    const {firstName, lastName, username, email, password, userId} = await request.json();

    try {
        await connectToDB()

        const updatedUser = await User.findByIdAndUpdate({_id: userId})

        if(password){
            updatedUser.firstName = firstName;
            updatedUser.lastName = lastName;
            updatedUser.username = username;
            updatedUser.email = email;
            updatedUser.password = password;
        }else{
            updatedUser.firstName = firstName;
            updatedUser.lastName = lastName;
            updatedUser.username = username;
            updatedUser.email = email;
        }

        const user = await updatedUser.save()
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            points: user.points
        }

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, process.env?.TOKEN_SECRET || JWT_TOKEN_SECRET, {expiresIn: "1d"})
        if(user){
            return new Response(jsonRes({response: {...tokenData, token}, msg: "success"}), {status: 200});
        }else{
            return new Response(jsonRes({msg: "Unable to update user profile"}), {status: 400});
        }


    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 400});
    }
}