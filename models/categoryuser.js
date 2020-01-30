'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class CategoryUser extends Model { }
  CategoryUser.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, { sequelize })
  CategoryUser.associate = function (models) {
    // associations can be defined here
  };
  return CategoryUser;
};