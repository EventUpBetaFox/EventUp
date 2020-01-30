const router = require('express').Router();
const UserController = require('../controllers/user')

router.get('/', UserController.renderProfile);
router.get('/:id/edit', UserController.renderEdit);

module.exports = router;