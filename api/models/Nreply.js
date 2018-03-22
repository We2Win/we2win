'use strict';

module.exports = (sequelize, DataTypes) => {
  var reply = sequelize.define('Nreply', {
    'N-id': {
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
      foreignKey: "N-id"
    })
  };

  return reply;
};
