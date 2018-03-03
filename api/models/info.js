'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
var tablename = {
  'User': '`01011803`',
  'Info': '`02011803`',
  'Content': 'sample'
}

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Info', {
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Model.prototype.toWeb = function () {
    let JSON = this.toJSON();
    console.log('this: ', JSON);
    return JSON;
  };

  return Model;
};
