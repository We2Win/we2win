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
    'I-current-size1': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-size2': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-size3': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-size4': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-size5': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-amount1': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-amount2': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-amount3': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-amount4': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-current-amount5': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-size1': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-size2': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-size3': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-size4': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-size5': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-amount1': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-amount2': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-amount3': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-amount4': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-around-amount5': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-report': {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 'I-image': {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
  });

  Records.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Records;
};
