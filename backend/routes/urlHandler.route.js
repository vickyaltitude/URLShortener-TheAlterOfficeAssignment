const express = require('express');

const {urlShortener,redirectHandler} = require('../controllers/urlHandler.controller');
const { authProtectRoute } = require('../middleware/authProtectRoute');

const router = express.Router();


router.post('/', authProtectRoute,urlShortener)

router.get('/:alias',redirectHandler)

module.exports = router;