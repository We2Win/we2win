'use strict';

module.exports = (sequelize, DataTypes) => {
  var reply = sequelize.define('Lreply', {
    'L-id': {
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
      foreignKey: "L-id"
    })
  };

  return reply;
};
