'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Site', {
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
      type: DataTypes.STRING(100),
      allowNull: false
    },
    's-type': {
      type: DataTypes.STRING(10),
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
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'report': {
      type: DataTypes.STRING,
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
    },
    'current-duration2': {
      type: DataTypes.STRING(15),
    },
    'current-duration3': {
      type: DataTypes.STRING(15),
    },
    'current-duration4': {
      type: DataTypes.STRING(15),
    },
    'current-duration5': {
      type: DataTypes.STRING(15),
    },
    'current-amount1': {
      type: DataTypes.STRING(15),
    },
    'current-amount2': {
      type: DataTypes.STRING(15),
    },
    'current-amount3': {
      type: DataTypes.STRING(15),
    },
    'current-amount4': {
      type: DataTypes.STRING(15),
    },
    'current-amount5': {
      type: DataTypes.STRING(15),
    },
    'around-duration1': {
      type: DataTypes.STRING(15),
    },
    'around-duration2': {
      type: DataTypes.STRING(15),
    },
    'around-duration3': {
      type: DataTypes.STRING(15),
    },
    'around-duration4': {
      type: DataTypes.STRING(15),
    },
    'around-duration5': {
      type: DataTypes.STRING(15),
    },
    'around-amount1': {
      type: DataTypes.STRING(15),
    },
    'around-amount2': {
      type: DataTypes.STRING(15),
    },
    'around-amount3': {
      type: DataTypes.STRING(15),
    },
    'around-amount4': {
      type: DataTypes.STRING(15),
    },
    'around-amount5': {
      type: DataTypes.STRING(15),
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
