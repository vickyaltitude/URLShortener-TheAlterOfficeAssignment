const express = require('express');

const router = express.Router();

const {getUrlData,getTopicUrlData,getOverAllData} = require('../controllers/analytics.controller');
const { authProtectRoute } = require('../middleware/authProtectRoute');

router.get('/overall',authProtectRoute,getOverAllData)

router.get('/:alias',authProtectRoute ,getUrlData)

router.get('/topic/:alias',authProtectRoute,getTopicUrlData)



module.exports = router