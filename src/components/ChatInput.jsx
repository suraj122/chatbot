import React, { useRef, useState } from "react";

const ChatInput = ({ userMessage, setUserMessage, handleSubmit }) => {
  return (
    <div className="fixed bottom-0 left-[60px] right-[60px] w-full py-16 mt-4 bg-gray-500">
      <form onSubmit={handleSubmit} className="">
        <input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="bg-black text-white w-[600px]"
          type="text"
        />
        <button>send</button>
      </form>
    </div>
  );
};

export default ChatInput;
