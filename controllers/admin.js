const { Menu } = require('../models')

class AdminController {

  static renderAdminDashboard(req, res) {
    Menu.findAll()
      .then(menus => {
        res.render('admin/pages/dashboard', { menus })
      }).catch(err => res.send(err))
  }

}

module.exports = AdminController