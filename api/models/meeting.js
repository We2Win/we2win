'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Meeting', {
    'M-id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    'M-title': {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-apply-start': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-apply-end': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-duration-start': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-duration-end': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-location': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-personnel': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'M-cost': {
      type: DataTypes.STRING,
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
