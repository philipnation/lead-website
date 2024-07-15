import { connectToDB } from "@/utils/database";
import { jsonRes } from "@/utils/stringifyResponse";
import { NextResponse, NextRequest } from "next/server";
import Contact from "@/models/Contact.model";


export async function POST(request){
    const {contactId, firstName, lastName, phoneNumber, lookUp, imageAvailable, userId } = await request.json();

    try {
        await connectToDB()

        const contact = new Contact({
            contactId, 
            firstName, 
            lastName, 
            phoneNumber, 
            lookUp, 
            imageAvailable,
            user: userId
        })

        const savedContact = await contact.save()

        if(savedContact){
            return new Response(jsonRes({msg: "success"}), {status: 200});
        }else{
            return new Response(jsonRes({msg: "Unable to add user contacts"}), {status: 400});
        }

    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}


export async function GET(request){
    try {
        await connectToDB();

        const contacts = await Contact.find();

        if(contacts){
            return new Response(jsonRes({response: contacts, msg: "success"}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "Unable to fetch contacts"}), {status: 400})
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})       
    }
}