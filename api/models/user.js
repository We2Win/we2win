'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('user', {
    'u-id': {
      type: DataTypes.STRING(15),
      primaryKey: true
    },
    'password': {
      type: DataTypes.STRING,
      allowNull: false
    },
    'name': {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    'cp': {
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
    'level': {
      type: DataTypes.STRING(10),
      defaultValue: 'STANDARD'
    },
    'level-start': {
      type: DataTypes.DATE,
    },
    'level-end': {
      type: DataTypes.DATE
    },
    'point': {
      type: DataTypes.DECIMAL(7),
      defaultValue: 0
    },
    'email': {
      type: DataTypes.STRING(50),
      // allowNull: false,
      // unique: true,
      validate: {
        isEmail: {
          msg: "이메일이 아닙니다."
        }
      }
    },
    'hope': {
      type: DataTypes.TINYINT(1),
      // allowNull: false
    },
    'site': {
      type: DataTypes.TINYINT(1),
      // allowNull: false
    },
    'location1': {
      type: DataTypes.STRING(20),
      // allowNull: false
    },
    'location2': {
      type: DataTypes.STRING(20),
      // allowNull: false
    },
    'amount': {
      type: DataTypes.STRING(15),
      // allowNull: false
    },
    'ha': DataTypes.STRING(100),
    'hp': DataTypes.STRING(20),
    'oa': DataTypes.STRING(100),
    'op': DataTypes.STRING(20),
    'info-a': DataTypes.TINYINT(1),
    'asset': DataTypes.STRING(15),
    'sns': DataTypes.TINYINT(1),
    'keyword': DataTypes.STRING(40),
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });

  Model.associate = function (models) {
    Model.hasMany(models.message);
    Model.hasMany(models.notification);
    Model.hasMany(models.infoScrap);
    Model.hasMany(models.siteScrap);
    Model.hasMany(models.schedule);
    Model.hasMany(models.comment);
  };

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
    // console.log('start comparing password');
    if (!this['password']) TE('Password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this['password']));
    // console.log('comparePassword: ', pass? 'passed' : 'failed');
    if (err) TE(err);

    if (!pass) TE('invalid Password');


    return this;
  }

  Model.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return jwt.sign({
        user_id: this['u-id'] || '',
        user_point: this['point'] || '',
        user_name: this['name'] || '',
        user_level: this['level'] || '',
        user_start: this['level-start'] || '',
        user_end: this['level-end'] || '',
        user_location: '#'+(this['location1'] || '')+' #'+(this['location2'] || ''),
        user_keyword: '#'+(this['keyword'] || '')
      },
      CONFIG.jwt_encryption, {
        expiresIn: expiration_time
      });
  };

  Model.prototype.getUser = function (token) {
    let decode = jwt.verify(JWT_ENCRYPTION);

    console.log('decoded: ', decode);
    // if (req.headers && req.headers.authorization) {
    //   var authorization = headers.authorization,
    //     decoded;
    //   try {
    //     decoded = jwt.verify(authorization, secret.secretToken);
    //   } catch (e) {
    //     return res.status(401).send('unauthorized');
    //   }
    //   var userId = decoded.id;
    //   // Fetch the user by id 
    //   User.findOne({ _id: userId }).then(function (user) {
    //     // Do something with the user
    //     return res.send(200);
    //   });
    // }
    // return res.send(500);
  }

  Model.prototype.toWeb = function () {
    let JSON = this.toJSON();
    // console.log('this: ', JSON);
    return JSON;
  };

  return Model;
};
