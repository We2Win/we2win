'use strict';

module.exports = (sequelize, DataTypes) => {
  var comments = sequelize.define('Comments', {
    'id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    'post-id': {
      type: DataTypes.UUID,
      allowNull: false,
    },
    'commenter-id': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'contents': {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return comments;
};
