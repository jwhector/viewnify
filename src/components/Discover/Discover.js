import React, { useState, useEffect, useRef } from 'react';
import './Discover.css';

import FastAverageColor from 'fast-average-color';
import Color from 'color';
import Swipe from '../Swipe/Swipe';

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

export default function Discover(props) {
	const [images, setImages] = useState([]);
	const [curIdx, setCurIdx] = useState(0);
	const [media, setMedia] = useState([]);
	const [bgColor, setBgColor] = useState('');
	const [curPage, setCurPage] = useState(1);
	// const [bgColor_b, setBgColor_b] = useState('');
	const [isFirstInFocus, setIsFirstInFocus] = useState(true);
	const discoverBg_a = useRef(null);
	const discoverBg_b = useRef(null);

	const fac = new FastAverageColor();

	useEffect(() => {
		if (images[curIdx]) {
			fac.getColorAsync(images[curIdx])
				.then((color) => {
					setBgColor(color.hex);
					let myColor = Color(color.hex);
					myColor = myColor.lighten(0.5);
					myColor = myColor.saturate(1);
					myColor = myColor.negate();
					props.setComplementary(myColor.hex());
				})
				.catch((err) => {
					console.log(err);
				});
/*eslint-disable*/
			// if (images[curIdx + 1]) {
			// 	fac.getColorAsync(images[curIdx + 1])
			// 		.then((color) => {
			// 			setBgColor_b(color.hex);
			// 		})
			// 		.catch((err) => {
			// 			console.log(err);
			// 		});
			// }
  /*eslint-enable*/
		}
	});

	useEffect(() => {
		fillMedia();
	}, []);

	useEffect(() => {
		fillMedia();
	}, [curPage]);

	const fillMedia = () => {
		getEntries().then((results) => {
			console.log(results);
			if (!results.results.length && curPage < results.pages) {
				setCurPage(curPage + 1);
				return;
			}
			const mediaHolder = [...media];
			const imageHolder = [...images];
			results.results.forEach((result) => {
				mediaHolder.push({
					tmdb_id: result.id,
					image: `https://image.tmdb.org/t/p/original${result.poster_path}`,
					backdrop: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
					title: result.title,
					release_date: result.release_date,
					overview: result.overview,
					rating: result.vote_average,
					genres: getGenres(result.genre_ids).trim(),
					poster_path: result.poster_path,
					backdrop_path: result.backdrop_path
				});
				imageHolder.push(
					`https://image.tmdb.org/t/p/original${result.poster_path}`
				);
			});
			setImages(imageHolder);
			setMedia(mediaHolder);
			if (media.length === 1) {
				setCurPage(curPage + 1);
			}
		});
	};

	const getGenres = (genre_ids) => {
		let str = '';
		genre_ids.forEach(
			(genre_id) => (str = str.concat(`, ${genreMap[genre_id]}`))
		);
		return str;
	};

	const getEntries = async () => {
		let entries;
		if (props.token) {
			try {
				entries = await fetch(
					`${process.env.REACT_APP_SERVER_URL}/tmdbSearch`,
					{
						method: 'POST',
						mode: 'cors',
						cache: 'no-cache',
						credentials: 'same-origin',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer: ${props.token}`
						},
						body: JSON.stringify({ format: 'movie', curPg: { curPage } }) // body data type must match "Content-Type" header
					}
				);
			} catch (err) {
				console.error(err);
			}
		} else {
			const format = 'movie';
			const genres = sessionStorage.getItem('genres') ? sessionStorage.getItem('genres') : '';
			const streaming_service = sessionStorage.getItem('streaming_service') ? sessionStorage.getItem('streaming_service') : '';
			const cached_watched = [];
			const cached_likes = sessionStorage.getItem('likes') ? JSON.parse(sessionStorage.getItem('likes')).map(media => media.tmdb_id) : [];
			const cached_dislikes = sessionStorage.getItem('dislikes') ? JSON.parse(sessionStorage.getItem('dislikes')).map(media => media.tmdb_id) : [];

			// console.log(cached_likes);
			// console.log(cached_dislikes);

			try {
				entries = await fetch(
					`${process.env.REACT_APP_SERVER_URL}/unauthTmdbSearch`,
					{
						method: 'POST',
						mode: 'cors',
						cache: 'no-cache',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ format: format, curPg: { curPage }, genres: genres, streaming_service: streaming_service, cached_watched: cached_watched, cached_likes: cached_likes, cached_dislikes: cached_dislikes })
					}
				);
			} catch (err) {
				console.error(err);
			}
		}
		return entries.json();
	};

	return (
		<div id='discover'>
			<div className='int-container'>
				<div
					className={`discover-bg ${isFirstInFocus ? '' : ''}`}
					ref={discoverBg_a}
					style={{
						background: `radial-gradient(circle, ${bgColor} 33%, #000000 100%)`
					}}
				/>
				<Swipe
					media={media}
					images={images}
					curIdx={curIdx}
					setCurIdx={setCurIdx}
					bgColor={bgColor}
					complementary={props.complementary}
					token={props.token}
					curPage={curPage}
					setCurPage={setCurPage}
					discoverBg_a={discoverBg_a}
					discoverBg_b={discoverBg_b}
					isFirstInFocus={isFirstInFocus}
					setIsFirstInFocus={setIsFirstInFocus}
				/>
			</div>
		</div>
	);
}
