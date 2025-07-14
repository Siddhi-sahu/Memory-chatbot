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
        text: "hii i am a user, answer in less than 5 words.",
        type: "human"
    } 
]);
    const [prompt, setPrompt] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
        console.log(prompt)
    };

    const handleSubmit = async() => {
        console.log("pressed submit")
        try{
            const data = await fetch("/api/memory", {
            method: "POST",
            body: JSON.stringify({ prompt }),
            headers: {
                'Content-Type': 'application/json'
            }
            });
            const response = await data.json();


            if(!data.ok){
                setWarning("Something went wrong. Please try again.");
                console.log("data: ",data);
            };

            
        
            // const formattedMessages = response.text.response
            // setMessages((prevMessages) => [...prevMessages,])
            console.log("response from ai ", response);
            

        }catch(e){
            console.error(e);
            console.log("Error while submitting to /memory");
            setWarning("SomeThing went wrong")
        };

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
                    
                    <Button type='submit' className='bg-slate-500 border border-white px-2 py-1 rounded-md'  onClick={handleSubmit} >
                     Send
                    </Button>
                 </div>
                    {warning ? <p className='text-red-700'>{warning}</p>: ""}

            </div>

            
        </div>
        </div>
    );
};

export default PromptSection;
