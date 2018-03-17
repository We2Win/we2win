'use strict';

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('News', {
    'N-id': {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true
    },
    'N-level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'N-title': {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    'N-sub-title': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'N-sub-description': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'N-image': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'N-analysis-title': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'N-analysis-description': {
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
