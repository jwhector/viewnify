import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/Landing/LandingPage";
import useToken from "./useToken";
import Home from "./components/Home/Home";
import Liked from "./components/Home/Liked";
import Button from "./components/Home/Button";
import Discover from "./components/Discover/Discover";
import WatchParty from "./components/WatchParty/WatchParty";
import Library from "./components/Library/Library";
import Chatroom from "./components/Chatroom/Chatroom";
import Invite from "./components/Invite/Invite";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  lightTheme,
  darkTheme,
  GlobalStyles,
} from "./components/Burger/Burger";
import styled, { css } from "styled-components";
import MTable from "./components/Library/LibTable";
import MaterialTable from "material-table";
import tw from "twin.macro";
import { jsx } from "@emotion/react";
import Movies from "./components/Library/index.jsx";

const LibraryContainer = tw.div`
  w-full
  max-w-full
  flex
  flex-col
  items-center
  justify-center
  pt-6
  pb-10
  pl-10
  pr-10
`;

const Title = tw.h1`
  text-2xl
  font-semibold
`;

const StyledApp = styled.div`
  color: ${(props) => props.theme.background};
`;

const UserContext = React.createContext(undefined);

// async function login()

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const { token, setToken } = useToken();
  const [genres, setGenres] = useState('');
  const [providers, setProviders] = useState('');
  const [user, setUser] = useState({});
  const [complementary, setComplementary] = useState('#ffffff');

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3005/api/users", {
        method: "GET",
        headers: {
            'Authorization': `Bearer: ${token}`
        }
      }).then(async res => {
        if (res.ok) {
          const data = await res.json();
          // console.log(data);
          delete data.password;
          setUser(data);
        }
      }).catch(err => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3005/api/users/verify', {
        method: 'GET',
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            localStorage.removeItem("token");
            setToken(null);
          }
        })
        .catch((err) => console.log(err));
    }
  });

  if (!token) {
    return (
      <div id="main">
        <NavBar showLogin={true} setToken={setToken} />
        <LandingPage
          token={token}
          setToken={setToken}
          genres={genres}
          setGenres={setGenres}
          providers={providers}
          setProviders={setProviders}
        />
      </div>
    );
  } else if (!user) {
    // location.href = `${process.env.PUBLIC_URL}/discover`;
    return (
      <>
        <NavBar showLogin={false} />
      </>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>

        <StyledApp className="styleme">
        <GlobalStyles />

        {/* <NavBar showLogin={false} themeToggler={themeToggler}/>
        <Router>
          <Routes> */}

          <NavBar showLogin={false} complementary={complementary} setComplementary={setComplementary} themeToggler={themeToggler}  />
          <Router>
            <Routes>

            <Route path="/" element={<Home page="discover" user={user} token={token} complementary={complementary} setComplementary={setComplementary} />} />
            <Route path="/discover" element={<Home page="discover" user={user}  token={token} complementary={complementary} setComplementary={setComplementary} />} />
            <Route path="/watchparty" element={<Home page="watchparty" user={user}  token={token} setComplementary={setComplementary} />} />
            <Route path="/library" element={<Home page="library" user={user}  token={token} setComplementary={setComplementary} />} />
            <Route path="/chatroom" element={<Home page="chatroom" user={user}  token={token} setComplementary={setComplementary} />} />
            <Route path="/invite" element={<Home page="invite" user={user} token={token} />} setComplementary={setComplementary} />
            
            </Routes>

            </Router>
          </StyledApp>
        </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App;
export { UserContext };
