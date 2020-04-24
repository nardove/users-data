import React, { Component, Fragment } from 'react';
import UsersContainer from '../components/UsersContainer/UsersContainer.js';
import CardsControls from '../components/CardsControls/CardsControls';

import styles from './App.module.scss';

import { loadData } from '../data.js';

const URL = 'https://randomuser.me/api/?results=10';

class App extends Component {
	state = {
		currentCard: 0,
		isCurrentCardDisplayActive: false,
		isUsersDataContentReady: false,
		usersData: {},
	};

	componentDidMount() {
		console.log('[App] component did mount');
		(async () => {
			this.setState({
				currentCard: 0,
				isUsersDataContentReady: true,
				usersData: await loadData(URL),
			});
		})();
	}

	shiftCards = (event) => {
		console.log(`shift cards ${this.state.currentCard}`);
		let index = this.state.currentCard;
		switch (event.target.id) {
			case 'next':
				if (index === this.state.usersData.results.length - 1) {
					index = 0;
				} else {
					index++;
				}
				break;
			case 'prev':
				if (index === 0) {
					index = this.state.usersData.results.length - 1;
				} else {
					index--;
				}
				break;
			default:
				console.log('view user details');
				break;
		}
		this.setState({ currentCard: index });
	};

	viewDetails = () => {
		console.log(`view details for user ${this.state.currentCard}`);
	};

	render() {
		console.log('[App] render');

		let content = <div>Please wait a moment, loading data ...</div>;
		if (this.state.isUsersDataContentReady) {
			content = (
				<Fragment>
					<UsersContainer data={this.state.usersData} />
					<CardsControls shift={this.shiftCards} view={this.viewDetails} />
				</Fragment>
			);
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
