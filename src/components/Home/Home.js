import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        {/* Sidebar */}
        <Sidebar />
        {/* A container with whatsapp logo */}
        <div className="home-bg">
          <img src="./connection.png" alt="" />
          <div className="connection-details">
            <p className="connection-header">Keep your phone connected</p>
            <p className="connection-info">
              WhatsApp connect to your phone to sync messages. To reduce data
              usage, connect your phone to wi-fi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
