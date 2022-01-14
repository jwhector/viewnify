import React, { useEffect, useState } from 'react';
import LoginModal from './Landing/LoginModal';
import Color from 'color';

export default function NavBar(props) {
	const [modalOpen, setModalOpen] = useState(false);
	const [shadowColor, setShadowColor] = useState('#683fff80');

	useEffect(() => {
		if (props.complementary !== '#683fff80') {
			let myColor = Color(props.complementary);
			myColor = myColor.negate();
			setShadowColor(myColor);
		} else {
			setShadowColor(props.complementary);
		}
	}, [props.complementary]);

	const setLogin = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<div id='nav' style={{ boxShadow: `0px 5px 6px ${shadowColor}` }}>
			<h1 className='text-logo'>
				<span className='vertical-ctr'>
					view<span className='bold'>nify</span>
				</span>
			</h1>
			<h1 className='text-logo shadowed'>
				<span className='vertical-ctr'>
					view<span className='bold'>nify</span>
				</span>
			</h1>
			{props.showLogin ? (
				<>
					<button
						onClick={setLogin}
						id='login-btn'
						className='styled-btn title-txt'>
						Log In
					</button>
					<LoginModal
						setToken={props.setToken}
						modalOpen={modalOpen}
						closeModal={closeModal}
						isLogin={true}
					/>
				</>
			) : (
				<></>
			)}
			{props.showLogin ? (
				<></>
			) : (
				<button id='dark-light' onClick={() => props.themeToggler()}>
					☼
				</button>
			)}
		</div>
	);
}
