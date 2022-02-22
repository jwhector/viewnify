import React from 'react';
import './home.css';
import Discover from '../Discover/Discover';
import Menu from '../Burger/Burger';
import { useState } from 'react';
import WatchParty from '../WatchParty/WatchParty';
import Library from '../Library/Library';
import Chatroom from '../Chatroom/Chatroom';
import Invite from '../Invite/Invite';


export default function Home(props) {
	const [theme, setTheme] = useState('light');
	// const [menuOpen, setMenuOpen] = useState(false);

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

	// const closeMenu = () => {
	// 	setMenuOpen(false);
	// };

	return (
		<div className='home' id='homer'>
			<Menu
				// isOpen={menuOpen}
				// closeMenu={closeMenu}
				themeToggler={themeToggler}
				token={props.token}
				setToken={props.setToken}
			/>
			<div className='right-container'>{renderPage()}</div>
		</div>
	);
}
