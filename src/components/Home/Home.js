import React from 'react';
import './Home.css';
import Discover from '../Discover/Discover';
import Menu from '../Burger/Burger';
import { useState } from 'react';
import WatchParty from '../WatchParty/WatchParty';
import Library from '../Library/Library';
import Chatroom from '../Chatroom/Chatroom';
import Invite from '../Invite/Invite';

export const lightTheme = {
	body: '#999',
	fontColor: '#4444',
	background: 'white',
	root: 'white',
	homer: 'white',
	nav: '#FFFFF',
	rightContainer: 'white',
	playPause: '#FFFFF',
	bmMenu: 'blue'
};

export const darkTheme = {
	body: '#555',
	fontColor: '#fff',
	background: '#010101',
	root: '#010101',
	homer: '#010101',
	nav: '#080808',
	rightContainer: '#010101',
	playPause: 'blue',
	bmMenu: 'yellow'
};

export default function Home(props) {
	const [theme, setTheme] = useState('light');
	const [menuOpen, setMenuOpen] = useState(false);

	const themeToggler = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	};

	const renderPage = () => {
		if (props.page !== 'discover') {
			props.setComplementary('#683fff80');
		}
		if (props.page === 'discover') {
			return (
				<Discover
					token={props.token}
					complementary={props.complementary}
					setComplementary={props.setComplementary}
				/>
			);
		}
		if (props.page === 'watchparty') {
			return <WatchParty token={props.token} />;
		}
		if (props.page === 'library') {
			return <Library token={props.token} />;
		}
		if (props.page === 'chatroom') {
			return <Chatroom token={props.token} />;
		}
		if (props.page === 'invite') {
			return <Invite token={props.token} />;
		}
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<div className='home' id='homer'>
			<Menu
				isOpen={menuOpen}
				closeMenu={closeMenu}
				themeToggler={themeToggler}
				token={props.token}
				setToken={props.setToken}
			/>
			<div className='right-container'>{renderPage()}</div>
		</div>
	);
}
