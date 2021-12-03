import React from 'react';
import './home.css';
import Discover from '../Discover/Discover';
import Menu from '../Burger/Burger';
import { useState } from 'react'
import WatchParty from '../WatchParty/WatchParty';
import Library from '../Library/Library';
import Chatroom from '../Chatroom/Chatroom';
import Invite from '../Invite/Invite';

export const lightTheme = {
  body: '#999',
  fontColor: '#4444',
  background: 'white',
  root: 'white',
  homer: 'white',
  nav: '#FFFFF',
  rightContainer: 'white',
  playPause: '#FFFFF',
  bmMenu: 'blue',

}

export const darkTheme = {
  body: '#555',
  fontColor: "#fff",
  background: "#010101",
  root: '#010101',
  homer: '#010101',
  nav: '#080808',
  rightContainer: '#010101',
  playPause: 'blue',
  bmMenu: 'yellow',

};

export default function Home(props) {

  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  const [page, setPage] = useState('')

  const renderPage = () => {
    if(props.page==="discover") {
      return <Discover user={props.user} />;
    }
    if(props.page==="watchparty") {
      return <WatchParty user={props.user}/>;
    }
    if(props.page==="library") {
      return <Library user={props.user} />;
    }
    if(props.page==="chatroom") {
      return <Chatroom user={props.user}/>;
    }
    if(props.page==="invite") {
      return <Invite user={props.user}/>;
    }
  };

  return (
    <div className="home" id="homer">
      <Menu themeToggler={themeToggler}/>
      <div className="right-container">
        {renderPage()}
      </div>
    </div>
  );
}