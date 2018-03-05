'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Meeting', {
    'I-id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    'I-title': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'I-summary': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-open-start': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-open-end': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-ammount': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-manager-name': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-manager-contact': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-size': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-amount': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-size': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-amount': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-report': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-image': {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Records.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Records;
};
