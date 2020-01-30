const router = require('express').Router();
const UserController = require('../controllers/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/:id', isAuthenticated, UserController.renderProfile);
router.get('/:id/edit', isAuthenticated, UserController.renderEdit);
router.post('/:id/edit', isAuthenticated, UserController.edit);

router.get('/events', UserController.renderUserEvents)
module.exports = router;