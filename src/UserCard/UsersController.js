import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import UserCard from './UserCard.js';
import UserCardDisplay from './UserCardDisplay';

import './UsersController.scss';

export default function UsersController(props) {
	const [currentCard, setCurrentCard] = useState(0);
	const [userData, setUserData] = useState(props.results);
	const [isUserCardDisplayActive, setIsUserCardDisplayActive] = useState(false);

	const refArray = useRef([]);
	const tween = gsap.timeline({ delay: 1 });
	const SPACE_BETWEEN = 7.5;
	const NUM_CARDS = props.results.length;
	const cardStack = [];
	const angles = [];
	const TWO_PI = Math.PI * 2;
	const angleInDegrees = (((Math.PI * 0.3) / NUM_CARDS) * 180) / TWO_PI;
	// const angleInRadians = (Math.PI * 0.5) / NUM_CARDS;

	// let currentCard = 0;

	useEffect(() => {
		init();
	}, []);

	function init() {
		refArray.current.forEach((element, index) => {
			const theta = angleInDegrees * (NUM_CARDS - index);
			angles.push(theta);
			cardStack.push(index);
			element.style.zIndex = index;
			tween
				.set(element, {
					transformOrigin: '0% 50%',
				})
				.fromTo(
					element,
					0.1,
					{
						y: 200,
						opacity: 0,
						rotation: -30,
					},
					{
						y: index * SPACE_BETWEEN,
						opacity: 1,
						rotation: theta,
						ease: 'power3.out',
					}
				)
				.delay(index * 0.15);
		});
		// currentCard = cardStack[NUM_CARDS - 1];
		setCurrentCard(cardStack[NUM_CARDS - 1]);
	}

	/*
		User navigation functions
	*/
	function handleClick(event) {
		switch (event.target.id) {
			case 'prev':
				// currentCard = cardStack[0];
				setCurrentCard(cardStack[0]);
				removeCard(refArray.current[currentCard]);
				cardStack.push(cardStack.shift());
				break;
			case 'next':
				// currentCard = cardStack[NUM_CARDS - 1];
				setCurrentCard(cardStack[NUM_CARDS - 1]);
				removeCard(refArray.current[currentCard]);
				cardStack.unshift(cardStack.pop());
				break;
			default:
				showData();
				break;
		}
		console.log(`user data: ${userData}`);
		console.log(`refArray: ${currentCard} - ${refArray.current[currentCard]}`);
	}

	function removeCard(card) {
		gsap.to(card, 0.3, {
			opacity: 0.3,
			x: 100,
			ease: 'power1.in',
			onComplete: () => {
				card.style.opacity = 0;
				shiftCards(card);
			},
		});
	}

	function shiftCards(card) {
		for (let i = 0; i < NUM_CARDS; i++) {
			const index = cardStack[i];
			const element = refArray.current[index];

			tween.to(
				element,
				0.05,
				{
					y: i * SPACE_BETWEEN,
					rotation: angles[i],
					ease: 'power1.out',
					onComplete: () => {
						element.style.zIndex = i;
						if (i === NUM_CARDS - 1) {
							addCard(card);
						}
					},
				},
				'-=0.015'
			);
		}
	}

	function addCard(card) {
		gsap.to(card, 0.3, {
			opacity: 1,
			x: 0,
			ease: 'power4.out',
		});
	}

	/*
		Show users data on click
	*/
	function showData() {
		console.log(
			`show more detail for user ${currentCard} - ${Object.values(userData[currentCard])}`
		);
		setIsUserCardDisplayActive(!isUserCardDisplayActive);
	}

	return (
		<div className='users-controller'>
			<p>Simple interface/exercise to browse users data from a data base</p>
			<div className='cards-container'>
				{userData.map((user, index) => (
					<div ref={(div) => (refArray.current[index] = div)} className='user-card'>
						<UserCard
							id={index}
							img={user.picture.large}
							firstName={user.name.first}
							lastName={user.name.last}
							email={user.email}
							phone={user.phone}
							location={user.location}
							registered={user.registered}
						/>
					</div>
				))}
			</div>
			<div className='cards-controller'>
				<div>
					<button
						id='prev'
						className='button'
						onClick={handleClick}>{`<div Prev`}</button>
				</div>
				<div>
					<button
						id='view'
						className='button'
						onClick={handleClick}>{`View details`}</button>
				</div>
				<div>
					<button id='next' className='button' onClick={handleClick}>{`Next >`}</button>
				</div>
			</div>
			<h4 className='subtitle'>
				Data from <a href='https://randomuser.me/'>randomuser.me</a>
			</h4>

			{isUserCardDisplayActive ? (
				<UserCardDisplay {...Object.values(props.results[currentCard])} />
			) : (
				<div>not showing user display component</div>
			)}
		</div>
	);
}
