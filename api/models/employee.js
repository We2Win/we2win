'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Employee', {
    'E-id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    'E-name': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'E-sex': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-age': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-CP': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-HP': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-email': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-homepage': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-address': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-part': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-location': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-career': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-achivement': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-networking': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-available-start': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-available-end': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-intro': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-etc': {
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
