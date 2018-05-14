'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('report', {
    'c-id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    'no': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    'summary': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'open-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'open-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'ammount': {
      type: DataTypes.INTEGER(15),
      allowNull: false
    },
    'manager-name': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    'manager-contact': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'report': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    'master-image': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'slave-image1': {
      type: DataTypes.STRING,
    },
    'slave-image2': {
      type: DataTypes.STRING,
    },
    'slave-image3': {
      type: DataTypes.STRING,
    },
    'slave-image4': {
      type: DataTypes.STRING,
    },
    'slave-image5': {
      type: DataTypes.STRING,
    },
    'current-duration1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-duration2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-duration3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-duration4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-duration5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-amount1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-amount2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-amount3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-amount4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'current-amount5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-duration1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-duration2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-duration3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-duration4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-duration5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-amount1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-amount2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-amount3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-amount4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'around-amount5': {
      type: DataTypes.STRING(15),
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
