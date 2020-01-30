const router = require('express').Router();
const UserController = require('../controllers/user')
const EventController = require('../controllers/event')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/events/:type', isAuthenticated, EventController.findEventByUserId)
router.get('/:id', isAuthenticated, UserController.renderProfile);
router.get('/:id/edit', isAuthenticated, UserController.renderEdit);
router.post('/:id/edit', isAuthenticated, UserController.edit);
module.exports = router;