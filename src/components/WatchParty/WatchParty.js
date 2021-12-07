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

const genreMap = {
    "28": "Action",
    "12": "Adventure",
    "16": "Animation",
    "35": "Comedy",
    "80": "Crime",
    "18": "Drama",
    "10751": "Family",
    "14": "Fantasy",
    "36": "History",
    "27": "Horror",
    "10402": "Music",
    "9648": "Mystery",
    "10749": "Romance",
    "878": "Science Fiction",
    "10770": "TV Movie",
    "53": "Thriller",
    "10752": "War",
    "37": "Western",
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
                    title: result.title,
                    release_date: result.release_date,
                    overview: result.overview,
                    rating: result.vote_average,
                    genres: getGenres(result.genre_ids),
                    poster_path: result.poster_path,
                    backdrop_path: result.backdrop_path
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

    const getGenres = (genre_ids) => {
        return genre_ids.map(genre_id => genreMap[`${genre_id}`]);
    }

    const createParty = () => {
        fetch('http://localhost:3005/api/watchparty/', {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer: ${props.token}`
            },
            body: JSON.stringify({})
        }).then(res => {
            if (res.ok) {
                res.json().then((watchpartyData => {
                    console.log(watchparties);
                    console.log(watchpartyData);
                    setWatchparties([...watchparties, watchpartyData]);
                })).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
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
            <div className="watch-party-header">
                <h2>Watch Parties</h2>
                <hr />
                <button className="create-party-btn" onClick={createParty}>Create a Watch Party</button>
            </div>
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
