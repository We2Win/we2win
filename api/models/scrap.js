'use strict';

module.exports = (sequelize, DataTypes) => {
  var model = sequelize.define('scrap', {
    'id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    'user-id': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'content-id': {
      type: DataTypes.UUID,
      allowNull: false,
    },
    'content-title': {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });

  return model;
};
