'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    var Records = sequelize.define('News', {
        'N-id': {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        'N-title': {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // 'N-image': {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        'N-sub-title': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'N-sub-description': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'N-analysis-title': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'N-analysis-description': {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Records.prototype.toWeb = function () {
        let JSON = this.toJSON();
        console.log('this: ', JSON);
        return JSON;
    };

    return Records;
};
