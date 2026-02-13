const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyToken  = require('../middlewares/verifyToken');


router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/profile', verifyToken, usersController.profile);

module.exports = router;
