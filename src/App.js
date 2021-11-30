import React from "react";

import NavBar from "./components/NavBar";
import LandingPage from "./components/Landing/LandingPage";
import useToken from "./useToken";
import Home from "./components/Home/Home";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div id="main">
        <NavBar showLogin={false} />
        <Home></Home>
        {/* <NavBar showLogin={true} setToken={setToken} />
        <LandingPage setToken={setToken} /> */}
      </div>
    );
  }

  return (
    <>
      <NavBar showLogin={false} />
    </>
  )
}

export default App;
