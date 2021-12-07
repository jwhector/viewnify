import React, { useState } from 'react'
import './Preferences.css';
import logo from '../Landing/viewnify-logo.png';

const genreMap = {
  "Action": 28,
  "Adventure": 12,
  "Animation": 16,
  "Comedy": 35,
  "Crime": 80,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "History": 36,
  "Horror": 27,
  "Music": 10402,
  "Mystery": 9648,
  "Romance": 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  "Thriller": 53,
  "War": 10752,
  "Western": 37,
  }

export default function Preferences(props) {
  const [genres, setGenres] = useState(new Set());
  const [streaming_service, setStreamer] = useState(new Set());

  const fillGenres = (e) => {
    // e.preventDefault()
    // console.log(e.target.textContent);
    const genre_id = genreMap[e.target.textContent];
    if (genres.has(genre_id)) {
      // console.log('ALREADY HAS')
      e.target.style.backgroundColor = 'white';
      e.target.style.color = 'rgba(226, 43, 255, 1)';
      const genresHolder = new Set([...genres]);
      genresHolder.delete(genre_id);
      setGenres(genresHolder);
    } else {
      e.target.style.backgroundColor = 'rgba(226, 43, 255, 1)';
      e.target.style.color = 'white';
      const genresHolder = new Set([...genres]);
      genresHolder.add(genre_id);
      setGenres(genresHolder)
    }
  }

  const fillStreamer = (e) => {
    if (streaming_service.has(e.target.textContent)) {
      e.target.style.backgroundColor = 'white';
      const streamerHolder = new Set([...streaming_service]).delete(e.target.textContent);
      setGenres(streamerHolder);
      return;
    }
    // preventDefault()
    // const streamerHolder = [...streaming_service]
    // streamerHolder.push(e.target.textContent)
    // setStreamer(streamerHolder)
  }

  const savePreferences = async () => {
    const genresString = [...genres].toString()
    const streamerString = streaming_service.toString()
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
      body: JSON.stringify({ genres: genresString, streaming_service: streamerString }) // body data type must match "Content-Type" header
    }
    );
    props.closeModal();
    if (window.location.href.endsWith('discover')) window.location.reload();
    return entries.json();
  };


  return (
    <div className="preferences-container">
      
      <h3>Genres</h3>
      
      <div className="genres">
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Action</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Adventure</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Animation</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Comedy</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Crime</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Drama</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Family</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Fantasy</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">History</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Horror</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Music</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Mystery</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Romance</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Science Fiction</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">TV Movie</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Thriller</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">War</button>
        <button activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt preferences-btn">Western</button>
      </div>

      <h3>Platforms</h3>

      <div className="streaming_services">
        <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt preferences-btn">Netflix</button>
        <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt preferences-btn">Amazon Prime VclassNameeo</button>
        <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt preferences-btn">Disney Plus</button>
        <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt preferences-btn">HBO Go</button>
        <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt preferences-btn">Hulu</button>
        <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt preferences-btn">Apple TV Plus</button>
        <button activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt preferences-btn">Paramount Plus</button>
      </div>

      <div className='save'>
      <button id='save-btn' activeClassName="main-links" onClick={savePreferences} className="styled-btn title-txt">Save</button>
      </div>
      <img id="bg-img" alt="Viewnify 'V' logo." src={logo} />
    </div>
  )
}