import React, { useState } from 'react';
import { stack as Menu } from 'react-burger-menu';
import { render } from '@testing-library/react';
import {NavLink} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { cgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi"



export const lightTheme = {
  body: 'white',
  fontColor: 'black',
  background: 'white',
  root: 'white',
  homer: 'white',
  nav: '#FFFFF',
  rightContainer: 'white',
  playPause: '#ededed',
  bmMenu: '#FFFFF',
  darkLight: 'white',
  MuiPaperRoot: "white",
  darkLightFont: '#ad33ff',
  darkLightText: '☽'

}
// #EDEDED for text
export const darkTheme = {
  body: '#181818',
  fontColor: "white",
  background: "#181818",
  root: '#181818',
  homer: '#181818',
  nav: '#181818',
  rightContainer: '#181818',
  playPause: '#181818',
  bmMenu: '#181818',
  darkLight: '#181818',
  discoverBtn: "#ededed",
  watchParty: "#181818",
  boxShadow: "white",
  MuiPaperRoot: "#181818",
  darkLightFont: '#d32dff',
  darkLightText: '☼'

};

export const GlobalStyles = createGlobalStyle`

body {
  background-color: ${(props) => props.theme.body};
  transition: 0.3s;
;

}

#root {
background-color: ${(props) => props.theme.root};
transition: 0.3s;
}

#nav {
background-color: ${(props) => props.theme.nav};
transition: 0.3s;
}

#homer {
background-color: ${(props) => props.theme.homer};
transition: 0.3s;
}

.right-container {
background-color: ${(props) => props.theme.rightContainer};
transition: 0.3s;
}

#play-pause {
background-color: ${(props) => props.theme.playPause};
transition: 0.3s;
}

.bm-menu {
  transition: 0.3s;
  z-index: 1;
background: ${(props) => {
  console.log(props)
  return props.theme.bmMenu
}};
}

#dark-light {
  background-color: ${(props) => props.theme.nav};
  transition: 0.3s;
  color: ${(props) => props.theme.darkLightFont};
  text: ${(props) => props.theme.darkLightText};
  transition: 0.3s;
  }

#discover-btn, #watch-party, #library, #chatroom, #invite, #preferences, .watch-header, .create-party, .discover, .watch-content {
  transition: 0.3s;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.discoverBtn};
  background-color: ${(props) => props.theme.watchParty};
  
}

 .MuiToolbar-root, .MTableHeader-header-13, .MuiTableCell-head, .MuiTableFooter-root, .MTablePaginationInner-root-14   {
  color: ${(props) => props.theme.fontColor} !important;
  background-color: ${(props) => props.theme.MuiPaperRoot} !important;
}


.MuiSelect-root, .MuiSvgIcon-root, .MuiButtonBase-root, .MuiTable-root, .MuiInputBase-root, .MuiInputAdornment-root, .MuiIcon-root   {
  color: ${(props) => props.theme.fontColor} !important;
  background-color: ${(props) => props.theme.MuiPaperRoot} !important;
}

.shadowed {
  color: ${(props) => props.theme.fontColor} !important;
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
