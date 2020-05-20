import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './UserCard.module.scss';
import buttons from '../buttons.module.scss';

const UserCardDisplay = (props) => {
	const user = props.user;
	const imgRef = useRef(null);
	const cardRef = useRef(null);

	useEffect(() => {
		gsap.fromTo(
			cardRef.current,
			{ opacity: 0.4, y: 50 },
			{ opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' }
		);
		gsap.fromTo(
			imgRef.current,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 0.3, delay: 0.15, ease: 'back.out(1.5)' }
		);
	}, []);

	function closeHandler() {
		gsap.to(cardRef.current, {
			opacity: 0,
			y: 50,
			duration: 0.3,
			delay: 0.15,
			ease: 'power1.in',
			onComplete: () => props.closeDisplay(),
		});
		gsap.to(imgRef.current, {
			opacity: 0,
			y: 50,
			duration: 0.3,
			ease: 'back.in(1.5)',
		});
	}

	return (
		<div className={styles.UserCardDisplay}>
			<h2>User details</h2>
			<div className={styles.DisplayCard} ref={cardRef}>
				<div ref={imgRef}>
					<img className={styles.Thumbnail} src={user.picture.large} />
				</div>
				<div>
					Full name:{' '}
					<span className={`${styles.Bold} ${styles.UserName}`}>
						{user.name.first} {user.name.last}
					</span>
				</div>
				<div>
					Gender: <span className={styles.Bold}>{user.gender}</span>
				</div>
				<div>
					Phone: <span className={styles.Bold}>{user.phone}</span>
				</div>
				<div>
					Mobile: <span className={styles.Bold}>{user.cell}</span>
				</div>
				<div>
					Email: <span className={styles.Bold}>{user.email}</span>
				</div>
				<div>
					DOB: <span className={styles.Bold}>{user.dob.date.substring(0, 10)}</span>
				</div>
				<div>
					Age: <span className={styles.Bold}>{user.dob.age}</span>
				</div>
				<div>
					Nationality: <span className={styles.Bold}>{user.nat}</span>
				</div>
				<div>
					<div>
						Username: <span className={styles.Bold}>{user.login.username}</span>
					</div>
					<div>
						Password: <span className={styles.Bold}>{user.login.password}</span>
					</div>
				</div>
				<div>
					Address:{' '}
					<span className={styles.Bold}>
						{user.location.street.number}, {user.location.street.name},{' '}
						{user.location.state}, {user.location.country}
					</span>
				</div>
			</div>
			<button className={buttons.Button} onClick={closeHandler}>
				Close
			</button>
			{console.log(user)}
		</div>
	);
};

export default UserCardDisplay;
