'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Category extends Model { };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { sequelize })
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Event, { foreignKey: 'id' })
    Category.belongsToMany(models.User, {
      through: models.CategoryUser,
      foreignKey: 'category_id'
    })
  };
  return Category;
};