'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('Site', {
    'post-id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    'S-type': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    'S-id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    'S-level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'S-notification': {
      type: DataTypes.TINYINT(1),
      defaultValue: false
    },
    'S-title': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'S-summary': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    'S-open-start': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'S-open-end': {
      type: DataTypes.DATE,
      allowNull: false
    },
    'S-ammount': {
      type: DataTypes.INTEGER(15),
      allowNull: false
    },
    'S-manager-name': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    'S-manager-contact': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    'S-current-duration1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-duration2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-duration3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-duration4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-duration5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-amount1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-amount2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-amount3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-amount4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-current-amount5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-duration1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-duration2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-duration3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-duration4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-duration5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-amount1': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-amount2': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-amount3': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-amount4': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-around-amount5': {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    'S-report': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-image': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'S-subImage1': {
      type: DataTypes.STRING,
    },
    'S-subImage2': {
      type: DataTypes.STRING,
    },
    'S-subImage3': {
      type: DataTypes.STRING,
    },
    'S-subImage4': {
      type: DataTypes.STRING,
    },
    'S-subImage5': {
      type: DataTypes.STRING,
    },
    'data-click': {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    'data-reply': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    'data-sns': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    'data-scrap': {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  // Records.associate = function (models) {
  //   Records.hasMany(models.Comments);
  // };

  Records.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Records;
};
