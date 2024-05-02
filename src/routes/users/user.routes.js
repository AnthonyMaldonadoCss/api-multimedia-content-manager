const express = require('express');
const router = express.Router();

const userController = require('../../controllers/users/authController');

const matchToken = require('../../middleware/auth');

router.post('/register', userController.register);
router.post('/signin', userController.signin);
router.get('/profile', matchToken, userController.profile);

module.exports = router