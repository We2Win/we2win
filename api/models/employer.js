'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('employer', {
    'c-id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    'no': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    'part-name': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'part-description': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'age-start': {
      type: DataTypes.TINYINT(3),
      allowNull: false
    },
    'age-end': {
      type: DataTypes.TINYINT(3),
      allowNull: false
    },
    'requirement': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'personnel': {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    'method': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'apply-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'apply-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'detail': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'location-name': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'location-address': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'manager-name': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    'manager-contact': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'hp': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'cp': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  Model.associate = function (models) {
  };

  Model.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Model;
};
