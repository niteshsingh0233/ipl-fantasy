const express = require('express')
const {CreatePlayer} = require('../controllers/playerController.js')
const router = express.Router()

router.get('/create', CreatePlayer);

module.exports = router