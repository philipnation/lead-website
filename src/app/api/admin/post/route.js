import Post from '@/models/Post.model'
import { connectToDB } from '@/utils/database'
import { jsonRes } from '@/utils/stringifyResponse'
import ResponseCache from 'next/dist/server/response-cache';
import { NextResponse, NextRequest } from 'next/server'



export async function POST(request){
    const {title, body, category, user} = await request.json();
    try {
        await connectToDB();

        if(!title || !category || !body){
            return new Response(jsonRes({msg: "Fields can't be empty"}), {status: 200})
        }

        const post = await new Post({
            title,
            body,
            category,
            user
        })

        const res = await post.save()

        if(res){
            return new Response(jsonRes({msg: "success"}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "Unable to create posts"}), {status: 400})
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}

export async function GET(request){

    try {
        await connectToDB();


        const posts = await Post.find()

        if(posts){
            return new Response(jsonRes({response: posts, msg: "success"}), {status: 200})
        }else{
            return new Response(jsonRes({msg: "Unable to fetch posts"}), {status: 400})
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 500})
    }
}


export async function PUT(request, route){
    const userId = route.params.userId
    const {title, body, category} = await request.json();

    try {
        await connectToDB()

        const updatedPost = await Post.findByIdAndUpdate({_id: userId})

        updatedPost.title = title;
        updatedPost.body = body;
        updatedPost.category = category;
       
        const post = await updatedPost.save()

        if(post){
            return new Response(jsonRes({msg: "success"}), {status: 200});
        }else{
            return new Response(jsonRes({msg: "Unable to update post"}), {status: 400});
        }


    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 400});
    }
}

export async function DELETE(request, route){
    const postId = route.params.id;

    try {
        const deletedPost = await Post.findByIdAndDelete({_id: postId})
        if(deletedPost){
            return new Response(jsonRes({msg: "success"}), {status: 200});
        }else{
            return new Response(jsonRes({msg: "Unable to delete post"}), {status: 400});
        }
    } catch (error) {
        return new Response(jsonRes({msg: error.message}), {status: 400});       
    }
}