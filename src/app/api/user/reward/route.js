import User from "@/models/User.model";
import { connectToDB } from "@/utils/database";
import { jsonRes } from "@/utils/stringifyResponse";


export async function PUT(request, route){
    const {userId} = await request.json();

    try {
        await connectToDB()

        const rewardUserById = await User.findByIdAndUpdate({_id: userId})
        rewardUserById.points += 10;

        const reward = await rewardUserById.save()
        if(reward){
            return new Response(jsonRes({msg: "success"}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "Unable to reward user"}), {status: 400})
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 400})
    }
}