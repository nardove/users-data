import React, { Component, Fragment } from 'react';
import UsersContainer from '../components/UsersContainer/UsersContainer.js';

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
			content = <UsersContainer data={this.state.usersData} />;
		}

		return (
			<div className={styles.App}>
				<h1>Browsing users data</h1>
				{content}
			</div>
		);
	}
}

export default App;
