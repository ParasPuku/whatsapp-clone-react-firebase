import React from "react";
import ChatContainer from "../ChatContainer/ChatContainer";
import Sidebar from "../Sidebar/Sidebar";
import "./ChatPage.css";
const ChatPage = ({ currentUser, signOut }) => {
  // console.log("Chat page >>> ", currentUser);
  return (
    <div className="chatpage">
      <div className="chatpage-container">
        {/* sidebar */}
        <Sidebar currentUser={currentUser} signOut={signOut} />
        {/* chatcontainer */}
        <ChatContainer currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ChatPage;
