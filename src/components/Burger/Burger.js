import React, { useState } from 'react';
import { stack as Menu } from 'react-burger-menu';
import { render } from '@testing-library/react';
import {NavLink} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const lightTheme = {
  body: 'white',
  fontColor: 'white',
  background: 'white',
  root: 'white',
  homer: 'white',
  nav: '#FFFFF',
  rightContainer: 'white',
  playPause: '#ededed',
  bmMenu: '#FFFFF',
  darkLight: 'white',

}
// #EDEDED for text
export const darkTheme = {
  body: '#181818',
  fontColor: "black",
  background: "#181818",
  root: '#181818',
  homer: '#181818',
  nav: '#181818',
  rightContainer: '#181818',
  playPause: '#181818',
  bmMenu: '#181818',
  darkLight: '#181818',
  discoverBtn: "#ededed",
  watchParty: "#222222",
  boxShadow: "white",

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
  }

#discover-btn, #watch-party, #library, #chatroom, #invite {
  transition: 0.5s;
  box-shadow: background-color: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.discoverBtn};
  background-color: ${(props) => props.theme.watchParty};
  
}

`
export default function Burger(props) {
  const showSettings = (event) => {
    event.preventDefault()
  }
  return (
    <Menu>
        <NavLink exact activeClassName="main-links" to="/discover" id='discover-btn'>discover</NavLink>
        <NavLink exact activeClassName="main-links" to="/watchparty" id='watch-party'>watch party</NavLink>
        <NavLink exact activeClassName="main-links" to="/library" id="library">library</NavLink>
        <NavLink exact activeClassName="main-links" to="/chatroom" id="chatroom">chatroom</NavLink>
        <NavLink exact activeClassName="main-links" to="/invite" id="invite">invite</NavLink>
        {/* <button id="dark-light"onClick={() => props.themeToggler()}>Change Theme</button> */}
        
      
        {/* <button id='watch-party' className='main-links' >Watch Party</button>
        <button id='library' className='main-links' >Library</button>
        <button id='chatroom' className='main-links' >Chat</button>
        <button id='invite' className='invite-link' >Invite</button> */}
    </Menu>
)
}


// class Burger extends React.Component {
//   showSettings (event) {
//     event.preventDefault()
//   }
//   render() {
//     return (
//         <Menu>
//             <NavLink exact activeClassName="main-links" to="/discover" id='discover-btn'>Discover</NavLink>
//             <NavLink exact activeClassName="main-links" to="/watchparty" id='watch-party'>Watch Party</NavLink>
//             <NavLink exact activeClassName="main-links" to="/library" id="library">Library</NavLink>
//             <NavLink exact activeClassName="main-links" to="/chatroom" id="chatroom">Chatroom</NavLink>
//             <NavLink exact activeClassName="main-links" to="/invite" id="invite">Invite</NavLink>
            
          
//             {/* <button id='watch-party' className='main-links' >Watch Party</button>
//             <button id='library' className='main-links' >Library</button>
//             <button id='chatroom' className='main-links' >Chat</button>
//             <button id='invite' className='invite-link' >Invite</button> */}
//         </Menu>
//     )
//   }
// }

// export default Burger;
