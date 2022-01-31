import React, { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
// import Logo from '../Landing/viewnify-logo.png';

export default function Card(props) {
	const elem = useRef(null);

	useEffect(() => {
		let hammertimeTap;
		if (elem.current !== null) {
			hammertimeTap = handleTap();
		}
		return function clearHammer() {
			if (hammertimeTap) hammertimeTap.off('tap');
		};
	});

	function handleTap() {
		const el = elem.current;
		// console.log(el);
		var hammertimeTap = new Hammer(el);

		const imgEl = el.querySelector('.content-img');
		const descEl = el.querySelector('.content-description');
		const gradient = el.querySelector('.content-gradient-overlay');
		const overviewEl = el.querySelector('.content-overview-p3');
		// const headImgEl = el.querySelector(".content-title")

		hammertimeTap.on('tap', function (e) {
			const isLeftClick = getCursorPosition(el, e);
			const isPageOne = !imgEl.classList.contains('hidden');
			const isPageTwo = !descEl.classList.contains('hidden');
			const isPageThree = !overviewEl.classList.contains('hidden');
			//   const isPageTwoImg = descEl.classList.contains("hidden");
			if (e.target.classList.contains('content-title')) {
				return;
			}

			if (isPageTwo) {
				if (!isLeftClick) {
					overviewEl.classList.remove('hidden');
					descEl.classList.add('hidden');
				} else {
					imgEl.classList.remove('hidden');
					descEl.classList.add('hidden');
					gradient.classList.remove('hidden');
				}
			} else if (isPageOne && !isLeftClick) {
				imgEl.classList.add('hidden');
				descEl.classList.remove('hidden');
				gradient.classList.add('hidden');
			} else if (isPageThree && isLeftClick) {
				descEl.classList.remove('hidden');
				overviewEl.classList.add('hidden');
			}
		});

		return hammertimeTap;
	}

	function getCursorPosition(el, event) {
		const rect = el.getBoundingClientRect();
		const x = event.center.x - rect.left;
		if (x < rect.width / 2) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div
			className={`media-main ${props.aOrB ? props.aOrB : ''} ${
				props.isFront ? 'front' : 'back'
			}`}
			style={{ boxShadow: `4px 4px 8px ${props.complementary}` }}
			ref={elem}>
			<div className='card-content'>
				<div className='content-img' style={{backgroundImage: `url(${props.images[props.idx]})`}}>
					<div className='content-gradient-overlay' />
					{/* <img
						className='cur-content-img'
						src={props.images[props.idx]}
					/> */}
				</div>
				<div className='content-description hidden'>
					<div className='background-container'>
						<img
							className='content-background'
							src={props.media[props.idx]?.backdrop}
						/>
						<div className='content-title'>
							<h2 className='info-title'>
								{props.media[props.idx]?.title}
							</h2>
						</div>
					</div>
					<div
						className='media-a-info'
						style={{
							background: `linear-gradient(180deg, ${props.bgColor} 0%, transparent 3%)`
						}}>
						<div className='release-rating card-info'>
							{/* <img src={Logo} className="viewnify-rating" /> */}
							<p className='genre-card-info'>
								{props.media[props.idx]?.genres}
							</p>
							<p className='star-card-info'>⭐️</p>
							<p className='rating-card-info'>
								{props.media[props.idx]?.rating}
							</p>
							<p className='release-date-card-info'>
								{props.media[props.idx]?.release_date}
							</p>
						</div>
						{/* <p className="card-info">{props.media[props.idx]?.overview}</p> */}
					</div>
				</div>
				<div
					className='content-description content-overview-p3 hidden'
					style={{
						background: `linear-gradient(180deg, ${props.bgColor} 0%, transparent 3%)`
					}}>
					<p className='card-info'>
						{props.media[props.idx]?.overview}
					</p>
				</div>
			</div>
			{props.isDiscover ? <div className='bottom-border' /> : <></>}
		</div>
	);
}
