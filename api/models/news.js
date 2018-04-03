'use strict';

module.exports = (sequelize, DataTypes) => {
  var Records = sequelize.define('News', {
    'post-id': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    'N-id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    'N-level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'N-notification': {
      type: DataTypes.TINYINT(1),
      defaultValue: false
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
