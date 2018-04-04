'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Law', {
    'post-id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    'L-id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    'L-level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'L-notification': {
      type: DataTypes.TINYINT(1),
      defaultValue: false
    },
    'L-title': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'L-summary': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'L-file': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'data-click': {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    'data-reply': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    'data-sns': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    'data-scrap': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  // Records.associate = function (models) {
  //   Records.hasMany(models.Comments);
  // };

  Records.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Records;
};
