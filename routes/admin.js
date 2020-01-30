const router = require('express').Router()
const { EventController } = require('../controllers')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', isAuthenticated, EventController.pendingEvents)
router.get('/events/add', isAuthenticated, EventController.renderFormEventAdd)
router.post('/events/add', isAuthenticated, EventController.addEvent)
router.get('/events/edit/:eventId', isAuthenticated, EventController.renderEditForm)
router.post('/events/edit/:eventId', isAuthenticated, EventController.updateEvent)
router.get('/events', isAuthenticated, EventController.getAll)
module.exports = router