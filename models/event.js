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
    is_approved: DataTypes.BOOLEAN,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: (event, options) => {
        event.status = false
      }
    }
  })
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsTo(models.Category, { foreignKey: 'category_id' })
    Event.belongsToMany(models.User, { through: models.EventUser, foreignKey: 'event_id', otherKey: 'user_id' })
  };
  return Event;
};