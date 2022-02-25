import React, { useEffect, useRef, useState } from 'react';
import FastAverageColor from 'fast-average-color';
import Color from 'color';
import Card from '../Card/Card';
import MiniCard from '../Card/MiniCard';
import ReactModal from 'react-modal';
import './WatchParty.css';

// List of available Watch Parties.
function WatchPartyList(props) {
	const parties = props.watchparties;
	if (!parties) return '';

	console.log(parties);

	function getMembers(party) {
		return party.members.map((member) => {
			return (
				<li key={member.user_id}>
					{member.user.email.split('@').shift()}
				</li>
			);
		});
	}

	const partyList = parties.map((party, idx) => {
		console.log(party.id);
		return (
			<li
				key={party.id}
				className='watchparty-list-item'
				style={{ color: 'white' }}
				dataidx={idx}>
				<div className='party-name'>
					<p>name:</p> {party.name}
				</div>
				<div className='party-members'>
					<p>members:</p>
					<ul>{getMembers(party)}</ul>
				</div>
				<div className='party-limit'>
					<p>limit:</p>
					{party.limit}
				</div>
				<div
					className='party-url'
					onClick={props.getMedia}
					url={party.url}>
					{' '}
					<p>URL:</p> {party.url}
				</div>
			</li>
		);
	});
	return <ul className='watchparty-list'>{partyList}</ul>;
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
		return (
			<li key={medium.id}>
				<MiniCard
					dataIndex={idx}
					openModal={props.openModal}
					poster={poster}
					backdrop={backdrop}
					title={title}
					runtime={runtime}
					overview={overview}
					rating={rating}
				/>
			</li>
		);
	});
	return <ul className='library-list'>{miniCards}</ul>;
}

const genreMap = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Science Fiction',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western'
};

function WatchParty(props) {
	const [watchparties, setWatchparties] = useState([]);
	const [media, setMedia] = useState([]);
	const [images, setImages] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalIdx, setModalIdx] = useState(0);
	const [bgColor, setBgColor] = useState('#ededed');
	const [complementary, setComplementary] = useState('#ededed');
	const [inputVal, setInputVal] = useState('');
	const [urlInput, setUrlInput] = useState('');
	const inputField = useRef(null);
	const urlField = useRef(null);

	const fac = new FastAverageColor();

	const searchParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		console.log(searchParams.get('join'));
		if (searchParams.has('join')) {
			joinParty(searchParams.get('join'));
		}
		fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/watchparty/party/all`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer: ${props.token}`
				}
			}
		).then((res) => {
			if (!res.ok) return;
			res.json().then((results) => {
				console.log(results);
				setWatchparties(results);
			});
		}).catch(err => console.error(err));
	}, []);

	useEffect(() => {
		if (images[modalIdx]) {
			fac.getColorAsync(images[modalIdx])
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

		fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/watchparty/compare/${url}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer: ${props.token}`
				}
			}
		).then((res) => {
			res.json().then((results) => {
				const mediaSet = new Set([
					...media.map((medium) => medium.tmdb_id)
				]);
				const mediaHolder = [...media];
				const imageHolder = [...images];
				results.forEach((result) => {
					if (mediaSet.has(result.id)) return;
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
	};

	const getGenres = (genre_ids) => {
		if (!genre_ids) return;
		return genre_ids.map((genre_id) => genreMap[`${genre_id}`]);
	};

	const createParty = () => {
		if (!inputVal.length || !inputField.current) return;
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/watchparty/`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer: ${props.token}`
			},
			body: JSON.stringify({ name: inputVal })
		})
			.then((res) => {
				if (res.ok) {
					res.json()
						.then((watchpartyData) => {
							console.log(watchparties);
							console.log(watchpartyData);
							setWatchparties([...watchparties, watchpartyData]);
						})
						.catch((err) => console.log(err));
				}
				setInputVal('');
			})
			.catch((err) => console.log(err));
	};

	const joinParty = (id) => {
		const partyId = id ? id : urlInput;
		if (!partyId.length) return;
		fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/watchparty/join/${partyId}`,
			{
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer: ${props.token}`
				},
				body: JSON.stringify({})
			}
		)
			.then((res) => {
				if (res.ok) {
					res.json()
						.then((watchpartyData) => {
							// console.log(watchparties);
							console.log('JOINED!');
							console.log(watchpartyData);
							// setWatchparties([...watchparties, watchpartyData]);
						})
						.catch((err) => console.log(err));
				}
				setInputVal('');
			})
			.catch((err) => console.log(err));
	};

	const openModal = (e) => {
		const idx = e.target.getAttribute('dataIndex');
		setModalIdx(idx);
		setModalOpen(true);
	};

	const clearModal = () => {
		setModalOpen(false);
	};

	return (
		<div className='watch-party'>
			<div className='watch-party-header'>
				<h2>Watch Parties</h2>
				<input
					ref={inputField}
					className='name-party-input'
					type='text'
					placeholder='name party...'
					value={inputVal}
					onChange={(e) => setInputVal(e.target.value)}></input>
				<button className='create-party-btn' onClick={createParty}>
					create party
				</button>
				<p className='or'>or</p>
				<button className='join-party-btn' onClick={joinParty}>
					join party
				</button>
				<input
					ref={urlField}
					className='join-party-input'
					type='text'
					placeholder='...enter url'
					value={urlInput}
					onChange={(e) => setUrlInput(e.target.value)}
				/>
			</div>
			<div className='watch-party-list'>
				<WatchPartyList
					watchparties={watchparties}
					getMedia={getMedia}
				/>
			</div>
			<div className='library-grid'>
				<MiniCards media={media} openModal={openModal} />
			</div>
			<ReactModal
				isOpen={modalOpen}
				className='card-modal'
				overlayClassName='card-modal-overlay'
				onRequestClose={clearModal}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				style={{
					overlay: {
						background: `radial-gradient(circle, ${bgColor} 33%, #000000 100%)`
					}
				}}>
				<Card
					idx={modalIdx}
					complementary={complementary}
					images={images}
					isFront={true}
					bgColor={bgColor}
					media={media}
				/>
			</ReactModal>
		</div>
	);
}

export default WatchParty;
