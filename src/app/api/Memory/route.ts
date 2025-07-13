//need to send openai response with memory

import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    const { prompt } = req.body;
    if(!prompt){
        console.log("Prompt is required");
        return NextResponse.json({
            msg: "Prompt is required"
        },{
            status: 404
        })
    }

    try{
        const model = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0
    });

    const memory = new BufferMemory();

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