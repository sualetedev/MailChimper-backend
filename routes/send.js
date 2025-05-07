const express = require('express');
const router = express.Router();
const check = require('../middleware/auth');
const SendController = require('../controllers/sendController')

router.post("/sendtoaudience", check.auth, SendController.sendToAudience)


module.exports = router;