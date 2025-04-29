const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const UserController = require('../controllers/UserController')


//Rutas

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getProfile', check.auth, UserController.getProfile);

module.exports = router;