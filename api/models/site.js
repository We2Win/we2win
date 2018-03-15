'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Site', {
    'S-id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    'S-title': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'S-summary': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-open-start': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-open-end': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-ammount': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-manager-name': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-manager-contact': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-current-size': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-current-amount': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-around-size': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-around-amount': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-report': {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 'S-image': {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
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
