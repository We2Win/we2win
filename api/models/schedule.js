'use strict';

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('schedule', {
        'sc-id': {
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
        'c-id': {
            type: DataTypes.UUID,
            allowNull: false,
        },
        'date': {
            type: DataTypes.STRING,
            allowNull: false,
        },
        'title': {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });
    
    Model.associate = function (models) {
    };

    return Model;
};
