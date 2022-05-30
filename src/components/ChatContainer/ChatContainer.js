import React, { useEffect, useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import ChatMessage from "../ChatMessage/ChatMessage";
import Picker from "emoji-picker-react";
import "./ChatContainer.css";
import { useParams } from "react-router-dom";
import db, { auth } from "../../firebase";
import firebase from "firebase";
const ChatContainer = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const { emailID } = useParams();
  // console.log("Email ID >>>", emailID);
  const chatBox = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [authStatus, setAuthStatus] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const data = await db
        .collection("users")
        .doc(emailID)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
          // console.log("Particular User >>> ", snapshot.data());
        });
      auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthStatus(true);
        } else {
          setAuthStatus(false);
        }
      });
    };

    const getMessages = async () => {
      const data = await db
        .collection("chats")
        .doc(emailID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());
          // console.log("Messagessss >>> ", messages);
          let newMessage = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailID) ||
              message.receiverEmail === (currentUser.email || emailID)
          );
          // console.log("Document info >>>", newMessage);
          setChatMessages(newMessage);
        });
      // const msgId = await db
      //   .collection("chats")
      //   .doc(currentUser.email)
      //   .collection("messages")
      //   .doc('yIPzjkDeHmyZswLGf7AE').delete();
      // console.log("Message Id >>> ", msgId);
    };

    getUser();
    getMessages();
  }, [emailID]);

  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]);

  // console.log("Messages >>>", chatMessages);

  const send = (e) => {
    e.preventDefault();
    if (emailID) {
      let payload = {
        text: message,
        senderEmail: currentUser?.email,
        receiverEmail: emailID,
        timestamp: firebase.firestore.Timestamp.now()
      };
      console.log("PAYLOAD >>>", payload);
      // Sender
      db.collection("chats")
        .doc(currentUser.email)
        .collection("messages")
        .add(payload);

      // Receiver
      db.collection("chats").doc(emailID).collection("messages").add(payload);

      db.collection("friendlist")
        .doc(currentUser.email)
        .collection("list")
        .doc(emailID)
        .set({
          email: chatUser.email,
          fullname: chatUser.fullname,
          photoURL: chatUser.photoURL,
          lastMessage: message,
        });

      db.collection("friendlist")
        .doc(emailID)
        .collection("list")
        .doc(currentUser.email)
        .set({
          email: currentUser.email,
          fullname: currentUser.fullname,
          photoURL: currentUser.photoURL,
          lastMessage: message,
        });

      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src={chatUser?.photoURL} alt="" />
          </div>
          <div>
            <p>{chatUser?.fullname}</p>
            <p className="show-status">{authStatus ? "Online" : "Offline"}</p>
          </div>
        </div>
        <div className="chat-container-header-btn">
          <SearchIcon className="search-icon" />
          <MoreVertIcon />
        </div>
      </div>
      {/* chat display container */}
      <div className="chat-display-container" ref={chatBox}>
        {chatMessages.map((message, index) => (
          <ChatMessage
            message={message.text}
            time={message.timestamp}
            sender={message.senderEmail}
            id={index}
            currentUser={currentUser}
          />
        ))}
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
        <form onSubmit={send}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        {/* send button */}
        <div className="chat-input-send-btn" onClick={send}>
          {/* <MicIcon className="mic-settings" /> */}
          <SendIcon className="send-icon-setting" />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
