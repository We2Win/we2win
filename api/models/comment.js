'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('comment', {
    'co-id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    'u-id': {
      type: DataTypes.STRING(15),
      allowNull: false,
      references: {
          model: 'users',
          key: 'u-id'
      }
    },
    'c-id': {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: 'contentsLists',
      //   key: 'c-id'
      // }
    },
    'date': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'contents': {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  Model.associate = function (models) {};

  return Model;
};
