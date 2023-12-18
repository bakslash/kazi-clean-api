const express = require('express');
const router = express.Router();
const { registerUser  } = require('../controllers/adminController');
const {login}= require('../controllers/adminController');
const {getUsers}= require('../controllers/adminController');
const {checkRoles} = require('../middlewares/checkRole')



router.post('/register', registerUser);
router.post('/login', login);
router.get('/roles',getUsers);


module.exports = router;
