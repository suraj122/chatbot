import React from "react";

const ChatResponses = ({ chatMessages, isFetching }) => {
  return (
    <div className="p-16 pb-44">
      {chatMessages?.map((message, index) => (
        <div className="flex flex-col my-4" key={index}>
          {message.type === "user" ? (
            <div className="self-end bg-black text-white rounded-md p-3">
              <p>{message.text}</p>
            </div>
          ) : (
            <div className="self-start bg-black text-white rounded-md p-3">
              <p>{message.text}</p>
            </div>
          )}
        </div>
      ))}
      {isFetching && (
        <div className="self-start bg-black text-white rounded-md p-3">
          <p>Thinking...</p>
        </div>
      )}
    </div>
  );
};

export default ChatResponses;
