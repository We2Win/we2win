'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('viewList', {
    'v-id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    'c-id': {
      type: DataTypes.UUID,
      allowNull: false
    },
    'c-type': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'u-id': {
      type: DataTypes.STRING,
      allowNull: true
    }
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
