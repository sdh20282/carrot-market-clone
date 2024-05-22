"use client";

import { useState } from "react"

import { ChatMessageListType } from "@/lib/database/get-chat-room-messages"
import Image from "next/image";
import { ArrowUpCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";

interface ChatMessageProps {
  initialMessages: ChatMessageListType;
}

export default function ChatMessageList({
  initialMessages, userId
}: ChatMessageProps & { userId: number }) {
  const [messages, setMessages] = useState(initialMessages);

  const [message, setMessage] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setMessage(value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    alert(message);

    setMessage("");
  };

  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 items-start ${message.userId === userId ? "justify-end" : ""}`}
        >
          <div className="size-10 overflow-hidden rounded-full">
            {
              message.userId === userId
              ? null
              :
                message.user.avatar 
                ? <Image src={message.user.avatar} width={40} height={40} alt={message.user.username} />
                : <UserIcon />
            }
          </div>
          <div className={`flex flex-col gap-3 ${message.userId === userId ? "items-end" : ""}`}>
            <span className={`${
                message.userId === userId ? "bg-neutral-500" : "bg-orange-500"
              } p-2.5 rounded-md`}>
              {message.payload}
            </span>
            <span className="text-xs">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
       <form className="flex relative" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="Write a message..."
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
        </button>
      </form>
    </div>
  )
}