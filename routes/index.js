const express = require('express');
const checkController = require('../controllers/checkController');
const multer = require('multer');

const upload = multer();
const router = express.Router();

router.post('/avatar-service/v1/avatar/check-nsfw', upload.single("file"), checkController.classifyImage)

module.exports = router;