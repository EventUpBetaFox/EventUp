const router = require('express').Router()
const EventController = require('../controllers/event')
const UserController = require('../controllers/user')

router.get('/', EventController.findAllEvents)

router.get('/create', UserController.renderCreateEvent)
router.post('/create', UserController.createEvent)

module.exports = router