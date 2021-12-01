import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/Landing/LandingPage";
import useToken from "./useToken";
import Home from "./components/Home/Home";
import Liked from "./components/Home/Liked";
import Button from "./components/Home/Button"


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
  }

  return (
    <>
      <NavBar showLogin={false} />
      <Home user={user} />
    </>
  )
}

export default App;
