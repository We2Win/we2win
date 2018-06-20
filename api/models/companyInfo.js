'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('companyInfo', {
    'type': {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
    },
    'contents': {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  Model.associate = function (models) {};

  return Model;
};
