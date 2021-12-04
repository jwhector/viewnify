import React, { useState, useEffect, useRef, useContext } from "react";
import "./discover.css";

import FastAverageColor from "fast-average-color";
import Color from "color";
// import swipe from "../Swipe/swipefn";
import Swipe from '../Swipe/Swipe';
import { UserContext } from '../../App';

export default function Discover(props) {
  const apiKey = "3516458404b8ed5f73b3b631421314e1";
  // const genres = props.genres;
  // const services = props.services;
  const [images, setImages] = useState([]);
  const [curIdx, setCurIdx] = useState(0);
  const [entries, setEntries] = useState([]);
  const [media, setMedia] = useState([]);
  const [bgColor, setBgColor] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [bgColor_b, setBgColor_b] = useState('');
  const [isFirstInFocus, setIsFirstInFocus] = useState(true);
  const discoverBg_a = useRef(null);
  const discoverBg_b = useRef(null);
  const user = useContext(UserContext);

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
    // console.log(curPage);
    if (images[curIdx]) {
      fac
        .getColorAsync(images[curIdx])
        .then((color) => {
        //   console.log(color);
          setBgColor(color.hex);
          let myColor = Color(color.hex);
          myColor = myColor.lighten(0.5);
          myColor = myColor.saturate(1);
          myColor = myColor.negate();
          props.setComplementary(myColor.hex());
        //   console.log(props.complementary);
        })
        .catch((err) => {
          console.log(err);
        });
        if (images[curIdx + 1]) {
            fac.getColorAsync(images[curIdx + 1])
            .then((color) => {
                setBgColor_b(color.hex);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
  });

  useEffect(() => {
      fillMedia();
  }, []);

  useEffect(() => {
    fillMedia();
  }, [curPage]);

  const fillMedia = () => {
    getEntries().then((results) => {
        const mediaHolder = [...media];
        const imageHolder = [...images];
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
        // console.log(media);
      });
  }

//   useEffect(() => {
//     if (discoverBg_a.current && discoverBg_b.current) {
//         discoverBg_a.current.classList.toggle('hidden');
//         discoverBg_b.current.classList.toggle('hidden');
//     }
//   }, [bgColor])

  const getEntries = async () => {
    const entries = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${curPage}&with_watch_monetization_types=flatrate`
    ).then((data) => data.json());
    // console.log(entries);
    const results = entries.results.filter(
      (elem) => !seenMedia.includes(elem.id)
    );
    return results;
  };

  return (
    <div id="discover">
      <div
        className="int-container"
        // style={{
        //   background: `radial-gradient(circle, ${bgColor} 33%, #000000 100%)`,
        // }}
      >
        <div className={`discover-bg ${isFirstInFocus ? '' : ''}`} ref={discoverBg_a} style={{
          background: `radial-gradient(circle, ${bgColor} 33%, #000000 100%)`,
        //   transition: `${isFirstInFocus ? '.3s' : 'none'}`,
        //   z-index: `${isFirstInFocus ? :}`,
            // opacity: `${isFirstInFocus ? 1 : 0}`
        }}/>
        {/* <div className={`discover-bg ${isFirstInFocus ? 'hidden' : 'hidden'}`} ref={discoverBg_b} style={{
          background: `radial-gradient(circle, ${isFirstInFocus ? bgColor_b : bgColor} 33%, #000000 100%)`,
        //   z-index: `${isFirstInFocus ? :}`
        //   transition: `${isFirstInFocus ? 'none' : '.3'}`,
        //   opacity: `${isFirstInFocus ? 0 : 1}`
        }}/> */}
        <Swipe media={media} images={images} curIdx={curIdx} setCurIdx={setCurIdx} bgColor={bgColor} complementary={props.complementary} token={props.token} curPage={curPage} setCurPage={setCurPage} discoverBg_a={discoverBg_a} discoverBg_b={discoverBg_b} isFirstInFocus={isFirstInFocus} setIsFirstInFocus={setIsFirstInFocus} />
      </div>
    </div>
  );
}
