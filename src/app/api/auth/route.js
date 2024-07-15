import { connectToDB } from "@/utils/database";
import User from '@/models/User.model'
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function GET(request){
    try {

        // Extract user ID from the authentication token
        const userId = await getDataFromToken(request);

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