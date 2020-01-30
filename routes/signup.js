const router = require('express').Router();
const UserController = require('../controllers/user')

router.get('/', UserController.renderSignUpForm)
router.post('/', UserController.createUser)

module.exports = router