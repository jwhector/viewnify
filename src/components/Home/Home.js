import React from 'react';
import './home.css';
import Discover from '../Discover/Discover';
import Menu from '../Burger/Burger';
import { useState } from 'react'
import WatchParty from '../WatchParty/WatchParty';
import Library from '../Library/Library';
import Chatroom from '../Chatroom/Chatroom';
import Invite from '../Invite/Invite';

export default function Home(props) {

  const [page, setPage] = useState('')

  const renderPage = () => {
    if(props.page==="discover") {
      return <Discover user={props.user} token={props.token} />;
    }
    if(props.page==="watchparty") {
      return <WatchParty user={props.user} token={props.token} />;
    }
    if(props.page==="library") {
      return <Library user={props.user} token={props.token} />;
    }
    if(props.page==="chatroom") {
      return <Chatroom user={props.user} token={props.token} />;
    }
    if(props.page==="invite") {
      return <Invite user={props.user} token={props.token} />;
    }
  };

  return (
    <div className="home" id="homer">
      <Menu />
      <div className="right-container">
        {renderPage()}
      </div>
    </div>
  );
}