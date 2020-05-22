import React, { Component, Fragment, createRef } from 'react';
import CardsControls from '../CardsControls/CardsControls';
import UserCard from '../UserCard/UserCard';
import UserCardDisplay from '../UserCard/UserCardDisplay';
import styles from './UsersContainer.module.scss';
import gsap from 'gsap';

class UsersContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data.results,
			currentCard: this.props.data.results.length - 1,
			showUserDetails: false,
		};

		this.cardStack = [];
		this.angles = [];
		this.numCards = this.state.data.length;
		this.spaceBetween = 7.5;
		this.tween = gsap.timeline({ delay: 1 });
		this.cardsTweenRefArray = this.state.data.map(() => createRef());
	}

	componentDidMount() {
		console.log('[UsersContainer] component did mount');

		const angle = (((Math.PI * 0.5) / this.numCards) * 180) / (Math.PI * 2);

		this.cardsTweenRefArray.forEach((element, index) => {
			const theta = angle * (this.numCards - 1 - index);
			this.cardStack.push(index);
			this.angles.push(theta);
			// element.style.zIndex = index;
			this.tween
				.set(element, { transformOrigin: '20% 60%' })
				.fromTo(
					element,
					0.1,
					{
						y: 200,
						opacity: 0,
						rotation: -30,
					},
					{
						y: index * this.spaceBetween,
						opacity: 1,
						rotation: theta,
						ease: 'power3.out',
					}
				)
				.delay(index * 0.15);
		});
	}

	userCardsHandler = (event) => {
		switch (event.target.id) {
			case 'next':
				const n = this.cardStack[this.numCards - 1];
				this.removeCard(this.cardsTweenRefArray[n]);
				this.cardStack.unshift(this.cardStack.pop());
				break;
			case 'prev':
				const p = this.cardStack[0];
				this.removeCard(this.cardsTweenRefArray[p]);
				this.cardStack.push(this.cardStack.shift());
				break;
			default:
				console.log('view user details');
				break;
		}
		this.setState({ currentCard: this.cardStack[this.numCards - 1] });
	};

	removeCard = (card) => {
		gsap.to(card, 0.3, {
			opacity: 0.3,
			x: 100,
			ease: 'power1.in',
			onComplete: () => {
				card.style.opacity = 0;
				this.shiftCards(card);
			},
		});
	};

	shiftCards = (card) => {
		for (let i = 0; i < this.numCards; i++) {
			const index = this.cardStack[i];
			const element = this.cardsTweenRefArray[index];
			element.style.zIndex = i;
			this.tween.to(
				element,
				0.2,
				{
					y: i * this.spaceBetween,
					rotation: this.angles[i],
					ease: 'circ.in',
					onComplete: () => {
						if (i === this.numCards - 1) {
							this.addCard(card);
						}
					},
				},
				'-=0.15'
			);
		}
	};

	addCard = (card) => {
		gsap.to(card, 0.3, {
			opacity: 1,
			x: 0,
			ease: 'power4.out',
		});
	};

	viewUserDetailsHandler = () => {
		console.log(`view details for user ${this.state.currentCard}`);
		this.setState({ showUserDetails: true });
	};

	closeUserDetailsHandler = () => {
		console.log('view details closed');
		this.setState({ showUserDetails: false });
	};

	render() {
		let userCardDisplay = null;
		if (this.state.showUserDetails) {
			userCardDisplay = (
				<UserCardDisplay
					user={this.state.data[this.state.currentCard]}
					closeDisplay={this.closeUserDetailsHandler}
				/>
			);
		}

		return (
			<Fragment>
				<div className={styles.Container}>
					<div className={styles.UsersContainer}>
						{this.state.data.map((user, index) => (
							<div
								ref={(div) => (this.cardsTweenRefArray[index] = div)}
								className={styles.UserCard}>
								<UserCard
									key={user.id.value}
									img={user.picture.large}
									name={user.name}
									email={user.email}
									id={user.id.value}
									location={user.location}
									registered={user.registered}
								/>
							</div>
						))}
					</div>
					<CardsControls
						shift={this.userCardsHandler}
						view={this.viewUserDetailsHandler}
					/>
				</div>
				{userCardDisplay}
			</Fragment>
		);
	}
}

export default UsersContainer;
