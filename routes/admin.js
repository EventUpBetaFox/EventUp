const router = require('express').Router()
const { AdminController } = require('../controllers')

router.get('/login', AdminController.renderAdminLogin)
router.get('/', AdminController.renderAdminDashboard)
module.exports = router