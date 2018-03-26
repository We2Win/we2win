'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Meeting', {
    'post-id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    'M-id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    'M-level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'M-notification': {
      type: DataTypes.TINYINT(1),
      defaultValue: false
    },
    'M-title': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'M-summary': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-image': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-host': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    'M-apply-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'M-apply-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'M-duration-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'M-duration-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'M-location': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'M-personnel': {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    'M-cost': {
      type: DataTypes.INTEGER(15),
      allowNull: false
    },
    'M-detail': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-material': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-data-click': {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    'M-data-reply': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    'M-data-sns': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    'M-data-scrap': {
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
