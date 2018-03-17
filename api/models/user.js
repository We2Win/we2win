'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('User', {
    'ID': {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    'Password': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'Name': {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    'CP': {
      type: DataTypes.STRING(20),
      allowNull: true,
      // unique: true,
      validate: {
        len: {
          args: [8, 15],
          msg: "휴대번호 길이가 짧습니다."
        },
      }
    },
    'U-level': {
      type: DataTypes.TINYINT(1),
      defaultValue: 0
    },
    'U-level-start': {
      type: DataTypes.DATE,
    },
    'U-level-end': {
      type: DataTypes.DATE
    },
    'U-point': {
      type: DataTypes.DECIMAL(7),
      defaultValue: 0
    },
    'Email': {
      type: DataTypes.STRING(50),
      // allowNull: false,
      // unique: true,
      validate: {
        isEmail: {
          msg: "이메일이 아닙니다."
        }
      }
    },
    'Hope': {
      type: DataTypes.TINYINT(1),
      // allowNull: false
    },
    'Site': {
      type: DataTypes.TINYINT(1),
      // allowNull: false
    },
    'Location1': {
      type: DataTypes.STRING(20),
      // allowNull: false
    },
    'Location2': {
      type: DataTypes.STRING(20),
      // allowNull: false
    },
    'Amount': {
      type: DataTypes.STRING(15),
      // allowNull: false
    },
    'HA': DataTypes.STRING(100),
    'HP': DataTypes.STRING(20),
    'OA': DataTypes.STRING(100),
    'OP': DataTypes.STRING(20),
    'Info-a': DataTypes.TINYINT(1),
    'A-amount': DataTypes.STRING(15),
    'A-sns': DataTypes.TINYINT(1),
    'U-word': DataTypes.STRING(40),
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  // Model.associate = function (models) {
  //   // this.Companies = this.belongsToMany(models.Company, {
  //   //   through: 'UserCompany'
  //   // });
  // };

  // Model.beforeSave(async (user, options) => {
  //   // let err;
  //   // if (user.changed('Password')) {
  //   //   user.Password = bcrypt.hashSync(user.Password);

  //     // let salt, hash
  //     // [err, salt] = await to(bcrypt.genSalt(10));
  //     // if (err) TE(err.message, true);
  //     // [err, hash] = await to(bcrypt.hash(user.Password, salt));
  //     // if (err) TE(err.message, true);

  //     // user.Password = hash;
  //   // }
  // });

  Model.prototype.comparePassword = async function (pw) {
    let err, pass
    if (!this.Password) TE('Password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.Password));
    TE(pw + this.Password + 'done' + pass);
    if (err) TE(err);

    if (!pass) TE('invalid Password');

    return this;
  }

  Model.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer " + jwt.sign({
        user_id: this.ID,
        user_point: this.UPoint,
        user_name: this.Name,
        user_level: this.ULevel,
        user_start: this.ULevelStart,
        user_end: this.ULevelEnd
      },
      CONFIG.jwt_encryption, {
        expiresIn: expiration_time
      });
  };

  Model.prototype.toWeb = function () {
    let JSON = this.toJSON();
    // console.log('this: ', JSON);
    return JSON;
  };

  return Model;
};
