'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Meeting', {
    'M-id': {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true
    },
    'M-level': {
      type: DataTypes.TINYINT(1),
      allowNull: false,
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
      type: DataTypes.INT(15),
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
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  Records.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Records;
};
