'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('employee', {
    'c-id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    'no': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    'name': {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    'sex': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    'age': {
      type: DataTypes.TINYINT(3),
      allowNull: false
    },
    'cp': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'hp': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'email': {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "이메일이 아닙니다."
        }
      }
    },
    'homepage': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'address': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'part': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'location': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'career': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'achivement': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'networking': {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    'available-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'available-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'intro': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'etc': {
      type: DataTypes.STRING,
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
