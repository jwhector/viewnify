import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import useToken from './useToken';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {
	lightTheme,
	darkTheme,
	GlobalStyles
} from './components/Burger/Burger';
import styled from 'styled-components';
import 'dotenv/config';

const StyledApp = styled.div`
	color: ${(props) => props.theme.background};
`;

const UserContext = React.createContext(undefined);

const savedTheme = localStorage.getItem('theme');

function App() {
	const [theme, setTheme] = savedTheme ? useState(savedTheme) : useState('dark');

	const themeToggler = () => {
		const newTheme = (theme === 'light') ? 'dark' : 'light';
		localStorage.setItem('theme', newTheme);
		setTheme(newTheme);
	};

	const { token, setToken } = useToken();
	const [user, setUser] = useState({});
	const [complementary, setComplementary] = useState('#ffffff');

	useEffect(() => {
		if (token) {
			fetch(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
				.then(async (res) => {
					if (res.ok) {
						const data = await res.json();
						delete data.password;
						setUser(data);
					}
				})
				.catch((err) => console.log(err));
		}
	}, [token]);

	useEffect(() => {
		if (token) {
			fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/verify`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})
				.then(async (res) => {
					if (!res.ok) {
						localStorage.removeItem('token');
						setToken(null);
					}
				})
				.catch((err) => console.log(err));
		}
	});

	return (
		<UserContext.Provider value={user}>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<StyledApp className='styleme'>
					<GlobalStyles />
					<NavBar
						showLogin={token ? false : true}
						complementary={complementary}
						setComplementary={setComplementary}
						themeToggler={themeToggler}
						setToken={setToken}
					/>
					<Router>
						<Routes>
							<Route
								path='/'
								element={
									<Home
										page='discover'
										user={user}
										token={token}
										setToken={setToken}
										complementary={complementary}
										setComplementary={setComplementary}
									/>
								}
							/>
							<Route
								path='/discover'
								element={
									<Home
										page='discover'
										user={user}
										token={token}
										setToken={setToken}
										complementary={complementary}
										setComplementary={setComplementary}
									/>
								}
							/>
							<Route
								path='/watchparty'
								element={
									<Home
										page='watchparty'
										user={user}
										token={token}
										setToken={setToken}
										setComplementary={setComplementary}
									/>
								}
							/>
							<Route
								path='/library'
								element={
									<Home
										page='library'
										user={user}
										token={token}
										setToken={setToken}
										setComplementary={setComplementary}
									/>
								}
							/>
							<Route
								path='/chatroom'
								element={
									<Home
										page='chatroom'
										user={user}
										token={token}
										setToken={setToken}
										setComplementary={setComplementary}
									/>
								}
							/>
							<Route
								path='/invite'
								element={
									<Home
										page='invite'
										user={user}
										token={token}
										setToken={setToken}
										complementary={complementary}
										setComplementary={setComplementary}
									/>
								}
								setComplementary={setComplementary}
							/>
							<Route
								path='/preferences'
								element={
									<Home
										page='preferences'
										user={user}
										token={token}
										setToken={setToken}
										complementary={complementary}
										setComplementary={setComplementary}
									/>
								}
								setComplementary={setComplementary}
							/>
							{/* <Route path="/" element={<Home page="logout" user={user} token={token} />} setComplementary={setComplementary} /> */}
						</Routes>
					</Router>
				</StyledApp>
			</ThemeProvider>
		</UserContext.Provider>
	);
}

export default App;
export { UserContext };
