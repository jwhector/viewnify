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
    <div className="home">
      <Menu />
      <div className="right-container">
        {renderPage()}
      </div>
    </div>
  );
}