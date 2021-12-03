import React, { useState, useEffect, useRef } from "react";
import playIco from "./play_ico.png";
import pauseIco from "./pause_ico.png";

export default function Swipe(props) {

    const saveLike = () => {
        fetchChoice("likes", media[curIdx], props.token).then((data) => {
          console.log(data);
          setCurIdx(curIdx + 1);
        });
      };
    
    const saveDislike = () => {
    fetchChoice("dislikes", media[curIdx], props.token).then((data) => {
        console.log(data);
        setCurIdx(curIdx + 1);
    });
    };

  return (
    <div className="body-container" ref={cardContainerRef}>
      <div className="card">
        <div
          className="media-main"
          style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
        >
          <div id="content-img">
            <img id="cur-content-img" src={images[curIdx]} />
          </div>
        </div>
        {/* <div id="media-main-2">
                            <div id="content-img">
                                <img src={images[1]} />
                            </div>
                        </div> */}
        <div
          id="play-pause"
          onClick={saveDislike}
          style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
        >
          <button id="play-btn">
            <img className="discover-btn pause-ico" src={pauseIco} />
          </button>
          {/* <button id="play-btn">
                                <div id="back-symbol"></div>
                                <div id="back-symbol"></div>
                            </button>
                            <button id="play-btn">
                                <div id="up-symbol"></div>
                                <div id="up-symbol"></div>
                            </button> */}
          <button id="play-btn" onClick={saveLike}>
            <img className="discover-btn play-ico" src={playIco} />
          </button>
        </div>

        <div className="watch-container">{/* <h4>ryan</h4> */}</div>
      </div>
    </div>
  );
}
