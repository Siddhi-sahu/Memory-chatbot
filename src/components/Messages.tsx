export type MessageType = {
    text: string;
    type: "human"| "ai"

}
type MessageProps = {
  messages: MessageType[]
}

const Messages = ({messages}: MessageProps) => {
  return (
    <div className="p-4 w-full max-w-lg flex flex-col overflow-y-auto max-h-[90vh]">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={` m-1 rounded-2xl px-4 py-2 whitespace-pre-wrap break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${
            msg.type === 'human'
              ? 'bg-slate-600 text-white ml-auto'
              : 'bg-gray-300 text-black mr-auto'
          }`}
        >
          {msg.text}
        </div>
      ))}
</div>

  )
}

export default Messages

