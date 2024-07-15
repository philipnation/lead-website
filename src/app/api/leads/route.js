import { connectToDB } from "@/utils/database";
import User from "@/models/User.model";
import Lead from "@/models/Lead.model";
import Point from "@/models/Point.model";
import { jsonRes } from "@/utils/stringifyResponse";


export async function POST(request){
    const {name, email, phone, requirement, user} = await request.json();

    try {
        await connectToDB();

        if(!name || !email || !phone || !requirement){
            return new Response(jsonRes({msg: "field can't be empty"}), {status: 400})
        }

        console.log("leads data: ", email, name, phone)

        
        const newLead = await new Lead({
            name,
            email,
            phone,
            requirement,
            user
        });
        const point = await Point.find()
        const user = await User.findOne({_id: user})
        if(user){
            user.points = user.points + point[0].leadPoint;
            await user.save();
        }

        const res = await newLead.save();


        if(res){
            return new Response(jsonRes({response: res, msg: "success"}), {status: 200});
        }

    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: "Unable to create lead"}), {status: 400})
    }
}


export async function GET(request){
    
    try {
        await connectToDB();

        const leads = await Lead.find();

        if(leads){
            return new Response(jsonRes({response: leads, msg: "success"}), {status: 201})
        }
        return new Response(jsonRes({msg: "Unable to fetch leads"}), {status: 400})
    } catch (error) {
        console.log(error)
        return new Response(jsonRes({msg: error.message}), {status: 400})
    }
}