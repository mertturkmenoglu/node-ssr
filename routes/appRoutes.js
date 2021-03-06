const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.getHomePage);
router.post('/search-user', appController.searchUser);
router.get('/image-upload', appController.getImageUploadPage);
router.post('/image-upload', appController.postImageUpload);

module.exports = router;