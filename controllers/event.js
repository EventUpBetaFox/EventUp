const { Event, Menu, Category, User, EventUser } = require('../models')
const EventHelper = require('../helpers/event')
const { Op } = require('sequelize')

class EventController {

  static joinEvent(req, res) {
    const id = +req.params.eventId
    const user = req.session.user
    EventUser.create({
      user_id: user.id,
      event_id: id,
      status: 'joined'
    })
      .then(result => res.redirect('/events'))
      .catch(err => res.send(err))
  }

  static findAllEvents(req, res) {
    Event.findAll({
      include: [Category, User],
      where: {
        [Op.and]: [
          {
            is_approved: true
          },
          {
            status: false
          }
        ]
      },
      order: [
        ['id', 'DESC']
      ]
    })
      .then(events => {
        const userSession = req.session.user
        const formatDate = EventHelper.formatDate
        const isJoined = EventHelper.isJoined
        res.render('events', { isJoined, formatDate, userSession, title: 'Events', keyword: '', events })
      })
      .catch(err => res.send(err))
  }

  static getAll(req, res) {
    Promise.all([
      Menu.findAll({
        order: [
          ['id', 'ASC']
        ]
      }),
      Event.findAll({
        include: [Category],
        where: {
          is_approved: true
        },
        order: [
          ['id', 'DESC']
        ]
      })
    ])
      .then(result => {
        const events = result[1]
        const menus = result[0]
        const formatDate = EventHelper.formatDate
        const user = req.session.user
        res.render('admin/pages/events', { user, formatDate, menus, events })
      })
      .catch(err => res.send(err))
  }

  static pendingEvents(req, res) {
    Promise.all([
      Menu.findAll({
        order: [
          ['id', 'ASC']
        ]
      }),
      Event.findAll({
        include: [Category],
        where: {
          [Op.and]: [
            {
              is_approved: null
            },
            {
              status: false
            }
          ]
        },
        order: [
          ['id', 'DESC']
        ]
      })
    ])
      .then(result => {
        const events = result[1]
        const menus = result[0]
        const formatDate = EventHelper.formatDate
        const user = req.session.user
        res.render('admin/pages/dashboard', { user, formatDate, menus, events })
      })
      .catch(err => res.send(err))
  }

  static renderFormEventAdd(req, res) {
    Promise.all([
      Menu.findAll({
        order: [
          ['id', 'ASC']
        ]
      }),
      Category.findAll()
    ])
      .then(result => {
        const menus = result[0]
        const categories = result[1]
        const parseDate = EventHelper.parseDate
        const user = req.session.user
        res.render('admin/pages/event-add', { user, min: parseDate(new Date()), errors: '', input: '', menus, categories, pages: 'Add Event' })
      })
      .catch(err => res.send(err))
  }

  static renderEditForm(req, res) {
    const id = +req.params.eventId
    Promise.all([
      Menu.findAll({
        order: [
          ['id', 'ASC']
        ]
      }),
      Category.findAll(),
      Event.findOne({
        where: {
          id
        }
      })
    ])
      .then(result => {
        const menus = result[0]
        const categories = result[1]
        const input = result[2]
        const parseDate = EventHelper.parseDate
        const status = [
          {
            name: 'Open',
            value: false
          },
          {
            name: 'Closed',
            value: true
          }
        ]
        const user = req.session.user
        res.render('admin/pages/event-edit', { user, status, min: parseDate(new Date()), parseDate, errors: '', input, menus, categories, pages: 'Add Event' })
      })
      .catch(err => res.send(err))
  }

