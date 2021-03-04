exports.getHomePage = (_req, res) => {
	res.render('home-page', {
		pageTitle: 'Home Page',
		content: 'Hello World - This is home page',
		showContent: true
	});
}