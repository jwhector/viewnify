import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './LandingPage.css';

async function loginUser(credentials) {
	return fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	}).then((data) => data.json());
}

async function signupUser(credentials) {
	return fetch(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.error(err);
		});
}

export default function LoginModal(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmText, setConfirmText] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		const { token } = await loginUser({
			email,
			password
		});
		setEmail('');
		setPassword('');
		if (token) {
			// console.log(email, password);
			clearModal();
			props.setToken({ token: token });
			// props.setGenres(u)
		} else {
			setConfirmText('Email or password incorrect!');
		}
	};

	const handleSignup = async (e) => {
		e.preventDefault();

		console.log(email, password, confirmPassword);

		if (password.length < 8) {
			setConfirmText(
				'Your password must be at least 8 characters long. Please try again.'
			);
			setPassword('');
			setConfirmPassword('');
		} else {
			if (password === confirmPassword) {
				setEmail('');
				setPassword('');
				setConfirmPassword('');
				const { token, user } = await signupUser({
					first_name: 'test',
					// username: 'testtesttesties',
					password: password,
					email: email,
					genres: '12,35,80',
					streaming_service: 'Netflix'
				}).catch((err) => console.error(err));

				if (!token || !user) {
					setConfirmText('That email is already taken!');
					return;
				}

				console.log(user);
				props.setToken({ token: token });
				clearModal();
				// props.closeModal();
			} else {
				setConfirmText('Passwords did not match! Please try again.');
				setPassword('');
				setConfirmPassword('');
			}
		}
	};

	const clearModal = () => {
		setConfirmText('');
		props.closeModal();
	};

	const isLogin = props.isLogin;

	ReactModal.setAppElement('#root');

	if (isLogin) {
		return (
			<ReactModal
				isOpen={props.modalOpen}
				className='login-modal'
				overlayClassName='login-modal-overlay'
				onRequestClose={clearModal}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				style={{ overlay: { zIndex: 3 } }}>
				<h2 className='title-txt'>Log In</h2>
				<h3>{confirmText}</h3>
				<input
					className='modal-in'
					type='text'
					placeholder='Email'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					className='modal-in'
					type='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				{/* <p>or</p> */}
				<button className='submit-btn' onClick={handleLogin}>
					Submit
				</button>
			</ReactModal>
		);
	}

	return (
		<ReactModal
			isOpen={props.modalOpen}
			className='login-modal'
			overlayClassName='login-modal-overlay'
			onRequestClose={clearModal}
			shouldCloseOnEsc={true}
			shouldCloseOnOverlayClick={true}
			style={{ overlay: { zIndex: 3 } }}>
			<h2 className='title-txt'>Sign Up</h2>
			<h3>{confirmText}</h3>
			<input
				className='modal-in'
				type='text'
				placeholder='Email'
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<input
				className='modal-in'
				type='password'
				placeholder='Password'
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<input
				className='modal-in'
				type='password'
				placeholder='Confirm Password'
				onChange={(e) => setConfirmPassword(e.target.value)}
				value={confirmPassword}
			/>
			{/* <p>or</p> */}
			<button className='submit-btn' onClick={handleSignup}>
				Submit
			</button>
		</ReactModal>
	);
}
