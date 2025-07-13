export type MessageType = {
    text: string;
    type: "human"| "ai"

}
type MessageProps = {
  messages: MessageType[]
}

const Messages = ({messages}: MessageProps) => {
  return (
    <div className="p4 w-full max-w-lg  flex flex-col">
    {messages.map((msg)=>(
      <div className={`flex p-2 ${msg.type === 'human'? "bg-slate-600 rounded-full ml-auto ": "mr-auto"}`}>{msg.text}</div>
      
    ))} 
    </div>

    
  )
}

export default Messages