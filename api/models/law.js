'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Law', {
    'L-id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    'L-level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'L-notification': {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    'L-title': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'L-summary': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'L-url': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'L-file': {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  Records.associate = function (models) {
    Records.hasMany(models.Lreply);
  };

  Records.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Records;
};
