import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatResponses from "./ChatResponses";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyByK6lCI2SFPifycngY40xhgbOEFqa_azk";

const ChatBox = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: userMessage },
      ]);
      setUserMessage("");
      generateResponse(userMessage);
    }
  };

  const generateResponse = async (msg) => {
    setIsFetching(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(msg);
      const responseText = await result.response.text();
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "response", text: responseText },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "response",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="relative h-full overflow-auto">
      <ChatResponses chatMessages={chatMessages} isFetching={isFetching} />
      <ChatInput
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatBox;
