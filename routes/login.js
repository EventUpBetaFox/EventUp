const router = require('express').Router();
const UserController = require('../controllers/user')

router.get('/', UserController.renderLogin);
router.post('/', UserController.login);

module.exports = router;