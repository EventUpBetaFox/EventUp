const router = require('express').Router()
const EventController = require('../controllers/event')

router.get('/', EventController.findAllEvents)

module.exports = router