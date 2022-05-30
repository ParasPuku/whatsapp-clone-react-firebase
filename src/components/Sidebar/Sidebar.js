import React, { useEffect, useState } from "react";
import TollIcon from "@mui/icons-material/Toll";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import UserProfile from "../UserProfile/UserProfile";
import "./Sidebar.css";
import db from "../../firebase";
const Sidebar = ({ currentUser, signOut }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setFriendList] = useState([]);
  // console.log("Sidebar currentUser >>>", currentUser);
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await db.collection("users").onSnapshot((snapshot) => {
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email)
        );
      });
    };
    const getFriends = async () => {
      const data = await db
        .collection("friendlist")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs);
        });
    };
    getAllUsers();
    getFriends();
  }, []);
  // console.log("USERS >>>", allUsers);

  const searchedUser = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
    }
  });

  const searchItem = searchedUser.map((user) => {
    return (
      <UserProfile
        name={user.data().fullname}
        photoURL={user.data().photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img" onClick={signOut}>
          <img src={currentUser.photoURL} alt="" />
        </div>
        <div className="sidebar-header-btn">
          <TollIcon />
          <InsertCommentIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <SearchIcon />
          <input
            type="text"
            name="search"
            placeholder="Search or start new chat"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </div>
      </div>
      <div className="sidebar-chat-list">
        {searchItem.length > 0
          ? searchItem
          : friendList.map((friend) => {
              <UserProfile
                name={friend.data().fullname}
                photoURL={friend.data().photoURL}
                lastMessage={friend.data().lastMessage}
                email={friend.data().email}
              />;
            })}
      </div>
    </div>
  );
};

export default Sidebar;
