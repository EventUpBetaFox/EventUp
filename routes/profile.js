const router = require('express').Router();
const UserController = require('../controllers/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/:id', isAuthenticated, UserController.renderProfile);
router.get('/:id/edit', isAuthenticated, UserController.renderEdit);
router.post('/:id/edit', isAuthenticated, UserController.edit);
module.exports = router;