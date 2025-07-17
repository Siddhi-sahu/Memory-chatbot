import { getRedisClient } from "@/lib/redis";
import { RedisChatMessageHistory } from "@langchain/redis";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    // need redis client and get messages for the sessionId

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if(!sessionId){
        console.error("session is is required")
        return NextResponse.json({
            error: "Sessionid is required"
        },{
            status: 404
        });
    };

    const redisClient = getRedisClient();

    if(!redisClient.isOpen){
        await redisClient.connect()
    }

    try{
        const history = new RedisChatMessageHistory({
            sessionId,
            sessionTTL: 300,
            client: redisClient
        });

        const messages = await history.getMessages();
        return NextResponse.json({ messages }, { status: 200 })

    }catch(e){
        console.error("error in getMessages; ", e);

        return NextResponse.json({
            error: "error in getMessages"
        }, {
            status: 500
        })

    }

}