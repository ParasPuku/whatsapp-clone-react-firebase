import React from "react";
import "./UserProfile.css";
const UserProfile = ({ name, photoURL }) => {
  return (
    <div className="user-profile">
      {/* user image */}
      <div className="user-image">
        <img src={photoURL} alt="" />
      </div>
      {/* name of user */}
      <div className="user-info">
        <p className="user-name">{name}</p>
      </div>
    </div>
  );
};

export default UserProfile;
