import React, { useState } from "react";
import db, { auth } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ChatMessage.css";

const ChatMessage = ({ message, time, sender, id, currentUser }) => {
  const [showButton, setShowButton] = useState(false);
  const handleDeleteMessage = (id) => {
    console.log("clicked delete", id);   
    // const isDeleted = db.collection('chats').doc(currentUser.email).collection('messages').doc(id).delete();
  };
  return (
    <div
      className="chat-message"
      style={{
        alignSelf:
          sender === auth.currentUser?.email ? "flex-end" : "flex-start",
        backgroundColor:
          sender === auth.currentUser?.email ? "#dcf8c6" : "#ffffff",
      }}
      onMouseEnter={(e) => setShowButton(true)}
      onMouseLeave={(e) => setShowButton(false)}
    >
      <div className="chat-message-text">
        <span>{`${message}`} </span>
        <span className="delete-message">
          {showButton && (
            <DeleteIcon
              className="delete-button"
              onClick={() => handleDeleteMessage(id)}
            />
          )}
        </span>
      </div>
      <div className="chat-message-date">
        <p>{new Date(time.toDate()).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
