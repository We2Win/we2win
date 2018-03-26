'use strict';

module.exports = (sequelize, DataTypes) => {
  var comments = sequelize.define('Comments', {
    'id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    'post-id': {
      type: DataTypes.UUID,
      allowNull: false,
    },
    'commenter-id': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'content': {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return comments;
};
