const express = require('express')
const {CreatePlayerController} = require('../controllers/cricketPlayerController.js')
const router = express.Router()

router.get('/create', CreatePlayerController);

module.exports = router