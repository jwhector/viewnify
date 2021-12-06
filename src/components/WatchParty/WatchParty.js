import React, { useEffect, useState } from 'react'
import Invite from '../Invite/Invite';
import FastAverageColor from 'fast-average-color';
import Color from 'color';
import Card from '../Card/Card';
import MiniCard from '../Card/MiniCard';
import ReactModal from 'react-modal';

function WatchPartyList(props) {
    const parties = props.watchparties;

    if (!parties) return '';

    function getMembers(party) {
        return party.members.map((member) => {
            return <li key={member.user.id}>{member.user.email.split('@').shift()}</li>
        })
    }

    const partyList = parties.map((party, idx) => {        
        return (
            <li key={party.id} className="watchparty-list-item" style={{ color: 'white' }}  dataIdx={idx} >
                <p>This party has limit: {party.limit}</p>
                <p onClick={props.getMedia} url={party.url}>This party's URL is: {party.url}</p>
                <p>The members of this party are:</p>
                <ul>{getMembers(party)}</ul>
            </li>
        )
    });
    return <ul className="watchparty-list">{partyList}</ul>
}

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

function WatchParty(props) {
    const [watchparties, setWatchparties] = useState([]);
    const [media, setMedia] = useState([]);
    const [images, setImages] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalIdx, setModalIdx] = useState(0);
    const [bgColor, setBgColor] = useState('#ededed');
    const [complementary, setComplementary] = useState('#ededed');

    const fac = new FastAverageColor();

    useEffect(() => {
        fetch('http://localhost:3005/api/watchparty/party/all', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer: ${props.token}`
        }
      }).then(res => {
          if (!res.ok) return;
        res.json().then(results => {
            console.log(results);
            setWatchparties(results);
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

    const getMedia = (e) => {
        const url = e.target.getAttribute('url');
        console.log(url);
        
        fetch(`http://localhost:3005/api/watchparty/compare/${url}`, {
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
        <div className="watch-party">
            <h2>Watch Parties</h2>
            <hr />
            <div className="watch-party-list">
                <WatchPartyList watchparties={watchparties} getMedia={getMedia} />
            </div>
            <div className="library-grid">
                <MiniCards media={media} openModal={openModal} />
            </div>
            <ReactModal isOpen={modalOpen}
                className="card-modal"
                overlayClassName="card-modal-overlay"
                onRequestClose={clearModal}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                style={{ overlay: { background: `radial-gradient(circle, ${bgColor} 33%, #000000 100%)` } }}
                >
                <Card idx={modalIdx} complementary={complementary} images={images} isFront={true} bgColor={bgColor} media={media} />
            </ReactModal>
        </div>
    )
}

export default WatchParty;
