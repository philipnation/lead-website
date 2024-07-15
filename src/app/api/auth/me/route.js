import { connectToDB } from "@/utils/database";
import User from '@/models/User.model'
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function GET(request){
    try {
        await connectToDB()
        // Extract user ID from the authentication token

        const searchParams = request.nextUrl.searchParams;

        const userId = searchParams.get('userId');

        // Find the user in the database based on the user ID
        const user = await User.findOne({_id: userId}).
        select("-password");
        return NextResponse.json({
            msg: "success",
            data: user
        })
    } catch (error) {
        return NextResponse.json({msg: error.message}, {status: 400})
        
    }
}