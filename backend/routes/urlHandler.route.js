const express = require('express');

const {urlShortener,redirectHandler} = require('../controllers/urlHandler.controller')

const router = express.Router();


router.post('/',urlShortener)

router.get('/:alias',redirectHandler)

module.exports = router;