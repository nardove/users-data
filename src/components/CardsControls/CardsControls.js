import React from 'react';

import styles from './CardsControls.module.scss';

const CardsControls = (props) => {
	return (
		<div className={styles.CardsControls}>
			<button id='prev' className={styles.Button} onClick={props.shift}>
				{`< Prev`}
			</button>
			<button id='details' className={styles.Button} onClick={props.view}>
				{`View Details`}
			</button>
			<button id='next' className={styles.Button} onClick={props.shift}>
				{`Next >`}
			</button>
		</div>
	);
};

export default CardsControls;
