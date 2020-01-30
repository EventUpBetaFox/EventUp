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
            .then(user => {
              if (user) {
                if (this.username == user.username) {
                  next()
                } else {
                  next('username sudah terdaftar')
                }
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
            .then(user => {
              if (user) {
                if (this.email == user.email) {
                  next()
                } else {
                  next('email sudah terdaftar')
                }
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
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        if (!user.last_name) {
          user.last_name = user.first_name
        }
        user.password = bcrypt.hashSync(user.password, salt);
        user.role_id = 1
      },
      beforeBulkUpdate: (user, options) => {
        if (!user.attributes.last_name) {
          user.attributes.last_name = user.attributes.first_name
        }
        user.attributes.password = bcrypt.hashSync(user.attributes.password, salt)
      }
    }, sequelize
  })
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Event, { through: models.EventUser, foreignKey: 'user_id', otherKey: 'event_id' })
    User.belongsToMany(models.Category, {
      through: models.CategoryUser,
      foreignKey: 'user_id'
    })
    User.belongsTo(models.Role, { foreignKey: 'role_id' })
  };
  return User;
};