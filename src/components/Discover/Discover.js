import userEvent from "@testing-library/user-event";
import React, { useState, useEffect, useRef } from "react";
import "./discover.css";

import FastAverageColor from "fast-average-color";
import complementaryColors from "complementary-colors";
import Color from "color";
import swipe from "./swipe";
import Swipe from '../Swipe';

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

export default function Discover(props) {
  const apiKey = "3516458404b8ed5f73b3b631421314e1";
  // const genres = props.genres;
  // const services = props.services;
  const [images, setImages] = useState([]);
  const [curIdx, setCurIdx] = useState(0);
  const [entries, setEntries] = useState([]);
  const [media, setMedia] = useState([]);
  const [bgColor, setBgColor] = useState("");

  const cardContainerRef = useRef(null);

  const seenMedia = [];
  const fac = new FastAverageColor();

  useEffect(() => {
    // if (props.user) {
    // props.user.likes.forEach(like => {
    //     seenMedia.push(parseInt(like.tmdb_id));
    // });
    // props.user.dislikes.forEach(dislike => {
    //     seenMedia.push(parseInt(dislike.tmdb_id));
    // });
    if (images[curIdx]) {
      fac
        .getColorAsync(images[curIdx])
        .then((color) => {
          console.log(color);
          setBgColor(color.hex);
          let myColor = Color(color.hex);
          myColor = myColor.lighten(0.5);
          myColor = myColor.saturate(1);
          myColor = myColor.negate();
          props.setComplementary(myColor.hex());
          console.log(props.complementary);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // }
  });

  useEffect(() => {
    getEntries().then((results) => {
      const mediaHolder = [];
      const imageHolder = [];
      results.forEach((result) => {
        mediaHolder.push({
          tmdb_id: result.id,
          image: `https://image.tmdb.org/t/p/original${result.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
          title: result.original_title,
          release_date: result.release_date,
          overview: result.overview,
          rating: result.rating,
          // popularity
        });
        imageHolder.push(
          `https://image.tmdb.org/t/p/original${result.poster_path}`
        );
      });
      setImages(imageHolder);
      setMedia(mediaHolder);
      // console.log(images);
    });
    // setImages(`https://image.tmdb.org/t/p/w500${entries.results[12].poster_path}`);
  }, []);

  useEffect(() => {
    if (cardContainerRef.current) {
      const allCards = cardContainerRef.current.querySelectorAll(".media-main");
      swipe(cardContainerRef.current, allCards);
    }
  });

  const getEntries = async () => {
    const entries = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`
    ).then((data) => data.json());
    console.log(entries);
    const results = entries.results.filter(
      (elem) => !seenMedia.includes(elem.id)
    );
    // console.log(seenMedia);
    // console.log(results);
    return results;
  };

  const changeIdx = () => {
    setCurIdx(curIdx + 1);
  };

  const getCurInfo = () => {};

  return (
    <div id="discover">
      <div
        className="int-container"
        style={{
          background: `radial-gradient(circle, ${bgColor} 33%, #000000 100%)`,
        }}
      >
        <Swipe />
        {/* <div className="body-container" ref={cardContainerRef}>
          <div className="card">
            <div
              className="media-main"
              style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
            >
              <div id="content-img">
                <img id="cur-content-img" src={images[curIdx]} />
              </div>
            </div>
            <div
              id="play-pause"
              onClick={saveDislike}
              style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
            >
              <button id="play-btn">
                <img className="discover-btn pause-ico" src={pauseIco} />
              </button>
              <button id="play-btn" onClick={saveLike}>
                <img className="discover-btn play-ico" src={playIco} />
              </button>
            </div>

            <div className="watch-container"></div>
          </div>
        </div> */}
      </div>
      {/* <div id='media-info'>
                <div className="bg-img" style={{
                    backgroundImage: `url(${media[curIdx]?.backdrop})`
                }}/>
                <div className='media-containter'>
                </div>
            </div> */}
    </div>
  );
}
