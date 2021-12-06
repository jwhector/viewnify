import React, { useEffect, useState } from 'react';
import MiniCard from '../Card/MiniCard';
import ReactModal from 'react-modal';
import Card from '../Card/Card';
import './Library.css';

function MiniCards(props) {
    const media = props.media;
    const miniCards = media.map((medium, idx) => {
        const poster = `https://image.tmdb.org/t/p/w200${medium.poster_path}`;
        const backdrop = `https://image.tmdb.org/t/p/original${medium.backdrop_path}`;
        const title = medium.title;
        const runtime = medium.runtime;
        const overview = medium.overview;
        const rating = medium.vote_average;
        return <li key={medium.id}><MiniCard dataIndex={idx} openModal={props.openModal} poster={poster} backdrop={backdrop} title={title} runtime={runtime} overview={overview} rating={rating} /></li>
    });
    return <ul className="library-list">{miniCards}</ul>
}

/* PROPS
    
*/
ReactModal.setAppElement('#root');

export default function Library(props) {
    const [media, setMedia] = useState([]);
    const [images, setImages] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalIdx, setModalIdx] = useState(0);

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
                title: result.original_title,
                release_date: result.release_date,
                overview: result.overview,
                rating: result.rating,
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
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                // style={{ overlay: { zIndex: 3 } }}>
                >
                <Card idx={modalIdx} complementary='#ededed' images={images} isFront={true} bgColor={'#ededed'} media={media} />
            </ReactModal>
        </div>
    );
}