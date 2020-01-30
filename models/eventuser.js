'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class EventUser extends Model { }
  EventUser.init({
    event_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, { sequelize })
  EventUser.associate = function (models) {
    // associations can be defined here
    EventUser.belongsTo(models.Event, { foreignKey: 'event_id' })
  };
  return EventUser;
};