'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Menu extends Model { }
  Menu.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, { sequelize })
  Menu.associate = function (models) {
    // associations can be defined here
  };
  return Menu;
};