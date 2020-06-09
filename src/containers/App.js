import React, { Component } from 'react';
import UsersContainer from '../components/UsersContainer/UsersContainer.js';
import { ReactComponent as Logo } from '../assets/users-data-logo.svg';

import styles from './App.module.scss';

import { loadData } from '../data.js';

const URL = 'https://randomuser.me/api/?results=10';

class App extends Component {
	state = {
		isUsersDataContentReady: false,
		usersData: {},
	};

	componentDidMount() {
		console.log('[App] component did mount');
		(async () => {
			this.setState({
				isUsersDataContentReady: true,
				usersData: await loadData(URL),
			});
		})();
	}

	render() {
		console.log('[App] render');

		let content = <div>Please wait a moment, loading data ...</div>;
		if (this.state.isUsersDataContentReady) {
			if (this.state.usersData !== undefined) {
				content = <UsersContainer data={this.state.usersData} />;
			} else {
				content = (
					<div className={styles.FetchError}>
						Ooops, that was not suppose to happen. There has been an error, please try
						again later
					</div>
				);
			}
		}

		return (
			<div className={styles.App}>
				<div className={styles.Header}>
					<div className={styles.Logo}>
						<Logo />
						<h1>Browsing users data</h1>
					</div>
					<div>
						A deck of user cards from{' '}
						<a href='https://randomuser.me/' target='blank'>
							randomuser.me
						</a>
					</div>
				</div>
				{content}
			</div>
		);
	}
}

export default App;
