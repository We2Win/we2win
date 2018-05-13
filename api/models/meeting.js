'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Meeting', {
    'c-id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    'no': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    'level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'notification': {
      type: DataTypes.TINYINT(1),
      defaultValue: false
    },
    'title': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'summary': {
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
    'duration-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'duration-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'location': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'personnel': {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    'cost': {
      type: DataTypes.INTEGER(15),
      allowNull: false
    },
    'detail': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'material': {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  // Model.associate = function (models) {
  //   Model.hasMany(models.Comments);
  // };

  Model.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Model;
};
