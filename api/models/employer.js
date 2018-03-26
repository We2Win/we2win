'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Employer', {
    'post-id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    'R-id': {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
    },
    'R-part-name': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'R-part-description': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-age-start': {
      type: DataTypes.TINYINT(3),
      allowNull: false
    },
    'R-age-end': {
      type: DataTypes.TINYINT(3),
      allowNull: false
    },
    'R-requirement': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'R-personnel': {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    'R-method': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-apply-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'R-apply-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'R-detail': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'R-location-name': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'R-location-address': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'R-manager-name': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    'R-manager-contact': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'R-HP': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'R-CP': {
      type: DataTypes.STRING(20),
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
