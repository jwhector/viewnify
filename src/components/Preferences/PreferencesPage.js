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
  const [genres, setGenres] = useState([]);
  const [streaming_service, setStreamer] = useState([]);

  const fillGenres = (e) => {
    // e.preventDefault()
    const genresHolder = [...genres]
    genresHolder.push(genreMap[e.target.textContent])
    console.log(genresHolder);
    setGenres(genresHolder)
  }

  const fillStreamer = (e) => {
    // preventDefault()
    const streamerHolder = [...streaming_service]
    streamerHolder.push(e.target.textContent)
    setStreamer(streamerHolder)
  }

  const savePreferences = async () => {
    const genresString = genres.toString()
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
    return entries.json();
  };


  return (
    <div className="preferences-container">
      
      <h3>Genres</h3>
      
      <div className="genres">
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Action</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Adventure</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Animation</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Comedy</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Crime</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Drama</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Family</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Fantasy</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">History</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Horror</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Music</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Mystery</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Romance</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Science Fiction</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">TV Movie</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Thriller</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">War</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillGenres} className="styled-btn title-txt">Western</button>
      </div>

      <h3>Platforms</h3>

      <div className="streaming_services">
        <button id='preferences-btn' activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Netflix</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Amazon Prime Video</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Disney Plus</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">HBO Go</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Hulu</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Apple TV Plus</button>
        <button id='preferences-btn' activeClassName="main-links" onClick={fillStreamer} className="styled-btn title-txt">Paramount Plus</button>
      </div>

      <div className='save'>
      <button id='save-btn' activeClassName="main-links" onClick={savePreferences} className="styled-btn title-txt">Save</button>
      </div>
      <img id="bg-img" alt="Viewnify 'V' logo." src={logo} />
    </div>
  )
}