import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import { render } from '@testing-library/react';
import {NavLink} from "react-router-dom";

class Burger extends React.Component {
  showSettings (event) {
    event.preventDefault()
  }
  render() {
    return (
        <Menu>
            <NavLink exact activeClassName="main-links" to="/discover" id='discover-btn'>Discover</NavLink>
            <NavLink exact activeClassName="main-links" to="/watchparty" id='watch-party'>Watch Party</NavLink>
            <NavLink exact activeClassName="main-links" to="/library" id="library">Library</NavLink>
            <NavLink exact activeClassName="main-links" to="/chatroom" id="chatroom">Chatroom</NavLink>
            <NavLink exact activeClassName="main-links" to="/invite" id="invite">Invite</NavLink>
          
            {/* <button id='watch-party' className='main-links' >Watch Party</button>
            <button id='library' className='main-links' >Library</button>
            <button id='chatroom' className='main-links' >Chat</button>
            <button id='invite' className='invite-link' >Invite</button> */}
        </Menu>
    )
  }
}

export default Burger;
