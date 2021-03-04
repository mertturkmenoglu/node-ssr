const axios = require('axios');

exports.getHomePage = (_req, res) => {
	res.render('home-page', {
		pageTitle: 'Home Page',
		content: 'Node SSR - Vevericka User Search',
		showContent: true
	});
}

exports.searchUser = async (req, res) => {
	const query = req.body.username;
	const BASE = "https://user-info-service.herokuapp.com";
	const URL = `${BASE}/user/q?searchTerm=${query}`;
	const response = await axios.get(URL);
	const data = response.data;
	const renderOptions = {
		pageTitle: 'Search',
		username: query,
	}

	if (!data['users'] || data['users'].length === 0) {
		renderOptions['searchResults'] = []
	} else {
		renderOptions['searchResults'] = data['users'];
	}

	res.render('search-user', renderOptions);
}