import React, { Fragment } from 'react';
import styles from './UserCard.module.scss';

export default function UserCard(props) {
	return (
		// <div className={styles.UserCard}>
		<Fragment>
			<div className={styles.Thumbnail}>
				<img src={props.img} alt='Thumbnail' />
			</div>
			<div className={styles.UserName}>{`${props.name.first} ${props.name.last}`}</div>
			<div className={styles.UserEmail}>{`${props.email}`}</div>
			<div className={styles.UserPhone}>{`${props.phone}`}</div>
			<div className={styles.UserLocation}>
				{`${props.location.city}, ${props.location.country}`}
			</div>
			<div className={styles.UserRegistrationDate}>
				{`Registration date: ${props.registered.date.substring(0, 10)}`}
			</div>
		</Fragment>
		// </div>
	);
}
