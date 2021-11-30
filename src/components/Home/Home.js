import React from 'react';
import './home.css';

export default function Home(props) {

  return (
    <div className="home">
      {/* <nav id="viewnify">viewnify</nav> */}
      <div className="side-bar">
        <div className="buttons">
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
        {/* <div className="side-info">
        <button>hello</button>
      </div> */}
      </div>

      <div className="right-container">

        <div className="body-container">

          <div className="card">
            <div id="media-main">
              <div id="content-img">
                {`<img goes here, has a width of 100% and height of 80% of card>`}
              </div>
              <div id="content-description">
                {`content about media goes here, has a width of 75% and height of 20%`}
              </div>
            </div>
            <div id="play-pause">
              <button id="play-btn">
                <div id="play-symbol"></div>
                <div id="play-symbol"></div>
              </button>
              <button id="play-btn">
                <div id="back-symbol"></div>
                <div id="back-symbol"></div>
              </button>
              <button id="play-btn">
                <div id="up-symbol"></div>
                <div id="up-symbol"></div>
              </button>
              <button id="play-btn">
                <div id="next-symbol"></div>
                <div id="next-symbol"></div>
              </button>
            </div>

            <div className="watch-container">
              {/* <h4>ryan</h4> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

