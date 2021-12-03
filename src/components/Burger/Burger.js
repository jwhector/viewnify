import React, { useState } from 'react';
import { stack as Menu } from 'react-burger-menu';
import { render } from '@testing-library/react';
import {NavLink} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const lightTheme = {
  body: '#999',
  fontColor: 'white',
  background: 'white',
  root: 'white',
  homer: 'white',
  nav: '#FFFFF',
  rightContainer: 'white',
  playPause: '#FFFFF',
  bmMenu: 'blue',
  darkLight: 'purple',

}

export const darkTheme = {
  body: '#555',
  fontColor: "black",
  background: "#010101",
  root: '#010101',
  homer: '#010101',
  nav: '#080808',
  rightContainer: '#010101',
  playPause: 'blue',
  bmMenu: 'yellow',
  darkLight: 'pink'

};

export const GlobalStyles = createGlobalStyle`

body {
  background-color: ${(props) => props.theme.body};
;

}

#root {
background-color: ${(props) => props.theme.root};
}

#nav {
background-color: ${(props) => props.theme.nav}
}

#homer {
background-color: ${(props) => props.theme.homer}
}

rightContainer {
background-color: ${(props) => props.theme.rightContainer}
}

#playPause {
background-color: ${(props) => props.theme.playPause}
}

#bmMenu {
background-color: ${(props) => props.theme.bmMenu}
}

#darkLight {
  background-color: ${(props) => props.theme.fontColor}
  }

`

export default function Burger(props) {
  const showSettings = (event) => {
    event.preventDefault()
  }

  return (
    <Menu>
        <NavLink exact activeClassName="main-links" to="/discover" id='discover-btn'>Discover</NavLink>
        <NavLink exact activeClassName="main-links" to="/watchparty" id='watch-party'>Watch Party</NavLink>
        <NavLink exact activeClassName="main-links" to="/library" id="library">Library</NavLink>
        <NavLink exact activeClassName="main-links" to="/chatroom" id="chatroom">Chatroom</NavLink>
        <NavLink exact activeClassName="main-links" to="/invite" id="invite">Invite</NavLink>
        <div className="main-links" id="preferences" >Preferences</div>
        {/* <button id="dark-light"onClick={() => props.themeToggler()}>Change Theme</button> */}
        
      
        {/* <button id='watch-party' className='main-links' >Watch Party</button>
        <button id='library' className='main-links' >Library</button>
        <button id='chatroom' className='main-links' >Chat</button>
        <button id='invite' className='invite-link' >Invite</button> */}
    </Menu>
  )
}
