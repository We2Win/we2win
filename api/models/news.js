'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('news', {
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
    'main-title': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'main-description': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    'analysis-title': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'analysis-description': {
      type: DataTypes.TEXT,
      allowNull: false
    },
    'master-image': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'slave-image1': {
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
