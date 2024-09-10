import { useState } from "react";

interface ChatTextFieldProps {
  onSend: (message: string) => void;
  sending: boolean;
}

function ChatTextField({ onSend, sending }: ChatTextFieldProps) {
  const [message, setMessage] = useState("");

  return (
    <div className="flex items-center border-t border-gray-300 p-4 bg-white w-2/4">
      {/* Text Input */}
      <textarea
        className="flex-grow resize-none h-10 max-h-28 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={1}
      />
      {/**  Send Button
       * add a disabled attribute to the button element
       */}
      <button
        disabled={sending || message.trim() === ""}
        onClick={() => {
          if (message.trim() === "") {
            return;
          }
          onSend(message);
          setMessage("");
        }}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </div>
  );
}

export default ChatTextField;
