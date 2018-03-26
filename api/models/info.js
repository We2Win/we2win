'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Info', {
    'post-id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    'I-id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    'I-level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'I-notification': {
      type: DataTypes.TINYINT(1),
      defaultValue: false
    },
    'I-title': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'I-summary': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'I-open-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'I-open-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'I-ammount': {
      type: DataTypes.INTEGER(15),
      allowNull: false
    },
    'I-manager-name': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    'I-manager-contact': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'I-current-duration1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-duration2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-duration3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-duration4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-duration5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-amount1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-amount2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-amount3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-amount4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-current-amount5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-duration1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-duration2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-duration3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-duration4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-duration5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-amount1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-amount2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-amount3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-amount4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-around-amount5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'I-report': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-image': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'I-subImage1': {
      type: DataTypes.STRING,
    },
    'I-subImage2': {
      type: DataTypes.STRING,
    },
    'I-subImage3': {
      type: DataTypes.STRING,
    },
    'I-subImage4': {
      type: DataTypes.STRING,
    },
    'I-subImage5': {
      type: DataTypes.STRING,
    },
    'I-data-click': {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    'I-data-reply': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    'I-data-sns': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    'I-data-scrap': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  Records.associate = function (models) {
    Records.hasMany(models.Comments);
  };

  Records.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Records;
};
