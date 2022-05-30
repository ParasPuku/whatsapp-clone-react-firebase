import React from "react";
import db, { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        navigate("/");
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        db.collection("users").doc(result.user.email).set(newUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login">
      <div className="login-container">
        <img className="login-logo" src="./whatsapp-logo.png" alt="" />
        <p className="login-name">WhatsApp Web</p>
        <button className="login-btn" onClick={signInWithGoogle}>
          <img src="./google-logo.png" alt="Login with google" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
