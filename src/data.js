import axios from 'axios';

export const loadData = async (url) => {
	let data;
	await axios
		.get(url)
		.then((res) => {
			data = res.data;
		})
		.catch((error) => {
			alert(`There has been a problem retreiving the data. ${error}`);
			// console.log(error);
		});
	return data;
};
