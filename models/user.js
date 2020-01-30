'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model { };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING
  }, { sequelize })
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Event, { through: models.EventUser, foreignKey: 'user_id', otherKey: 'event_id' })
    User.belongsToMany(models.Category, {
      through: models.CategoryUser,
      foreignKey: 'user_id'
    })
  };
  return User;
};