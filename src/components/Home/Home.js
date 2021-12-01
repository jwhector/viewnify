import React from 'react';
import './home.css';
import Discover from '../Discover/Discover';

export default function Home(props) {

  return (
    <div className="home">
      <div className="side-bar">
        <button className="main-links">
          <p>discover</p>
        </button>
        <button className="main-links">
          <p>watch party</p>
        </button>
        <button className="main-links">
          <p>library</p>
        </button>
        <button className="main-links">
          <p>chatroom</p>
        </button>
        <button className="invite-link">
          <p>invite</p>
        </button>
      </div>
      <div className="right-container">
        <Discover />
      </div>
    </div>
  );
}