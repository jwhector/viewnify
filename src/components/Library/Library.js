import React, { useEffect, useState } from 'react';
import MiniCard from '../Card/MiniCard';
import ReactModal from 'react-modal';
import Card from '../Card/Card';
import './Library.css';

function MiniCards(props) {
    const media = props.media;
    const miniCards = media.map((medium) => {
        const poster = `https://image.tmdb.org/t/p/w200${medium.poster_path}`;
        const backdrop = `https://image.tmdb.org/t/p/original${medium.backdrop_path}`;
        const title = medium.title;
        const runtime = medium.runtime;
        const overview = medium.overview;
        const rating = medium.vote_average;
        return <li key={medium.id}><MiniCard openModal={props.openModal} poster={poster} backdrop={backdrop} title={title} runtime={runtime} overview={overview} rating={rating} /></li>
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

    useEffect(() => {
        fetch('http://localhost:3005/api/likes/user/tmdb', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer: ${props.token}`
        }
      }).then(res => {
        res.json().then(data => {
            console.log(data)
            const imageHolder = [];
            data.forEach((medium) => {
                imageHolder.push(`https://image.tmdb.org/t/p/original${medium.poster_path}`)
            });
            setImages(imageHolder);
            setMedia(data);
        });
      });
    }, []);

    const openModal = () => {
        console.log('OPENING MODAL')
        setModalOpen(true);
    }

    const clearModal = () => {
        setModalOpen(false);
    }


    return (
        <div className="library">
            <h2>Library</h2>
            <hr/>
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
                    {/* <p>HEY THIS IS A  LOT OF TEXT!!!!~!</p> */}
                <Card idx={0} complementary='#ededed' images={images} isFront={true} bgColor={'#ededed'} media={media} />
                {/* <button onClick={clearModal}>Close Modal</button> */}
            </ReactModal>
        </div>
    );
}