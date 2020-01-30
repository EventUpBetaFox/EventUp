const { User, Category, CategoryUser, Role } = require('../models/index');
const { Op } = require("sequelize");
var bcrypt = require('bcryptjs');

class UserController {
    static createUser(req, res) {
        let input = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role_id: req.body.role_id
        };
        let category = req.body.category
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
                    res.send('password salah')
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
                    password: user.password
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
}

module.exports = UserController