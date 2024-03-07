const express = require('express');
const { generateIdenticonImage } = require('../controllers/identiconController');
const { generateHashiconImage } = require('../controllers/hashiconController');
const { generateHashURLs } = require('../controllers/randomHashController');
const { generateMonsterIDImage } = require('../controllers/monsterIdController');
const { generateBlockiesImage } = require('../controllers/blockiesController');

const router = express.Router();

router.get('/random-hash-return/gen/:genNum/:uniqueString', generateHashURLs);
router.get('/gen/1/:hash', generateIdenticonImage);
router.get('/gen/2/:hash', generateHashiconImage);
router.get('/gen/3/:hash', generateMonsterIDImage);
router.get('/gen/4/:hash', generateBlockiesImage);

module.exports = router;