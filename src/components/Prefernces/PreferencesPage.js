import React, { useState } from 'react'


const [genres, setGenres] = useState([]);
const [streaming_service, setStreamer] = useState([]);

const fillGenres = (e) => {
    const genresHolder = [...genres]
    genresHolder.push(e.target.value)
    setGenres(genresHolder)
}

const fillStreamer = (e) => {
    const streamerHolder = [...streaming_service]
    streamerHolder.push(e.target.value)
    setStreamer(streamerHolder)
}

const savePreferences = async () => {
    const entries = await fetch(
      'http://localhost:3005/api/users', {
        method: 'PUT', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${props.token}`
        },
        body: JSON.stringify({ genres: genres, streaming_service: streaming_service}) // body data type must match "Content-Type" header
      }
    );
    return entries.json();
  };


return (
    <div>
        <div className="genres">
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Action</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Adventure</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Animation</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Comedy</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Crime</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Drama</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Family</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Fantasy</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">History</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Horror</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Music</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Mystery</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Romance</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Science Fiction</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">TV Movie</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Thriller</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">War</button>
            <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Western</button>
        </div>

        <div className="streaming_services">
            <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Netflix</button>
            <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Amazon Prime Video</button>
            <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Disney Plus</button>
            <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">HBO Go</button>
            <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Hulu</button>
            <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Apple TV Plus</button>
            <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Paramount Plus</button>
        </div>
    </div>
)