const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.getHomePage);
router.post('/search-user', appController.searchUser);
router.get('/image-upload', appController.getImageUploadPage);
router.post('/image-upload', appController.postImageUpload);
router.get('/uploaded-images', appController.getUploadedImagesPage);
router.get('/image-detail/:image', appController.getImageDetailPage);
router.get('*', appController.getNotFoundPage);

module.exports = router;