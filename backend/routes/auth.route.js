const express = require("express");
const router = express.Router();
const { loginUser,userDetails } = require("../controllers/auth.controller");
const {authProtectRoute} = require('../middleware/authProtectRoute')

router.post("/login", loginUser);

router.get("/getme",authProtectRoute, userDetails);

module.exports = router;
