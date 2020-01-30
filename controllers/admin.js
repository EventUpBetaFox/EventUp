class AdminController {
  static renderAdminLogin(req, res) {
    res.render('admin/pages/login')
  }

  static renderAdminDashboard(req, res) {
    res.render('admin/pages/dashboard')
  }

}

module.exports = AdminController