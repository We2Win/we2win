'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Records = sequelize.define('Law', {
        'L-id': {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        'L-title': {
            type: DataTypes.STRING,
            allowNull: false,
        },
        'L-summary': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'L-url': {
            type: DataTypes.STRING,
            allowNull: false
        },
        // 'L-file': {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
    });

    Records.prototype.toWeb = function () {
        let JSON = this.toJSON();
        console.log('this: ', JSON);
        return JSON;
    };

    return Records;
};
