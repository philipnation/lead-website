import { connectToDB } from "@/utils/database";
import { jsonRes } from "@/utils/stringifyResponse";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User.model";


export async function POST(request){
    const {fullname, phone, dob, country, state, address, zipCode, bankName, accNumber, accName, aadharFrontCardUrl, aadharBackCardUrl, panCardUrl, userId} = await request.json();

    try {
        await connectToDB();
        if(!fullname || !phone || !dob || !country || !state || !address || !zipCode || !bankName || !accNumber || !accName || !aadharFrontCardUrl || !aadharBackCardUrl || !panCardUrl){
            return new Response(jsonRes({msg: "Fields can't be empty"}), {status: 400})
        }

        // return new Response(jsonRes({msg: {fullname, phone, country}}), {status: 200})

        const kycRes = await User.findByIdAndUpdate({_id: userId})
        kycRes.fullname = fullname;
        kycRes.phone = phone;
        kycRes.dob = dob;
        kycRes.country = country;
        kycRes.state = state;
        kycRes.address = address;
        kycRes.zipCode = zipCode;
        kycRes.bankName = bankName;
        kycRes.accNumber = accNumber;
        kycRes.accName = accName;
        kycRes.aadharFrontCardUrl = aadharFrontCardUrl;
        kycRes.aadharBackCardUrl = aadharBackCardUrl;
        kycRes.panCardUrl = panCardUrl;
        kycRes.kycStatus = "pending";

        const res = await kycRes.save();
        if(res){
            return new Response(jsonRes({msg: 'success'}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "Unable to proceed with KYC"}), {status: 400})
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}