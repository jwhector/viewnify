import React, { useState, useEffect, useRef } from "react";
import playIco from "./play_ico.png";
import pauseIco from "./pause_ico.png";
import Hammer from "hammerjs";
import waitForElementTransition from "wait-for-element-transition";
import Card from '../Card/Card';
import { AutoInit } from "materialize-css";

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
  const [isFront_a, setIsFront_a] = useState(true);
  const [draggable, setDraggable] = useState(true);
  const cardContainerRef = useRef(null);
  // const cardInfoRef = useRef(null);

    
  useEffect(() => {
    if (cardContainerRef.current) {
      const allCards = cardContainerRef.current.querySelectorAll(".media-main");
      const hammers = addSwipe(cardContainerRef.current, allCards);
      return function cleanSwipe() {
        removeSwipe(hammers);
      };
    }
  });

  useEffect(() => {
    console.log(props.media.length);
    if (props.curIdx > props.media.length - 2 && props.media.length > 0) {
        props.setCurPage(props.curPage + 1);
    }
  }, [props.curIdx]);

  const saveLike = () => {
    fetchChoice("likes", props.media[props.curIdx], props.token).then(
      (data) => {
        props.setCurIdx(props.curIdx + 1);
      }
    );
  };

  const saveDislike = () => {
    fetchChoice("dislikes", props.media[props.curIdx], props.token).then(
      (data) => {
        props.setCurIdx(props.curIdx + 1);
      }
    );
  };


  const addSwipe = (tinderContainer, allCards) => {
    const hammers = [];

    allCards.forEach(function (el) {
      var hammertime = new Hammer(el, {
        recognizers: [
          [Hammer.Tap],
          [Hammer.Pan]
        ]
      });
      hammers.push(hammertime);

      const imgEl = el.querySelector('.content-img');
      const descEl = el.querySelector('.content-description');
      const overviewEl = el.querySelector(".content-overview-p3");

      hammertime.on("pan", function (event) {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;
        if (!draggable) return;

        el.classList.add("moving");

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

          setDraggable(false);
          el.style.transform ="translate(" +toX +"px, " +(toY + event.deltaY) +"px) rotate(" +rotate +"deg)";
          setIsFront_a(!isFront_a);
          imgEl.classList.remove('hidden');
          descEl.classList.add('hidden');
          overviewEl.classList.add('hidden');
      
          props.setIsFirstInFocus(!props.isFirstInFocus);
          returnCard(el);
        }
      });
    });
    return hammers;
  };

  const returnCard = (el) => {
    waitForElementTransition(el).then(() => {
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
        setDraggable(true);
    });
  }

  const removeSwipe = (hammers) => {
    hammers.forEach((hammertime) => {
      hammertime.off("panstart pan panend");
    });
  };

  return (
    <div className="body-container" ref={cardContainerRef}>
      <div className="card">
        <Card idx={bIdx} complementary={props.complementary} images={props.images} media={props.media} bgColor={props.bgColor} aOrB={'media-B'} isFront={!isFront_a} isDiscover={true} />
        <Card idx={aIdx} complementary={props.complementary} images={props.images} media={props.media} bgColor={props.bgColor} aOrB={'media-A'} isFront={isFront_a} isDiscover={true} />
        <div className='btn-container'>
          <div className='pause-btn'>
            <div className='bar-container'>
              <div className='pause-bars'></div>
              <div className='pause-bars'></div>
            </div>
          </div>
          <div className='play-btn'>
            <img className='play-img' src={playIco} />
            <div className='btn-background'></div>
          </div>
        </div>
    
        <div className="watch-container">{/* <h4>ryan</h4> */}</div>
      </div>
      <div
          id="play-pause"
          style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
        >
          <div id="play-btn" onClick={saveDislike}>
            <img className="discover-btn pause-ico" src={pauseIco} />
          </div>
          <div id="play-btn" onClick={saveLike}>
            <img className="discover-btn play-ico" src={playIco} />
          </div>
        </div>
    </div>
  );
}
