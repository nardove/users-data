import React, { useState, useEffect } from 'react';
import './App.scss';
import { loadData } from './data.js';
import UsersController from './UserCard/UsersController.js';

const URL = 'https://randomuser.me/api/?results=10';

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [usersData, setUsersData] = useState(null);

	useEffect(() => {
		const getData = async () => {
			setUsersData(await loadData(URL));
			setIsLoading(false);
		};
		getData();
	}, []);

	return (
		<div className='App'>
			<h1 className='title'>Browsing users data</h1>

			{isLoading ? (
				<h2 className='subtitle'>Please wait a moment, loading data ...</h2>
			) : (
				<UsersController results={usersData.results.reverse()} />
			)}
		</div>
	);
}
