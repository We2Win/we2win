'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('contentsList', {
        'c-id': {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        'c-type': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'title': {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        'level': {
            type: DataTypes.STRING(10),
            defaultValue: 'STANDARD'
        },
        's-type': {
            type: DataTypes.STRING(10),
            defaultValue: ''
        },
        'master-image': {
            type: DataTypes.STRING,
        },
        'c-click': {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        'c-sns': {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        'c-scrap': {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        'c-comments': {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        'c-schedule': {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });

    Model.associate = function (models) {
        Model.hasMany(models.comment);
    };

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
