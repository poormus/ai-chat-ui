"use client";
import ChatMessage from "@/components/chat_box";
import ChatTextField from "@/components/chat_text_area";
import RouteWrapper from "@/components/routewrapper";
import { delay, generateRandomNumber } from "@/lib/utils";
import { sendMessage } from "@/network/chat";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    handleInitialMessage();
  }, []);

  async function handleInitialMessage() {
    const messageContentString =
      "Hello, I am a chatbot you can chat with me about anything. Try typing a message to me and I will respond to you.";
    const messageWordArray = messageContentString.split(" ");
    const initialMessage: Message = {
      id: generateRandomNumber(),
      content: "",
      role: "assistant",
    };
    for (const word of messageWordArray) {
      await delay(200);
      initialMessage.content = `${initialMessage.content} ${word}`;
      setMessages([...messages, initialMessage]);
    }
  }
  async function onSend(message: string) {
    const newMessage: Message = {
      id: generateRandomNumber(),
      content: message,
      role: "user",
    };
    messages.push(newMessage);
    setSending(true);
    setMessages([...messages]);
    // result is streamed so i create an id for the returned message
    // update message with the given id
    const id = generateRandomNumber();
    const aiMessage: Message = { id, content: "...", role: "assistant" };
    // Add the AI message placeholder to the messages
    setMessages([...messages, aiMessage]);
    // map throug the messages and update the message with results for the id above
    sendMessage(message, async (result) => {
      const lines = result
        .toString()
        .split("\n")
        .filter((line) => line.trim() !== "");

      for (const line of lines) {
        await delay(200);
        const message = line.replace(/^data: /, "");
        aiMessage.content = message;
        setMessages([...messages, aiMessage]);
      }
      setSending(false);
    });
  }
  return (
    <RouteWrapper>
      <div className="flex flex-col h-screen w-full">
        {/* Message container */}
        <div className="flex-1 w-full overflow-y-auto px-3 mt-3">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        {/* Chat text field at the bottom */}
        <div className="w-full p-3 flex items-center justify-center">
          <ChatTextField
            sending={sending}
            onSend={(message) => onSend(message)}
          />
        </div>
      </div>
    </RouteWrapper>
  );
}
