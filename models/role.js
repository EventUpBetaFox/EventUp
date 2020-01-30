'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Role extends Model { };
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { sequelize })
  Role.associate = function (models) {
    // associations can be defined here
  };
  return Role;
};