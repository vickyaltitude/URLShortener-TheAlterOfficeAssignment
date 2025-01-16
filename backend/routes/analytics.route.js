const express = require('express');

const router = express.Router();

const {getUrlData} = require('../controllers/analytics.controller');
const { authProtectRoute } = require('../middleware/authProtectRoute');

router.get('/:alias',authProtectRoute ,getUrlData)

module.exports = router