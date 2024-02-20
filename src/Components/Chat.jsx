import { useEffect, useState, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const socket = io("http://localhost:3001");

function Chat({ username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const messageContainerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("join_room", { room });

    socket.on("previous_conversation", (data) => {
      setConversation(data);
      scrollToBottom();
    });

    socket.on("receive_message", (data) => {
      // Update the conversation with the new message
      setConversation((prevConversation) => [...prevConversation, data]);
      scrollToBottom();
    });

    return () => {
      socket.off("previous_conversation");
      socket.off("receive_message");
    };
  }, [room]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      const currentDate = new Date().toLocaleDateString(); // Get the current date
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMessageData = {
        room,
        user: username,
        text: currentMessage,
        time: `${currentDate}  ${currentTime}`,
      };

      // Add the new message to the conversation immediately
      setConversation((prevConversation) => [
        ...prevConversation,
        newMessageData,
      ]);

      // Emit the message to the server
      socket.emit("send_message", newMessageData);

      // Clear the input field
      setCurrentMessage("");
    }
  };

  const logOut = () => {
    localStorage.removeItem("chatUser");
    navigate("/");
  };

  return (
    <div className="flex w-full max-w-4xl mx-auto flex-col h-[90vh]">
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white p-4">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Chat-App</p>

          <div className="flex items-center gap-4">
            <span className="uppercase font-bold text-sm">{username}</span>{" "}
            <button onClick={logOut}>Logout</button>
          </div>
        </div>
      </div>
      <ScrollToBottom
        className="flex-grow overflow-y-auto bg-white p-4"
        ref={messageContainerRef}
      >
        {conversation.map((message, index) => (
          <div
            className={`flex ${
              username === message.user ? "justify-end" : "justify-start"
            } mb-2`}
            key={index}
          >
            <div
              className={`p-4  border-gray-400 rounded ${
                username === message.user
                  ? "bg-teal-200 text-right mr-3"
                  : "bg-gray-200 text-left"
              }`}
            >
              <div className="font-semibold text-xs mb-1">
                {moment(message.time).format("MMMM Do YYYY, h:mm:ss a")}
              </div>
              <div className="font-semibold text-xs mb-1">{message.user}</div>
              <div className="text-gray-900">{message.text}</div>
            </div>
          </div>
        ))}
      </ScrollToBottom>
      <div className="bg-white border-t p-4">
        <div className="flex">
          <input
            className="flex-grow px-5 py-3 text-lg rounded-l-lg font-bold outline-none border-teal-400 border"
            type="text"
            placeholder="Type your message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded-r-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
