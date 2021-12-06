import React, { useState } from 'react'


const [genres, setGenres] = useState([]);
const [streaming_service, setStreamer] = useState([]);

return (
    <div>
    <div className="genres">
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Action</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Adventure</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Animation</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Comedy</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Crime</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Drama</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Family</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Fantasy</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">History</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Horror</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Music</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Mystery</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Romance</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Science Fiction</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">TV Movie</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Thriller</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">War</button>
<button activeClassName="main-links" onClick={setGenres} className="styled-btn title-txt">Western</button>
</div>

<div className="streamin_services">
<button activeClassName="main-links" onClick={setStreamer} className="styled-btn title-txt">Netflix</button>
<button activeClassName="main-links" onClick={setStreamer} className="styled-btn title-txt">Amazon Prime Video</button>
<button activeClassName="main-links" onClick={setStreamer} className="styled-btn title-txt">Disney Plus</button>
<button activeClassName="main-links" onClick={setStreamer} className="styled-btn title-txt">HBO Go</button>
<button activeClassName="main-links" onClick={setStreamer} className="styled-btn title-txt">Hulu</button>
<button activeClassName="main-links" onClick={setStreamer} className="styled-btn title-txt">Apple TV Plus</button>
<button activeClassName="main-links" onClick={setStreamer} className="styled-btn title-txt">Paramount Plus</button>
</div>
</div>
)