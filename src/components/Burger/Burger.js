import React, { useState } from 'react';
import { stack as Menu } from 'react-burger-menu';
import { render } from '@testing-library/react';
import {NavLink} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import useToken from "../../useToken";
import Preferences from '../Preferences/PreferencesPage'
import ReactModal from 'react-modal';

export const lightTheme = {
  body: '#ededed',
  fontColor: 'black',
  background: '#ededed',
  root: '#ededed',
  homer: '#ededed',
  nav: '#FFFFF',
  rightContainer: '#ededed',
  playPause: '#ededed',
  bmMenu: '#FFFFF',
  darkLight: '#ededed',
  MuiPaperRoot: "#ededed",
  darkLightFont: '#ad33ff',
  darkLightText: '☽',
  bottomBorder: 'linear-gradient (0deg, #ededed 0%, transparent 20%)',
  miniBox: '#000000',
  miniCardTitle: "#872ed0"

}
// #EDEDED for text
export const darkTheme = {
  body: '#0E0E0E',
  fontColor: "white",
  background: "#0E0E0E",
  root: '#0E0E0E',
  homer: '#0E0E0E',
  nav: '#0E0E0E',
  rightContainer: '#0E0E0E',
  playPause: '#0E0E0E',
  bmMenu: '#0E0E0E',
  darkLight: '#0E0E0E',
  discoverBtn: "#ededed",
  watchParty: "#0E0E0E",
  boxShadow: "white",
  MuiPaperRoot: "#0E0E0E",
  darkLightFont: '#d32dff',
  darkLightText: '☼',
  shadowColor: "1px 1.2px 1.2px #7f7f7f",
  bottomBorder: 'black',
  navBtnBackground: "#212121",
  miniBox: '#ededed',
  miniCardTitle: "#ededed"


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

.mini-card-title-flex {
  text: ${(props) => props.theme.miniCardTitle};
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

.mini-card:hover {
  background-color: ${(props) => props.theme.fontColor};
}

#dark-light {
  background-color: ${(props) => props.theme.nav};
  transition: 0.3s;
  color: ${(props) => props.theme.darkLightFont};
  text: ${(props) => props.theme.darkLightText};
  transition: 0.3s;
  }

#discover-btn, #watch-party, #library, #chatroom, #invite, #preferences, #logout,.watch-header, .create-party, .discover, .watch-content, #preferences-btn {
  transition: 0.3s;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.discoverBtn};
  background-color: ${(props) => props.theme.navBtnBackground};
  
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
  text-shadow: ${(props) => props.theme.shadowColor} !important;
}

.mini-card {
  box-shadow: ${(props) => `2px 2px ${props.theme.miniBox}`}
}

`



export default function Burger(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const showSettings = (event) => {
    event.preventDefault()
  }
  const { token, setToken } = useToken();
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.reload(true);
  }

  const openModal = () => {
    setModalOpen(true);
    setMenuOpen(false);
  }
  
  const clearModal = () => {
    setModalOpen(false);
  }

  return (

    <Menu isOpen={menuOpen}>
        <NavLink exact activeClassName="main-links" to="/discover" id='discover-btn'>discover</NavLink>
        <NavLink exact activeClassName="main-links" to="/watchparty" id='watch-party'>watch party</NavLink>
        <NavLink exact activeClassName="main-links" to="/library" id="library">library</NavLink>
        <NavLink exact activeClassName="main-links" to='' onClick={openModal}  id="preferences-btn">categories</NavLink>
        <NavLink exact activeClassName="main-links" to="/" onClick={removeToken} id="logout">log out</NavLink>
        {/* <button id="dark-light"onClick={() => props.themeToggler()}>Change Theme</button> */}
        
        <ReactModal isOpen={modalOpen}
          className="preferences-modal"
          overlayClassName="preferences-modal-overlay"
          onRequestClose={clearModal}
          closeTimeoutMS={200}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          >
            <Preferences token={props.token} closeModal={clearModal} />
          </ReactModal>

        {/* <button id='watch-party' className='main-links' >Watch Party</button>
        <button id='library' className='main-links' >Library</button>
        <button id='chatroom' className='main-links' >Chat</button>
        <button id='invite' className='invite-link' >Invite</button> */}
    </Menu>
  )
}
