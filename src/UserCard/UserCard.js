import React, { Fragment } from 'react';
import './UserCard.scss';

export default function UserCard(props) {
	return (
		// <div className='user-card'>
		<Fragment>
			{/* <div>{`${props.id}`}</div> */}
			<div className='user-card-child thumbnail'>
				<img src={props.img} alt='Thumbnail' />
			</div>
			<div className='user-card-child user-name'>{`${props.firstName} ${props.lastName}`}</div>
			<div className='user-card-child user-email'>{`${props.email}`}</div>
			<div className='user-card-child user-phone'>{`${props.phone}`}</div>
			<div className='user-card-child user-location'>{`${props.location.city}, ${props.location.country}`}</div>
			<div className='user-card-child user-registration-date'>{`Registration date: ${props.registered.date.substring(
				0,
				10
			)}`}</div>
		</Fragment>
		// </div>
	);
}
