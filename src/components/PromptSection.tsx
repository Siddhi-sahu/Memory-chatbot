"use client"
import React, { useEffect, useRef, useState } from 'react';
import Messages from './Messages';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageType } from './Messages';
//fix chain issue  TODO: we need sessionId for that, store session id in local storage
//1. percisting memory for ai and chain
//2. displaying on the ui past messages
const PromptSection = () => {
    const [messages, setMessages] = useState<MessageType[]>([{
        text: "hii i can remember things about you for you...",
        type: "ai"
    }
]);
    const [prompt, setPrompt] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const hasFetchedMessages = useRef(false);
   
    useEffect(()=>{
        if(!hasFetchedMessages.current){
        const storedSessionId = localStorage.getItem("sessionId");
        if(storedSessionId){
            setSessionId(storedSessionId);
            fetchMessages(storedSessionId);
        }
        hasFetchedMessages.current = true

        }    
    },[]);

    const fetchMessages = async(sessionId: string) =>{
        const response = await fetch(`/api/getmessages?sessionId=${sessionId}`);

        const data = await response.json();

        if(data.messages){
            const formattedMessages: MessageType[] = data.messages.map((msg: ReturnType<typeof data.messages>)=>({
                text: msg.kwargs.content,
                type: msg.id.includes("HumanMessage") ? "human" : "ai"
            }));

            setMessages((prevMessage) => [...prevMessage, ...formattedMessages])

        }

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };
    
    const handlekeySubmit = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            handleSubmit();
        }else{
            return;
        }
    }
    
    const handleSubmit = async() => {     
        if(!prompt){
            setWarning("Prompt is required.");
            return;
        }
        try{
            const data = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt, sessionId: localStorage.getItem("sessionId") }),
            });
            
            if(!data.ok){
                setWarning("Something went wrong. Please try again.");
                console.log("data: ",data);
                const text = await data.text();
                console.error(`Error ${data.status}: ${text}`);
                return;
            };
            const response = await data.json();
            if(!sessionId && response.sessionId){
                localStorage.setItem("sessionId", response.sessionId)

            }
            setMessages((prevMessages) => [...prevMessages, { text: prompt, type: "human"},
                {
                    text: response.text.response,
                    type: "ai"
                }
            ]);
            setPrompt("");
            setWarning("");
            
        }catch(e){
            console.error(e);
            console.log("Error while submitting to /chat");
            setWarning("Something went wrong");
            return;
        };

    };

    
    return (
        <div className="h-screen flex justify-center ">
            
        <div className="flex max-w-5xl w-full mx-auto">
            <div className='flex flex-col justify-center items-center max-w-4xl w-full'>
                <div className='flex w-full max-w-lg justify-center items-center mb-5'>
                <Messages messages={messages}/>
                </div>

                 <div className="flex w-full max-w-lg justify-center items-center gap-2">
                    <Input placeholder="Tell me about yourself..." value={prompt} onChange={handleInputChange} onKeyDown={handlekeySubmit}/>
                    
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
