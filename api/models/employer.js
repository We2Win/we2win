'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Employer', {
    'R-id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    'R-part-name': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'R-part-description': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-age-start': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-age-end': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-requirement': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-personnel': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-method': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-apply-start': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-apply-end': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-detail': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-location-name': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-location-address': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-manager-name': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-manager-contact': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-HP': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-CP': {
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
