import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { RedisChatMessageHistory } from "@langchain/redis";
import { getRedisClient } from "@/lib/redis";


export async function POST(req: Request){
    const { prompt, sessionId: existingSessionId } = await req.json();
    const sessionId = existingSessionId || uuidv4();
    if(!prompt){
        console.log("Prompt is required");
        return NextResponse.json({
            msg: "Prompt is required"
        },{
            status: 404
        })
    }

    const redisClient = getRedisClient();
    if(!redisClient.isOpen){
        await redisClient.connect()
        
    }
    try{
        const model = new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0
        });

        const memory = new BufferMemory({
            chatHistory: new RedisChatMessageHistory({
                sessionId,
                sessionTTL: 300,
                client: redisClient
            })
        });

        const llmChain = new ConversationChain({
                llm: model,
                memory
        });

        const response = await llmChain.invoke({
                input: prompt
        });

        console.log("response from ai: ", response);

        return NextResponse.json({ text: response }, {status: 200})
         
    }catch(e){
        console.error(e);
        return NextResponse.json({
            msg: "Error in Openai/langchain code"
        },
        {
            status: 500
        }
    )

    }
    

}