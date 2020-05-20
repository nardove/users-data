import React from 'react';

import styles from './CardsControls.module.scss';
import buttons from '../buttons.module.scss';

const CardsControls = (props) => {
	return (
		<div className={styles.CardsControls}>
			<button className={buttons.Button} id='prev' onClick={props.shift}>
				{`< Prev`}
			</button>
			<button id='details' className={buttons.Button} onClick={props.view}>
				{`View Details`}
			</button>
			<button id='next' className={buttons.Button} onClick={props.shift}>
				{`Next >`}
			</button>
		</div>
	);
};

export default CardsControls;
