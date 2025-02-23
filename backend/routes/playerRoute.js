const express = require('express')
const {CreatePlayer, GetPlayerDetails, GetPlayerImageDetails} = require('../controllers/playerController.js')
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router()

router.get('/create',RequireSignIn, CreatePlayer)
.get('/playerDetails/:playerId', RequireSignIn, GetPlayerDetails)
.get('/playerImageDetails/:imageId', RequireSignIn, GetPlayerImageDetails)

module.exports = router