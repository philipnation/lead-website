import { connectToDB } from "@/utils/database";
import User from "@/models/User.model";
import Point from "@/models/Point.model";
import { jsonRes } from "@/utils/stringifyResponse";
import { NextRequest, NextResponse } from "next/server";
import {firststageService} from '@/services/auth'


export async function POST(request){
    const {point, cashEquivalent, leadPoint, id} = await request.json();

    if(!point || !cashEquivalent || !leadPoint){
        return new Response(jsonRes({msg: "Fields can't be empty"}), {status: 500})   
    }

    console.log(point, cashEquivalent, leadPoint, id)
    try {
        await connectToDB()
        if(id){
            const updatePoint = await Point.findByIdAndUpdate({_id: id})
            updatePoint.point = point;
            updatePoint.cashEquivalent = cashEquivalent;
            updatePoint.leadPoint = leadPoint;

            const p = await updatePoint.save()
            if(p){
                return new Response(jsonRes({msg: "Earning values Updated Successfully!"}), {status: 200})
            }else{
                return new Response(jsonRes({msg: 'Unable to update Earning values'}), {status: 500})
            }
        }else{
            const points = await new Point({
                point,
                cashEquivalent,
                leadPoint
            })

            const res = await points.save()
            if(res){
                return new Response(jsonRes({msg: "Earning values created Successfully!"}), {status: 200})
            }else{
                return new Response(jsonRes({msg: 'Unable to update Earning values'}), {status: 500})
            }
        }

    } catch (error) {
        console.log(error.message)
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}


export async function GET(request){
    try{
        await connectToDB();

        const points = await Point.find();

        if(points){
            return new Response(jsonRes({msg: "success", response: points}), {status: 200})
        }else{
            return new Response(jsonRes({msg: 'Unable to update Earning values'}), {status: 500})
        }
    }catch(error){
        console.log(error.message)
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}