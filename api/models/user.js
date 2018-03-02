'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');


module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('User', {
    ID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Name: DataTypes.STRING,
    // CP: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   unique: true,
    //   validate: {
    //     len: {
    //       args: [7, 20],
    //       msg: "휴대번호 길이가 짧습니다."
    //     },
    //     isNumeric: {
    //       msg: "유효한 번호가 아닙니다."
    //     }
    //   }
    // },
    // Hope: DataTypes.INTEGER,
    // Site: DataTypes.INTEGER,
    // Location: DataTypes.STRING,
    // Amount: DataTypes.INTEGER,
    // OP: DataTypes.INTEGER,
    // HP: DataTypes.INTEGER,
    // OA: DataTypes.STRING,
    // HA: DataTypes.STRING,
    // InfoA: DataTypes.INTEGER,
    // AAmount: DataTypes.INTEGER,
    // ASns: DataTypes.INTEGER,
    // UWord: DataTypes.STRING,
    // Email: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   unique: true,
    //   validate: {
    //     isEmail: {
    //       msg: "이메일이 아닙니다."
    //     }
    //   }
    // },
  });

  Model.associate = function (models) {
    // this.Companies = this.belongsToMany(models.Company, {
    //   through: 'UserCompany'
    // });
  };

  Model.beforeSave(async (user, options) => {
    let err;
    if (user.changed('password')) {
      let salt, hash
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);
      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  Model.prototype.comparePassword = async function (pw) {
    let err, pass
    if (!this.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE('invalid password');

    return this;
  }

  Model.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer " + jwt.sign({
        user_id: this.id
      },
      CONFIG.jwt_encryption, {
        expiresIn: expiration_time
      });
  };

  Model.prototype.toWeb = function (pw) {
    let json = pw.toJSON();
    return json;
  };

  return Model;
};
