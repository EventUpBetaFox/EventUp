const router = require('express').Router()
const EventController = require('../controllers/event')
const UserController = require('../controllers/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', EventController.findAllEvents)
router.get('/join/:eventId', isAuthenticated, EventController.joinEvent)

router.get('/create', UserController.renderCreateEvent)
router.post('/create', UserController.createEvent)

module.exports = router