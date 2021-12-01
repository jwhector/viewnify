import React from 'react';
import './home.css';
import Discover from '../Discover/Discover';
import Menu from '../Burger/Burger';

export default function Home(props) {

  return (
    <div className="home">
      <Menu />
      <div className="right-container">
        <Discover />
      </div>
    </div>
  );
}