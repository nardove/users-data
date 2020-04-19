export const loadData = async (url) => {
	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data.results);
			return data;
		})
		.catch((error) => console.log(`There has been a problem: ${error}`));
};
