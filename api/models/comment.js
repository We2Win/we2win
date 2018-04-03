'use strict';

module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('Comment', {
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
  },{
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  return comment;
};
