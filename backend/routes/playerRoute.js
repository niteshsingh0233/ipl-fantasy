const express = require('express')
const {CreatePlayer} = require('../controllers/playerController.js')
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router()

router.get('/create',RequireSignIn, CreatePlayer);

module.exports = router