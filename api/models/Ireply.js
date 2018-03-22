'use strict';

module.exports = (sequelize, DataTypes) => {
  var reply = sequelize.define('Ireply', {
    'I-id': {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    'writer': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'content': {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  reply.associate = function (models) {
    reply.belongsTo(models.Info, {
      foreignKey: "I-id"
    })
  };

  return reply;
};
