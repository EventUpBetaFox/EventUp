'use strict';

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// const UserHelper = require('../helpers/UserHelper')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model { };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isDuplicate(value, next) {
          User.findOne({
            where: {
              username: value
            }
          })
            .then(res => {
              if (res) {
                next('username sudah terdaftar')
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email tidak valid'
        },
        isDuplicate(value, next) {
          User.findOne({
            where: {
              email: value
            }
          })
            .then(res => {
              if (res) {
                next('email sudah terdaftar')
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeBulkUpdate: (user, options) => {
        user.attributes.password = bcrypt.hashSync(user.attributes.password, salt)
      }
    }, sequelize
  })
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Category, {
      through: models.CategoryUser,
      foreignKey: 'user_id'
    })
  };
  return User;
};