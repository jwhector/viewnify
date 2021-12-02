import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/Landing/LandingPage";
import useToken from "./useToken";
import Home from "./components/Home/Home";
import Liked from "./components/Home/Liked";
import Button from "./components/Home/Button"
import Discover from "./components/Discover/Discover";
import WatchParty from "./components/WatchParty/WatchParty";
import Library from "./components/Library/Library";
import Chatroom from "./components/Chatroom/Chatroom";
import Invite from "./components/Invite/Invite";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";



// async function login()

function App() {
  const { token, setToken } = useToken();
  const [genres, setGenres] = useState('');
  const [providers, setProviders] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3005/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer: ${token}`
        }
      }).then(async res => {
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          delete data.password;
          setUser(data);
        }
      }).catch(err => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3005/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer: ${token}`
        }
      }).then(async res => {
        if (!res.ok) {
          localStorage.removeItem('token');
          setToken(null);
        }
      }).catch(err => console.log(err));
    }
  });

  if (!token) {
    return (
      <div id="main">
        <NavBar showLogin={true} setToken={setToken} />
        <LandingPage setToken={setToken}
          genres={genres}
          setGenres={setGenres}
          providers={providers}
          setProviders={setProviders} />
      </div>
    );
  } else {
    // location.href = `${process.env.PUBLIC_URL}/discover`;
  }

  return (
    <>
      <NavBar showLogin={false} />
      <Router>
        <Routes>

        <Route path="/" element={<Home page="discover" />} />
        <Route path="/discover" element={<Home page="discover" />} />
        <Route path="/watchparty" element={<Home page="watchparty" />} />
        <Route path="/library" element={<Home page="library" />} />
        <Route path="/chatroom" element={<Home page="chatroom" />} />
        <Route path="/invite" element={<Home page="invite" />} />
        {/* <Route path="/watchparty" exact component={WatchParty} />
        <Route path="library" exact component={Library} />
        <Route path="chatroom" exact component={Chatroom} />
        <Route path="invite" exact component={Invite} /> */}
        
        </Routes>

      </Router>
    </>
  )
}

export default App;
