'use strict';

module.exports = (sequelize, DataTypes) => {
    var data = sequelize.define('Uscrap', {
        // 'ID': {
        //     type: DataTypes.STRING(15),
        //     allowNull: false,
        // },
        'number': {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        'content': {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    data.associate = function (models) {
        data.belongsTo(models.User, {
            foreignKey: "ID"
        })
    };

    return data;
};
