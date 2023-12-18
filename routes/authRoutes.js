const express = require('express');
const router = express.Router();
const {  loginUser } = require('../controllers/authController');
const {  getRoles,  } = require('../controllers/rolesController');


// User login
router.post('/login',loginUser );
router.get('/users', getRoles);



module.exports = router;
