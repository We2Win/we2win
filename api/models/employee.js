'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Employee', {
    'post-id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    'E-id': {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
    },
    'E-name': {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    'E-sex': {
      type: DataTypes.TINYINT(1),
      allowNull: false
    },
    'E-age': {
      type: DataTypes.TINYINT(3),
      allowNull: false
    },
    'E-CP': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'E-HP': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'E-email': {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "이메일이 아닙니다."
        }
      }
    },
    'E-homepage': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'E-address': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'E-part': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'E-location': {
      type: DataTypes.STRING(100),
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
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    'E-available-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'E-available-end': {
      type: DataTypes.DATE,
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
