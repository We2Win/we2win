'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('notification', {
        'no-id': {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        'u-id': {
            type: DataTypes.STRING(15),
            allowNull: false,
            references: {
                model: 'users',
                key: 'u-id'
            }
        },
        'date': {
            type: DataTypes.STRING,
            allowNull: false,
        },
        'contents': {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });
    
    Model.associate = function (models) {
    };

    return Model;
};
