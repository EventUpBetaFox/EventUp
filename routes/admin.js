const router = require('express').Router()
const { AdminController, EventController } = require('../controllers')

router.get('/', AdminController.renderAdminDashboard)
router.get('/events/add', EventController.renderFormEventAdd)
router.post('/events/add', EventController.addEvent)
router.get('/events/edit/:eventId', EventController.renderEditForm)
router.post('/events/edit/:eventId', EventController.updateEvent)
router.get('/events', EventController.getAll)
module.exports = router