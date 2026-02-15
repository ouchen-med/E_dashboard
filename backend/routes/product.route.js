const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken  = require('../middlewares/verifyToken');


router.post('/register', productController);
router.post('/login', usersController.);
router.get('/profile', verifyToken, usersController.profile);

module.exports = router;
