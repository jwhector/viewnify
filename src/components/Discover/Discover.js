import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import './discover.css';
import playIco from './play_ico.png';
import pauseIco from './pause_ico.png';

async function fetchChoice(type, mediaData, token) {
    fetch(`http://localhost:3005/api/${type}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer: ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mediaData)
      }).then(res => {
          console.log(res);
        return res.json();
      }).catch(err => console.log(err));
}

export default function Discover(props) {
    const apiKey = '3516458404b8ed5f73b3b631421314e1';
    // const genres = props.genres;
    // const services = props.services;
    const [images, setImages] = useState([]);
    const [curIdx, setCurIdx] = useState(0);
    const [entries, setEntries] = useState([]);
    const [media, setMedia] = useState([]);
    
    const seenMedia = [];

    useEffect(() => {
        // if (props.user) {
            props.user.likes.forEach(like => {
                seenMedia.push(parseInt(like.tmdb_id));
            });
            props.user.dislikes.forEach(dislike => {
                seenMedia.push(parseInt(dislike.tmdb_id));
            });
        // }
    });

    useEffect(() => {
        getEntries().then(results => {
            const mediaHolder = [];
            const imageHolder = [];
            results.forEach(result => {
                mediaHolder.push({
                    tmdb_id: result.id,
                    image: `https://image.tmdb.org/t/p/original${result.poster_path}`,
                    backdrop: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
                    title: result.original_title,
                    release_date: result.release_date,
                    overview: result.overview,
                    rating: result.rating
                    // popularity
                });
                imageHolder.push(`https://image.tmdb.org/t/p/original${result.poster_path}`);
            });
            setImages(imageHolder);
            setMedia(mediaHolder);
            // console.log(images);
        });
        // setImages(`https://image.tmdb.org/t/p/w500${entries.results[12].poster_path}`);
    }, []);

    const getEntries = async () => {
        const entries = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`)
            .then(data => data.json());
        console.log(entries);
        const results = entries.results.filter(elem => !seenMedia.includes(elem.id));
        // console.log(seenMedia);
        // console.log(results);
        return results;
    }

    const changeIdx = () => {
        setCurIdx(curIdx + 1);
    }

    const getCurInfo = () => {

    }

    const saveLike = () => {
        fetchChoice('likes', media[curIdx], props.token).then(data => {
            console.log(data);
            setCurIdx(curIdx + 1);
        });
    }

    const saveDislike = () => {
        fetchChoice('dislikes', media[curIdx], props.token).then(data => {
            console.log(data);
            setCurIdx(curIdx + 1);
        });
    }

    return (
        <div id="discover">
            <div className='int-container'>
                <div className="body-container">
                    <div className="card">
                        <div id="media-main">
                            <div id="content-img">
                                {/* {`<img goes here, has a width of 100% and height of 80% of card>`} */}
                                <img src={images[curIdx]} />
                            </div>
                            {/* <div id="content-description">
                                {`content about media goes here, has a width of 75% and height of 20%`}
                            </div> */}
                        </div>
                        {/* <div id="media-main-2">
                            <div id="content-img">
                                <img src={images[1]} />
                            </div>
                        </div> */}
                        <div id="play-pause" onClick={saveDislike}>
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

                        <div className="watch-container">
                            {/* <h4>ryan</h4> */}
                        </div>
                    </div>
                </div>

            </div>
            <div id='media-info'>
                <div className="bg-img" style={{
                    backgroundImage: `url(${media[curIdx]?.backdrop})`
                }}/>
                <div className='media-containter'>
                </div>
            </div>
        </div>
    );
}