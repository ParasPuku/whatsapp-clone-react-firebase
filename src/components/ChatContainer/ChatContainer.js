import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import ChatMessage from "../ChatMessage/ChatMessage";
import Picker from "emoji-picker-react";
import "./ChatContainer.css";
const ChatContainer = () => {
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src="./user.png" alt="" />
          </div>
          <p>Paras Puru</p>
        </div>
        <div className="chat-container-header-btn">
          <SearchIcon className="search-icon" />
          <MoreVertIcon />
        </div>
      </div>
      {/* chat display container */}
      <div className="chat-display-container">
        <ChatMessage message="Hello..How are you?" time="25-05-2022" />
      </div>
      {/* chatinput */}
      <div className="chat-input">
        {/* buttons */}
        {openEmojiBox && (
          <Picker
            onEmojiClick={(event, emojiObject) =>
              setMessage(message + emojiObject.emoji)
            }
          />
        )}
        <div className="chat-input-btn">
          <InsertEmoticonIcon onClick={() => setOpenEmojiBox(!openEmojiBox)} />
          <AttachFileIcon className="attach-icon" />
        </div>
        {/* text input element */}
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        {/* send button */}
        <div className="chat-input-send-btn">
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
