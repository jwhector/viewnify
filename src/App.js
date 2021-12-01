import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/Landing/LandingPage";
import useToken from "./useToken";
import Home from "./components/Home/Home";

// async function login()

function App() {
  const { token, setToken } = useToken();
  const [genres, setGenres] = useState('');
  const [providers, setProviders] = useState('');
  // const [redirect, setRedirect] = useState('false');

  useEffect(() => {
    console.log(token);
    if (token) {
      fetch('http://localhost:3005/api/users', {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        }
      }).then(res => {
        if (!res.ok) {
          // setToken(null);
          localStorage.removeItem('token');
          setToken(null);
          console.log(token);
          // setRedirect(true);
        }
      }).catch(err => console.log(err));

      // console.log(checkToken);
        // body: JSON.stringify(credentials)
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
      <Home />
    </>
  )
}

export default App;
