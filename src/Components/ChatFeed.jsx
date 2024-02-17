import { useEffect, useState } from "react";
import Chat from "./Chat";

const ChatFeed = () => {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem("chatUser");

    // Parse the JSON string to get the user information
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo(parsedUser);
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-800 via-gray-900 to-gray-950 w-full">
      <Chat username={userInfo} room={200} />
    </div>
  );
};

export default ChatFeed;
