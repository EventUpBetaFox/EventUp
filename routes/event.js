const router = require('express').Router()
const EventController = require('../controllers/event')
const UserController = require('../controllers/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', EventController.findAllEvents)
router.get('/join/:eventId', isAuthenticated, EventController.joinEvent)
router.get('/create', isAuthenticated, UserController.renderCreateEvent)
router.post('/create', isAuthenticated, UserController.createEvent)

router.get('/:action/:eventId', isAuthenticated, EventController.approvalEvent)

module.exports = router