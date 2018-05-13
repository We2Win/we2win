'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('news', {
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
    'main-title': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'main-description': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'analysis-title': {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'analysis-description': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'master-image': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'slave-image': {
      type: DataTypes.STRING,
      allowNull: false
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
