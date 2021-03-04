const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.getHomePage);
router.post('/search-user', appController.searchUser);

module.exports = router;