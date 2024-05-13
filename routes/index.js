const express = require('express');
const checkController = require('../controllers/checkController');
const { generateIdenticonImage } = require('../controllers/identiconController');
const { generateHashiconImage } = require('../controllers/hashiconController');
const { generateHashURLs } = require('../controllers/randomHashController');
const { generateMonsterIDImage } = require('../controllers/monsterIdController');
const { generateBlockiesImage } = require('../controllers/blockiesController');
const {serveImageController} = require("../controllers/serveImageController");
const multer = require('multer');

const upload = multer();
const router = express.Router();

router.get('/avatar-service/v1/gen/uris/:genNum/:uniqueString', generateHashURLs);
router.get('/avatar-service/v1/gen/1/:hash', generateIdenticonImage);
router.get('/avatar-service/v1/gen/2/:hash', generateHashiconImage);
router.get('/avatar-service/v1/gen/3/:hash', generateMonsterIDImage);
router.get('/avatar-service/v1/gen/4/:hash', generateBlockiesImage);

router.post('/avatar-service/v1/avatar/check-nsfw', upload.single("file"), checkController.classifyImage)
router.post('/avatar-service/v1/avatar/preprocess', upload.single("file"), checkController.processImage)

router.get('/avatar-service/v1/serve-image', serveImageController)

module.exports = router;