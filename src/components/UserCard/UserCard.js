import React, { Fragment } from 'react';
import styles from './UserCard.module.scss';

export default function UserCard(props) {
	return (
		<Fragment>
			<div className={styles.Thumbnail}>
				<img src={props.img} alt='Thumbnail' />
			</div>
			<div className={styles.UserName}>{`${props.name.first} ${props.name.last}`}</div>
			<div className={styles.UserDetails}>{`${props.email}`}</div>
			{props.id && <div className={styles.UserDetails}>{`${props.id}`}</div>}
			<div className={styles.UserDetails}>
				{`Registration date: ${props.registered.date.substring(0, 10)}`}
			</div>
		</Fragment>
	);
}
