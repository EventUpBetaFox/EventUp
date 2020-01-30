const router = require('express').Router();
const UserController = require('../controllers/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', isAuthenticated, UserController.renderProfile);
router.get('/:id/edit', isAuthenticated, UserController.renderEdit);

module.exports = router;