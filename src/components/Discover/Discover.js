import React, { useState, useEffect } from 'react';
import './discover.css';

export default function Discover(props) {
    const apiKey = '3516458404b8ed5f73b3b631421314e1';
    // const genres = props.genres;
    // const services = props.services;
    const [images, setImages] = useState([]);
    const [curIdx, setCurIdx] = useState(0);

    useEffect(() => {
        getEntries().then(entries => {
            const imageHolder = [];
            entries.results.forEach(result => {
                imageHolder.push(`https://image.tmdb.org/t/p/w500${result.poster_path}`);
            });
            setImages(imageHolder);
            console.log(images);
        });
        // setImages(`https://image.tmdb.org/t/p/w500${entries.results[12].poster_path}`);
    }, []);

    const getEntries = async () => {
        const entries = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
            .then(data => data.json());
        console.log(entries);
        return entries;
    }

    const changeIdx = () => {
        setCurIdx(curIdx + 1);
    }

    return (
        <div id="discover">
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
                    <div id="play-pause">
                        <button id="play-btn">
                            <div id="play-symbol"></div>
                            <div id="play-symbol"></div>
                        </button>
                        {/* <button id="play-btn">
                            <div id="back-symbol"></div>
                            <div id="back-symbol"></div>
                        </button>
                        <button id="play-btn">
                            <div id="up-symbol"></div>
                            <div id="up-symbol"></div>
                        </button> */}
                        <button id="play-btn" onClick={changeIdx}>
                            {/* <div id="next-symbol"></div>
                            <div id="next-symbol"></div> */}
                        </button>
                    </div>

                    <div className="watch-container">
                        {/* <h4>ryan</h4> */}
                    </div>
                </div>
            </div>
        </div>
    );
}