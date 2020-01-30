'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Event extends Model { }
  Event.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    is_approved: DataTypes.BOOLEAN
  }, { sequelize })
  Event.associate = function (models) {
    // associations can be defined here
  };
  return Event;
};