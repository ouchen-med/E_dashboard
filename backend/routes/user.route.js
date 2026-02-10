const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController/')
//get all users:
router.route('/')
    .get(verifyToken,usersController.getAllUsers)
   
//register:
router.route('/regester')
     .post(usersController.regester)
//login
router.route('/login')
     .post(usersController.login)

  

module.exports = router
