'use strict';

module.exports = (sequelize, DataTypes) => {
  var reply = sequelize.define('Mreply', {
    'M-id': {
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
    reply.belongsTo(models.post, {
      foreignKey: "M-id"
    })
  };

  return reply;
};
