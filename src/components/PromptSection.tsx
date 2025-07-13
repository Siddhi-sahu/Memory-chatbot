"use client"
import React, { useState } from 'react';
import Messages from './Messages';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageType } from './Messages';

const PromptSection = () => {
    const [messages, setMessages] = useState<MessageType[]>([{
        text: "hii i can remember things about you for you...",
        type: "ai"
    },{
        text: "hii i am a user",
        type: "human"
    }]);
    const [prompt, setPrompt] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);

    };

    const handleSubmit = () => {

    }

    const fetchResponse = async() => {
        const response = await fetch("/api/memory", {
            method: "POST",
            body: JSON.stringify({prompt}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return (
        <div className=" h-screen flex justify-center ">
        <div className="flex max-w-5xl w-full mx-auto bg-black">

            <div className='flex flex-col justify-center items-center max-w-4xl w-full'>
                <div className='flex w-full max-w-lg justify-center items-center mb-5'>
                <Messages messages={messages}/>
                </div>

                 <div className="flex w-full max-w-lg justify-center items-center gap-2">
                    <Input placeholder="Tell me about yourself..." onChange={handleInputChange}/>
                    <Button type="submit"  className='bg-slate-500 border border-white' onClick={handleSubmit}>
                     Send
                    </Button>
                 </div>

            </div>

            
        </div>
        </div>
    );
};

export default PromptSection;
