import React from 'react'

export default function Home(props) {

return (
    <>
    <nav id="viewnify">viewnify</nav>
    <div class="side-bar">
      <div class="buttons">
      <button class="main-links">
        <p>discover</p>
      </button>
      <button class="main-links">
        <p>watch party</p>
      </button>
      <button class="main-links">
        <p>library</p>
      </button>
      <button class="main-links">
        <p>chatroom</p>
      </button>
      <button class="invite-link">
        <p>invite</p>
      </button>
      </div>
      {/* <div class="side-info">
        <button>hello</button>
      </div> */}
    </div>

<div class="right-container">

<div class="body-container">
<div class="swipe-status">
          <i class="fa fa-remove"></i>
          <i class="fa fa-heart"></i>
        </div>

  <div class="card">
   <div id="media-main">
     <div id="content-img">
     </div>
     <div id="content-description">
     </div>
   </div>
   <div class="swipe-buttons">
          <button id="nope">
            <i class="fa fa-remove"></i>
          </button>
          <button id="love">
            <i class="fa fa-heart"></i>
          </button>
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
    
    <div class="watch-container">
      {/* <h4>ryan</h4> */}
    </div>
  </div>
</div>
</div>
    </>
  )
}

