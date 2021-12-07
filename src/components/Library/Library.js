import React, { useEffect, useState } from 'react';
import MiniCard from '../Card/MiniCard';
import ReactModal from 'react-modal';
import Card from '../Card/Card';
import './Library.css';
import FastAverageColor from 'fast-average-color';
import Color from 'color';

function MiniCards(props) {
    const media = props.media;
    const miniCards = media.map((medium, idx) => {
        const poster = `https://image.tmdb.org/t/p/w300${medium.poster_path}`;
        const backdrop = `https://image.tmdb.org/t/p/original${medium.backdrop_path}`;
        const title = medium.title;
        const runtime = medium.runtime;
        const overview = medium.overview;
        const rating = medium.vote_average;

        return (

            <li key={medium.id}><MiniCard dataIndex={idx} openModal={props.openModal} poster={poster} backdrop={backdrop} title={title} runtime={runtime} overview={overview} rating={rating} />
            <p class="mini-card-title">{title}</p>
            </li>
            )
    });
    return <ul className="library-list">{miniCards}</ul>
}


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


ReactModal.setAppElement('#root');

export default function Library(props) {
    const [media, setMedia] = useState([]);
    const [images, setImages] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalIdx, setModalIdx] = useState(0);
    const [bgColor, setBgColor] = useState('#ededed');
    const [complementary, setComplementary] = useState('#ededed');

    const fac = new FastAverageColor();


    useEffect(() => {
        fetch('http://localhost:3005/api/likes/user/tmdb', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer: ${props.token}`
        }
      }).then(res => {
        res.json().then(results => {
            const mediaHolder = [...media];
            const imageHolder = [...images];
            results.forEach((result) => {
            mediaHolder.push({
                tmdb_id: result.id,
                image: `https://image.tmdb.org/t/p/original${result.poster_path}`,
                backdrop: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
                title: result.title,
                release_date: result.release_date,
                overview: result.overview,
                rating: result.vote_average,
                genres: getGenres(result.genre_ids),
                poster_path: result.poster_path,
                backdrop_path: result.backdrop_path
                // popularity
            });
            imageHolder.push(
                `https://image.tmdb.org/t/p/original${result.poster_path}`
                );
            });
            setImages(imageHolder);
            setMedia(mediaHolder);
        });
      });
    }, []);

    useEffect(() => {
        if (images[modalIdx]) {
          fac
            .getColorAsync(images[modalIdx])
            .then((color) => {
              setBgColor(color.hex);
              let myColor = Color(color.hex);
              myColor = myColor.lighten(0.5);
              myColor = myColor.saturate(1);
              myColor = myColor.negate();
              setComplementary(myColor.hex());
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

    const getGenres = (genre_ids) => {
        return genre_ids.map(genre_id => genreMap[genre_id]);
    }

    const openModal = (e) => {
        const idx = e.target.getAttribute('dataIndex');
        setModalIdx(idx);
        setModalOpen(true);
    }

    const clearModal = () => {
        setModalOpen(false);
    }


    return (
        <div className="library" id="library-header">
            <h2>Library</h2>
            <div className="library-grid">
                <MiniCards media={media} openModal={openModal} />
            </div>
            <ReactModal isOpen={modalOpen}
                className="card-modal"
                overlayClassName="card-modal-overlay"
                onRequestClose={clearModal}
                closeTimeoutMS={200}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                style={{ overlay: { background: `radial-gradient(circle, ${bgColor} 33%, rgba(0,0,0,0.5) 100%)` } }}
                >
                <Card idx={modalIdx} complementary={complementary} images={images} isFront={true} bgColor={bgColor} media={media} />
            </ReactModal>
        </div>
    );
}