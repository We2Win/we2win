'use strict';

module.exports = (sequelize, DataTypes) => {
  var reply = sequelize.define('Comments', {
    'id': {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    'post-id': {
      type: DataTypes.UUID,
      allowNull: false,
    },
    'commenter-id': {
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
        foreignKey: "post-id"
    });
    reply.belongsTo(models.Meeting, {
        foreignKey: "post-id"
    });
    reply.belongsTo(models.News, {
        foreignKey: "post-id"
    });
    reply.belongsTo(models.Law, {
        foreignKey: "post-id"
    });
    reply.belongsTo(models.Site, {
        foreignKey: "post-id"
    });
  };

  return reply;
};
