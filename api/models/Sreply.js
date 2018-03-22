'use strict';

module.exports = (sequelize, DataTypes) => {
    var reply = sequelize.define('Sreply', {
        'S-id': {
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
        reply.belongsTo(models.Site, {
            foreignKey: "S-id"
        })
    };

    return reply;
};
