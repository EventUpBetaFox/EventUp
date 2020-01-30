const router = require('express').Router();
const UserController = require('../controllers/user')

router.get('/:id', UserController.renderProfile);
router.get('/:id/edit', UserController.renderEdit);
router.post('/:id/edit', UserController.edit);

module.exports = router;