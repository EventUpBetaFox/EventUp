const { User, Category, CategoryUser, Role, Event, EventUser } = require('../models/index');
const { Op } = require("sequelize");
var bcrypt = require('bcryptjs');

class UserController {
    static createUser(req, res) {
        let input = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role_id: req.body.role_id
        };
        let category = req.body.category

        User.findOne({
            where: {
                [Op.or]: [
                    {
                        username: input.username
                    },
                    {
                        email: input.email
                    }
                ]
            }
        })
            .then(user => {
                if (user) {
                    let error = 'Username or email is already taken'
                    res.redirect('/signup?err=' + error)
                } else {
                    User.create(input)
                        .then(newUser => {
                            if (Array.isArray(category)) {
                                let bulk = []
                                category.forEach(el => {
                                    let temp = {
                                        user_id: newUser.id,
                                        category_id: el
                                    }
                                    bulk.push(temp)
                                })
                                CategoryUser.bulkCreate(bulk)
                                    .then(_ => {
                                        res.redirect('/')
                                    })
                            } else {
                                let newCategoryUser = {
                                    user_id: newUser.id,
                                    category_id: req.body.category
                                }
                                CategoryUser.create(newCategoryUser)
                                    .then(_ => {
                                        res.redirect('/')
                                    })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            let error = err.errors[0].message;
                            res.redirect(`/signup?err=${error}`);
                        })
                }
            })
            .catch(err => {
                res.send(err)
            })


    }
    static renderSignUpForm(req, res) {
        let error = req.query.err;
        Category.findAll()
            .then(categories => {
                res.render('signup', { categories, error })
            })
            .catch(err => {
                console.log(err)
            })
    }
    static renderLogin(req, res) {
        let error = req.query.err;
        res.render('login', { error });
    }
    static login(req, res) {
        User.findOne({
            include: [Role],
            where: {
                [Op.or]: [{ username: req.body.emailOrUsername }, { email: req.body.emailOrUsername }]
            }
        })
            .then(user => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.user = {
                        username: user.username,
                        role: user.Role.name,
                        id: user.id,
                        email: user.email
                    }
                    if (user.Role.name === 'User') {
                        res.redirect('/')
                    } else {
                        res.redirect('/admin')
                    }
                } else {
                    let error = 'Password salah'
                    res.redirect(`/login?err=${error}`);
                }
            })
            .catch(err => {
                console.log(err)
                let error = 'email/username tidak terdaftar'
                res.redirect(`/login?err=${error}`);
            })
    }
    static renderEdit(req, res) {
        let error = req.query.err;
        User.findOne({
            where: {
                id: req.params.id
            },
            include: [Category]
        })
            .then(user => {
                Category.findAll()
                    .then(categories => {
                        res.render('edit', { categories, user, error })
                    })
            })
    }
    static edit(req, res) {

        User.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                let update = {
                    username: req.body.username,
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: user.password,
                }
                User.update(update, {
                    where: {
                        id: req.params.id
                    }
                })
                    .then(_ => {
                        CategoryUser.destroy({
                            where: {
                                user_id: req.params.id
                            }
                        })
                            .then(_ => {
                                let category = req.body.category;
                                if (Array.isArray(category)) {
                                    let bulk = []
                                    category.forEach(el => {
                                        let temp = {
                                            user_id: req.params.id,
                                            category_id: el
                                        }
                                        bulk.push(temp)
                                    })
                                    CategoryUser.bulkCreate(bulk)
                                        .then(_ => {
                                            res.redirect(`/profile/${req.params.id}`)
                                        })
                                } else {
                                    let newCategoryUser = {
                                        user_id: req.params.id,
                                        category_id: req.body.category
                                    }
                                    CategoryUser.create(newCategoryUser)
                                        .then(_ => {
                                            res.redirect(`/profile/${req.params.id}`)
                                        })
                                }
                            })
                    })
                    .catch(err => {
                        let error = err.errors[0].message;
                        res.redirect(`/profile/${id}/edit?err=${error}`);
                    })
            })
    }
    static renderProfile(req, res) {
        let id = req.params.id;
        User.findOne({
            where: {
                id: id
            },
            include: [Category]
        })
            .then(user => {
                res.render('profile', { user })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static renderCreateEvent(req, res) {
        Category.findAll()
            .then(categories => {
                res.render('createEvent', { categories })
            })
    }
    static createEvent(req, res) {
        let input = {
            name: req.body.name,
            location: req.body.location,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            category_id: +req.body.category_id,
            is_approved: null
        }
        Event.create(input)
            .then(newEvent => {
                let newEventUser = {
                    event_id: newEvent.id,
                    user_id: req.session.user.id,
                    status: 'created'
                }
                EventUser.create(newEventUser)
                    .then(_ => {
                        res.redirect('/events')
                    })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = UserController