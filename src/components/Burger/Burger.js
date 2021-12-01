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
            <button id='discover' className='main-links' >Discover</button>
            <button id='watch-party' className='main-links' >Watch Party</button>
            <button id='library' className='main-links' >Library</button>
            <button id='chatroom' className='main-links' >Chat</button>
            <button id='invite' className='invite-link' >Invite</button>
        </Menu>
    )
  }
}

export default Burger;
