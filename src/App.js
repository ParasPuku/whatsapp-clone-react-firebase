import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ChatPage from "./components/ChatPage/ChatPage";
import Login from "./components/Login/Login";
import { useState } from "react";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // console.log("Signed IN USER >>>", user);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((error) => console.log(error.message));
  };
  // console.log("Appppp page >>> ", user);
  return (
    <Router>
      <div className="App">
        {user ? (
          <Routes>
            <Route
              path="/:emailID"
              element={<ChatPage currentUser={user} signOut={signOut} />}
            />
            <Route
              exact
              path="/"
              element={<Home currentUser={user} signOut={signOut} />}
            />
          </Routes>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </Router>
  );
}

export default App;
