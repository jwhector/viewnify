import React, { useState, useEffect, useRef } from "react";
import playIco from "./play_ico.png";
import pauseIco from "./pause_ico.png";
import Hammer from "hammerjs";
import waitForElementTransition from "wait-for-element-transition";
import { waitFor } from "@testing-library/react";
// import swipefn from './swipefn';

async function fetchChoice(type, mediaData, token) {
  fetch(`http://localhost:3005/api/${type}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer: ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mediaData),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
}

export default function Swipe(props) {
  const [aIdx, setAIdx] = useState(props.curIdx);
  const [bIdx, setBIdx] = useState(props.curIdx + 1);
  const [draggable, setDraggable] = useState(true);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    if (cardContainerRef.current) {
      const allCards = cardContainerRef.current.querySelectorAll(".media-main");
      const hammers = addSwipe(cardContainerRef.current, allCards);
      return function cleanSwipe() {
        removeSwipe(hammers);
      };
    }
  });

  // useEffect(() => {

  // }, [props.curIdx]);

  const saveLike = () => {
    fetchChoice("likes", props.media[props.curIdx], props.token).then(
      (data) => {
        console.log(data);
        props.setCurIdx(props.curIdx + 1);
      }
    );
  };

  const saveDislike = () => {
    fetchChoice("dislikes", props.media[props.curIdx], props.token).then(
      (data) => {
        console.log(data);
        props.setCurIdx(props.curIdx + 1);
      }
    );
  };

//   const initCards = (tinderContainer, card, index) => {
//     var newCards = document.querySelectorAll(".media-main:not(.removed)");

//     //   newCards.forEach(function (card, index) {
//     //     card.style.zIndex = allCards.length - index;
//     //     card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
//     //     card.style.opacity = (10 - index) / 10;
//     //   });

//     tinderContainer.classList.add("loaded");
//   };

  const addSwipe = (tinderContainer, allCards) => {
    // initCards(tinderContainer);

    const hammers = [];

    allCards.forEach(function (el) {
      var hammertime = new Hammer(el);
      hammers.push(hammertime);

      hammertime.on("pan", function (event) {
        el.classList.add("moving");
      });

      hammertime.on("pan", function (event) {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;
        if (!draggable) return;
        // if (el.classList.contains('removed')) return;

        // tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
        // tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

        var xMulti = event.deltaX * 0.03;
        var yMulti = (event.deltaY + 100) / 80;
        var rotate = xMulti * yMulti;

        el.style.transform =
          "translate(" +
          event.deltaX +
          "px, " +
          event.deltaY +
          "px) rotate(" +
          rotate +
          "deg)";
      });

      hammertime.on("panend", function (event) {
        el.classList.remove("moving");
        // tinderContainer.classList.remove('tinder_love');
        // tinderContainer.classList.remove('tinder_nope');

        var moveOutWidth = document.body.clientWidth;
        var keep =
          Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        if (keep) {
          el.style.transform = "";
        } else {
          var endX = Math.max(
            Math.abs(event.velocityX) * moveOutWidth,
            moveOutWidth
          );
          var toX = event.deltaX > 0 ? endX : -endX;
          var endY = Math.abs(event.velocityY) * moveOutWidth;
          var toY = event.deltaY > 0 ? endY : -endY;
          var xMulti = event.deltaX * 0.03;
          var yMulti = event.deltaY / 80;
          var rotate = xMulti * yMulti;

          if (event.deltaX > 0) {
            saveLike();
          } else {
            saveDislike();
          }

          //   tinderContainer.

          // el.classList.toggle('removed', !keep);
          // hammertime.off('');
          setDraggable(false);
          el.style.transform ="translate(" +toX +"px, " +(toY + event.deltaY) +"px) rotate(" +rotate +"deg)";
        //   initCards(tinderContainer);
          let nextCard;
          if (el.classList.contains("media-A")) {
            nextCard = tinderContainer.querySelector(".media-B");
          } else {
            nextCard = tinderContainer.querySelector(".media-A");
          }
          nextCard.classList.toggle("back");
          nextCard.classList.toggle("front");
          el.classList.toggle("back");
          el.classList.toggle("front");
          returnCard(el);
        }
      });
    });
    return hammers;
  };

  const returnCard = (el) => {
    waitForElementTransition(el).then(() => {
        console.log("ENDING TRANSITION");
        // // el.classList.toggle('front');
        if (el.classList.contains("media-A")) {
          setAIdx(props.curIdx + 2);
        } else {
          setBIdx(props.curIdx + 2);
        }
        el.style.transition = "none";
        el.style.visibility = "hidden";
        el.style.transform = "";

        waitForElementTransition(el).then(() => {
          el.style.visibility = "visible";
          el.style.transition = "";
        });
        // el.style.transition = 'all 0.3s ease-in-out';
        setDraggable(true);
    });
  }

  const removeSwipe = (hammers) => {
    hammers.forEach((hammertime) => {
      hammertime.off("pan panend");
    });
  };

  return (
    <div className="body-container" ref={cardContainerRef}>
      <div className="card">
        <div
          className="media-main media-B back"
          style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
        >
          <div id="content-img">
            <img id="cur-content-img" src={props.images[bIdx]} />
          </div>
          <div className="content-description">
              <img className="content-background" src={props.media[bIdx]?.backdrop} />
              <div className="media-a-info">

              </div>
          </div>
        </div>
        <div
          className="media-main media-A front"
          style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
        >
          <div id="content-img">
            <img id="cur-content-img" src={props.images[aIdx]} />
          </div>
          <div className="content-description">
              <img className="content-background" src={props.media[aIdx]?.backdrop} />
          </div>
        </div>
        {/* <div
          className="media-main media-last removed"
          style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
        >
          <div id="content-img">
            <img id="cur-content-img" src={props.images[props.curIdx - 1]} />
          </div>
        </div> */}
        {/* <div id="media-main-2">
                            <div id="content-img">
                                <img src={images[1]} />
                            </div>
                        </div> */}
        

        <div className="watch-container">{/* <h4>ryan</h4> */}</div>
      </div>
      <div
          id="play-pause"
          style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
        >
          <div id="play-btn" onClick={saveDislike}>
            <img className="discover-btn pause-ico" src={pauseIco} />
          </div>
          {/* <button id="play-btn">
                                <div id="back-symbol"></div>
                                <div id="back-symbol"></div>
                            </button>
                            <button id="play-btn">
                                <div id="up-symbol"></div>
                                <div id="up-symbol"></div>
                            </button> */}
          <div id="play-btn" onClick={saveLike}>
            <img className="discover-btn play-ico" src={playIco} />
          </div>
        </div>
    </div>
  );
}
