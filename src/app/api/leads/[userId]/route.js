import Lead from "@/models/Lead.model";
import { connectToDB } from "@/utils/database";
import { jsonRes } from "@/utils/stringifyResponse";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request, route){
    const userId = route.params.userId
    try {
        await connectToDB();

        const leads = await Lead.find({user: userId});

        if(leads){
            return new Response(jsonRes({response: leads, msg: "success"}), {status: 201})
        }
        return new Response(jsonRes({msg: "Unable to fetch leads"}), {status: 400})
    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: error.message}), {status: 400})
    }
}