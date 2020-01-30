const router = require('express').Router()
const { EventController } = require('../controllers')

router.get('/add', EventController.renderFormEventAdd)
router.post('/add', EventController.addEvent)
router.get('/edit/:eventId', EventController.renderEditForm)
router.post('/edit/:eventId', EventController.updateEvent)
router.get('/', EventController.getAll)
module.exports = router