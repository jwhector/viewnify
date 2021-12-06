import React, { useState, useEffect, useRef } from "react";
import playIco from "./play_ico.png";
import pauseIco from "./pause_ico.png";
import Hammer from "hammerjs";
import waitForElementTransition from "wait-for-element-transition";
// import swipefn from './swipefn';
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
  const [isScrolling, setIsScrolling] = useState(false);
  const cardContainerRef = useRef(null);
  const cardInfoRef = useRef(null);

  // console.log(props.media);
    
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
        // console.log(data);
        props.setCurIdx(props.curIdx + 1);
      }
    );
  };

  const saveDislike = () => {
    fetchChoice("dislikes", props.media[props.curIdx], props.token).then(
      (data) => {
        // console.log(data);
        props.setCurIdx(props.curIdx + 1);
      }
    );
  };


  const addSwipe = (tinderContainer, allCards) => {
    const hammers = [];

    allCards.forEach(function (el) {
      var hammertime = new Hammer(el, {
        // touchAction: 'auto',
        recognizers: [
          [Hammer.Tap],
          [Hammer.Pan]
        ]
      });
      hammers.push(hammertime);

      const imgEl = el.querySelector('.content-img');
        const descEl = el.querySelector('.content-description');

      hammertime.on('tap', function (e) {
        const isLeftClick = getCursorPosition(el, e);
        const isTopDesc = imgEl.classList.contains('hidden') && e.target.classList.contains('info-title') ? true : false;
        if (isLeftClick && !isTopDesc) {
            imgEl.classList.remove('hidden');
            descEl.classList.add('hidden');
        } else {
            imgEl.classList.add('hidden');
            descEl.classList.remove('hidden');
        }
      });

      // hammertime.on("panstart", function (event) {

      // });

      hammertime.on("pan", function (event) {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;
        
        // if (event.target.classList.contains('card-info')) return;
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
          let nextCard;
          if (el.classList.contains("media-A")) {
            nextCard = tinderContainer.querySelector(".media-B");
          } else {
            nextCard = tinderContainer.querySelector(".media-A");
          }
          // nextCard.classList.toggle("back");
          // nextCard.classList.toggle("front");
          setIsFront_a(!isFront_a);
          // el.classList.toggle("back");
          // el.classList.toggle("front");
          imgEl.classList.remove('hidden');
            descEl.classList.add('hidden');
            props.setIsFirstInFocus(!props.isFirstInFocus);
          returnCard(el);
        }
      });
    });
    return hammers;
  };

  function getCursorPosition(el, event) {
    const rect = el.getBoundingClientRect()
    const x = event.center.x - rect.left
    const y = event.center.y - rect.top
    if (x < rect.width / 2) {
        return true;
    } else {
        return false;
    }
}

  const returnCard = (el) => {
    waitForElementTransition(el).then(() => {
        // console.log("ENDING TRANSITION");
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
      hammertime.off("panstart pan panend tap");
    });
  };

  const handleClickLeft = (e) => {
      
  }

  const handleClickRight = (e) => {

  }

  const handleClick = (e) => {
    
  }

  return (
    <div className="body-container" ref={cardContainerRef}>
      <div className="card">
        <Card idx={bIdx} complementary={props.complementary} images={props.images} media={props.media} bgColor={props.bgColor} aOrB={'media-B'} isFront={!isFront_a} />
        <Card idx={aIdx} complementary={props.complementary} images={props.images} media={props.media} bgColor={props.bgColor} aOrB={'media-A'} isFront={isFront_a} />
        <div className='btn-container'>
          <div className='pause-btn'>
            <div className='bar-container'>
              <div className='pause-bars'></div>
              <div className='pause-bars'></div>
            </div>
            {/* <div className='btn-background'></div> */}
          </div>
          <div className='play-btn'>
            {/* <div className='bar-container'>
              <div className='pause-bars'></div>
              <div className='pause-bars'></div>
            </div> */}
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