  static updateEvent(req, res) {
    const id = +req.params.eventId
    const parameters = {
      name: req.body.name,
      location: req.body.location,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      category_id: +req.body.category_id,
      status: req.body.status
    }
    if (new Date(parameters.start_date).setHours(0, 0, 0, 0) > new Date(parameters.end_date).setHours(0, 0, 0, 0)) {
      const errors = {}
      errors['date'] = 'Start date should be less than to end date'
      Promise.all([
        Menu.findAll({
          order: [
            ['id', 'ASC']
          ]
        }),
        Category.findAll()
      ])
        .then(result => {
          const menus = result[0]
          const categories = result[1]
          const user = req.session.user
          const parseDate = EventHelper.parseDate
          const status = [
            {
              name: 'Open',
              value: false
            },
            {
              name: 'Closed',
              value: true
            }
          ]
          parameters.id = id
          res.render('admin/pages/event-edit', { status, user, min: parseDate(new Date()), parseDate, errors, input: parameters, menus, categories, pages: 'Edit Event' })
        })
        .catch(err => {
          console.log(err)
          res.send(err)
        })
    } else {
      Event.update(parameters, {
        where: {
          id
        }
      })
        .then((event) => {
          res.redirect('/admin/events')
        })
        .catch(err => {
          res.send(err)
        })
    }
  }

  static addEvent(req, res) {
    const parameters = {
      name: req.body.name,
      location: req.body.location,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      category_id: +req.body.category_id,
      status: req.body.status,
      is_approved: req.body.is_approved ? req.body.is_approved : true
    }

    if (new Date(parameters.start_date).setHours(0, 0, 0, 0) > new Date(parameters.end_date).setHours(0, 0, 0, 0)) {
      const errors = {}
      errors['date'] = 'Start date should be less than to end date'
      Promise.all([
        Menu.findAll({
          order: [
            ['id', 'ASC']
          ]
        }),
        Category.findAll()
      ])
        .then(result => {
          const menus = result[0]
          const categories = result[1]
          const user = req.session.user
          const parseDate = EventHelper.parseDate
          res.render('admin/pages/event-add', { errors, user, min: parseDate(new Date()), input: parameters, menus, categories, pages: 'Add Event' })
        })
        .catch(err => res.send(err))
    } else {
      Event.create(parameters)
        .then(event => {
          res.redirect('/admin/events')
        })
        .catch((err) => {
          console.log(err)
          res.send(err)
        })
    }
  }

  static approvalEvent(req, res) {
    const type = req.params.action
    const id = req.params.eventId
    let is_approved = false
    if (type === 'approve') {
      is_approved = true
    }
    const parameters = {
      is_approved
    }
    Event.update(parameters, {
      where: {
        id
      }
    })
      .then(result => res.redirect('/admin'))
      .catch(err => res.send(err))
  }

  static findDeclinedEvents(req, res) {
    Promise.all([
      Menu.findAll({
        order: [
          ['id', 'ASC']
        ]
      }),
      Event.findAll({
        include: [Category],
        where: {
          is_approved: false
        },
        order: [
          ['id', 'DESC']
        ]
      })
    ])
      .then(result => {
        const events = result[1]
        const menus = result[0]
        const formatDate = EventHelper.formatDate
        const user = req.session.user
        res.render('admin/pages/declined-events', { user, formatDate, menus, events })
      })
      .catch(err => res.send(err))
  }

  static deleteDeclinedEvent(req, res) {
    const id = +req.params.id

    EventUser.destroy({
      where: {
        event_id: id
      }
    }).then((result) => {
      Event.destroy({
        where: {
          id
        }
      })
        .then((result) => res.redirect('/admin/events/decline'))
        .catch(err => res.send(err))
    })
      .catch(err => res.send(err))
  }

  static findEventByUserId(req, res) {
    const user = req.session.user
    const type = req.params.type
    EventUser.findAll({
      include: [{
        model: Event,
        include: [Category]
      }],
      where: {
        [Op.and]: [
          {
            user_id: user.id
          },
          {
            status: type
          }
        ]
      },
      order: [
        ['id', 'DESC']
      ]
    })
      .then((events) => {
        let title = ''
        if (type === 'joined') {
          title = 'Joined Events'
        } else {
          title = 'Created Events'
        }
        const userSession = req.session.user
        res.render('user/pages/events', { type, formatDate: EventHelper.formatDate, userSession, events, title, keyword: '' })
      })
      .catch(err => {
        res.send(err)
      })
  }

}

module.exports = EventController