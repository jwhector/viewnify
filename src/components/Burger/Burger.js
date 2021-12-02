import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import { render } from '@testing-library/react';

class Burger extends React.Component {
  showSettings (event) {
    event.preventDefault()
  }
  render() {
    return (
        <Menu>
            <button id='discover-btn' className='main-links' >Discover</button>
            <button id='watch-party-btn' className='main-links' >Watch Party</button>
            <button id='library-btn' className='main-links' >Library</button>
            <button id='chatroom-btn' className='main-links' >Chat</button>
            <button id='invite-btn' className='invite-link' >Invite</button>
        </Menu>
    )
  }
}

export default Burger;
