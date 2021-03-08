const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.getHomePage = (_req, res) => {
	res.render('home-page', {
		pageTitle: 'Home Page',
		path: '/',
		content: 'Node SSR - Vevericka User Search',
		showContent: true
	});
}

exports.getImageUploadPage = (_req, res) => {
	res.render('image-upload', {
		path: '/image-upload',
		pageTitle: 'Image Upload',
		error: null,
		message: null
	})
}

exports.postImageUpload = (req, res) => {
	const image = req.file;
	let statusCode;
	const renderOptions = {
		pageTitle: 'Image Upload',
		path: '/image-upload',
		error: null,
		message: null
	}

	if (!image) {
		statusCode = 422;
		renderOptions.error = 'File is not an image';
	} else {
		statusCode = 201;
		renderOptions.message = 'File uploaded';
	}

	return res.status(statusCode).render('image-upload', renderOptions);
}

exports.searchUser = async (req, res) => {
	const query = req.body.username;
	const BASE = "https://user-info-service.herokuapp.com";
	const URL = `${BASE}/user/q?searchTerm=${query}`;
	const response = await axios.get(URL);
	const data = response.data;
	const renderOptions = {
		pageTitle: 'Search',
		path: '/search-user',
		username: query,
	}

	if (!data['users'] || data['users'].length === 0) {
		renderOptions['searchResults'] = []
	} else {
		renderOptions['searchResults'] = data['users'];
	}

	res.render('search-user', renderOptions);
}

exports.getUploadedImagesPage = (req, res) => {
	const page = +req.query.page || 1;
	const IMG_PER_PAGE = 2;

	const p = path.join(__dirname, '..', 'images');
	const renderOptions = {
		path: '/uploaded-images',
		pageTitle: 'Uploaded Images',
		page: page,
		prevPage: (page !== 1) ? page-1 : null,
		nextPage: null,
		images: []
	}

	fs.readdir(p, (err, files) => {
		if (!err) {
			const startIndex = (page-1) * IMG_PER_PAGE
			const allImages = files
				.filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'))
				.sort();

			const totalImageCount = allImages.length;
			renderOptions.images = allImages
				.slice(startIndex, startIndex + IMG_PER_PAGE)
				.map(f => ({
					imageName: f,
					imagePath: `images/${f}`
				}));
			renderOptions.nextPage = (totalImageCount / IMG_PER_PAGE > page) ? page + 1 : null
		}
		res.render('uploaded-images', renderOptions);
	});
}

exports.getImageDetailPage = (req, res) => {
	const image = req.params.image;
	console.log('Image detail', image)
	const renderOptions = {
		path: '/image-detail/images',
		pageTitle: `Image - ${image}`,
		imageName: image,
		imagePath: `images/${image}`
	}

	res.render('image-detail', renderOptions);
}

exports.getNotFoundPage = (req, res) => {
	const renderOptions = {
		path: req.originalUrl,
		pageTitle: 'Not found'
	}

	res.status(404).render('not-found', renderOptions);
}