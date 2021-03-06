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

				<div className='mini-card-title-flex'>
					<p className='mini-card-title'>{title}</p>
				</div>
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
		if (props.token) {
			getLikesAuth();
		} else {
			getLikesUnauth();
		}
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
					console.error(err);
				});
		}
	});

	const getLikesAuth = () => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/likes/user/tmdb`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer: ${props.token}`
			}
		}).then((res) => {
			res.json()
				.then(results => populateLibrary(results))
				.catch(err => console.error(err));
		}).catch(err => console.error(err));
	};

	const getLikesUnauth = () => {
		if (sessionStorage.getItem('likes')) {
			const mediaHolder = [...media];
			const imageHolder = [...images];
			const results = JSON.parse(sessionStorage.getItem('likes'));
			results.forEach((result) => {
				mediaHolder.push(result);
				imageHolder.push(result.image);
			});
			console.log(mediaHolder);
			setMedia(mediaHolder);
			setImages(imageHolder);
		} else {
			populateLibrary([]);
		}
	};

	const populateLibrary = (results) => {
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
	};

	const getGenres = (genre_ids) => {
		if (!genre_ids) return;
		return genre_ids.map((genre_id) => genreMap[`${genre_id}`]);
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
		<div className='library' id='library-header'>
			{/* <h2>Library</h2> */}
			<div className='library-grid'>
				<MiniCards media={media} openModal={openModal} />
			</div>
			<ReactModal
				isOpen={modalOpen}
				className='card-modal'
				overlayClassName='card-modal-overlay'
				onRequestClose={clearModal}
				closeTimeoutMS={200}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				style={{
					overlay: {
						background: `radial-gradient(circle, ${bgColor} 33%, rgba(0,0,0,0.5) 100%)`
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
