import React, { useEffect, useState } from 'react';
import MiniCard from '../Card/MiniCard';

function MiniCards(props) {
    const media = props.media;
    const miniCards = media.map((medium) => {
        const poster = `https://image.tmdb.org/t/p/original${medium.poster_path}`;
        const backdrop = `https://image.tmdb.org/t/p/original${medium.backdrop_path}`;
        const title = medium.title;
        const runtime = medium.runtime;
        const overview = medium.overview;
        const rating = medium.vote_average;
        // const poster = 
        return <li key={medium.id}><MiniCard poster={poster} backdrop={backdrop} title={title} runtime={runtime} overview={overview} rating={rating} /></li>
    });
    return <ul className="library-list">{miniCards}</ul>
}

/* PROPS
    
*/
export default function Library(props) {
    const [media, setMedia] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/api/likes/user/tmdb', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer: ${props.token}`
        }
      }).then(res => {
        res.json().then(data => {
            console.log(data)
            setMedia(data);
        });
      });
    }, []);

    // const MiniCards = (props) => {
    //     const 
    // }

    return (
        <div className="library" id="library-header">
            <h2>Library</h2>
            <hr/>
            <div className="library-grid">
                <MiniCards media={media} />
                <div className="content-gradient"></div>
            </div>
        </div>
    );
}