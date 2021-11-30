import React from "react";

import NavBar from "./components/NavBar";
import LandingPage from "./components/Landing/LandingPage";
import useToken from "./useToken";
import Home from "./components/Home/MainContent";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
      <Home></Home>
        {/* <NavBar showLogin={true} setToken={setToken} />
        <LandingPage setToken={setToken} /> */}
      </>
    );
  }

  return (
    <>
      <NavBar showLogin={false} />
    </>
  )
}

export default App;
