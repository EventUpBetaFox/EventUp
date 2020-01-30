const router = require('express').Router()
const EventController = require('../controllers/event')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', EventController.findAllEvents)
router.get('/join/:eventId', isAuthenticated, EventController.joinEvent)

module.exports = router