const bcrypt = require('bcrypt');
const User = require('../models').user;
const authService = require('./../services/AuthService');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
aws.config.loadFromPath('config/configaws.json');
const ses = new aws.SES({
  apiVersion: '2010-12-01'
});



const verify = async function (req, res) {
  var params = {
    EmailAddress: '100kimch@naver.com', /* required */
    TemplateName: 'EmailVerification', /* required */
    // ConfigurationSetName: 'Verifier_we2win'
  };
  ses.sendCustomVerificationEmail(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
  });
}
module.exports.verify = verify;

const sendEmail = async function (req, res) {

  const to = ['kimjihyeong100@we2lab.com, 100kimch@naver.com'];
  const from = 'kimjihyeong100@we2lab.com';

  // this sends the email
  // @todo - add HTML version
  ses.sendEmail({
    Source: from,
    Destination: {
      ToAddresses: to
    },
    Message: {
      Subject: {
        Data: 'A Message To You Rudy'
      },
      Body: {
        Text: {
          Data: 'Stop your messing around',
        }
      }
    }
  }, function (err, data) {
    if (err) throw err;
    console.log('Email sent:');
    console.log(data);
  });
}
module.exports.sendEmail = sendEmail;

const create = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let body = req.body;

  // if (!body.unique_key && !body.email && !body.phone) {
  //     return ReE(res, 'Please enter an email or phone number to register.');
  // } else if (!body.password) {
  //     return ReE(res, 'Please enter a password to register.');
  console.log('body: ', JSON.stringify(body));
  if (!body['u-id']) {
    return ReE(res, '아이디를 입력해주세요.');
  } else if (!body['password']) {
    return ReE(res, '비밀번호를 입력해주세요.');
  } else {
    let err, user;

    body['password'] = bcrypt.hashSync(body['password'], 8);

    // console.log('hi');
    [err, user] = await to(authService.createUser(body));
    // console.log('completed: ', user);

    if (err) return ReE(res, err, 422);
    return ReS(res, {
      message: '회원 가입을 축하합니다.',
      user: JSON.stringify(user),
      // user: user.toWeb(),
      // token: User.getJWT()
    }, 201);
  }
}
module.exports.create = create;

const getUsers = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let params = req.params;

  [err, users] = await to(authService.getUserList(params));

  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Successfully loading user lists.',
    list: JSON.stringify(users),
    // user: user.toWeb(),
    // token: User.getJWT()
  }, 201);
}
module.exports.getUsers = getUsers;

const getUsersByQuery = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let params = req.params;

  [err, users] = await to(authService.searchUser(params.query));

  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Successfully loading user lists.',
    list: JSON.stringify(users),
    // user: user.toWeb(),
    // token: User.getJWT()
  }, 201);
}
module.exports.getUsersByQuery = getUsersByQuery;

const getDashBoardData = async function (req, res) {
  let ret = {};
  let uSt, uPr, uPl;
  [err, uSt] = await to(User.count({
    where: {
      'level': 'STANDARD'
    }
  }));
  [err, uPr] = await to(User.count({
    where: {
      'level': 'PREMIUM'
    }
  }));
  [err, uPl] = await to(User.count({
    where: {
      'level': 'PLATINUM'
    }
  }));

  ret['users'] = {
    'standard': uSt,
    'premium': uPr,
    'platinum': uPl
  }

  if (err) return ReE(res, 'error occured trying to get data');

  return ReS(res, ret);

}
module.exports.getDashBoardData = getDashBoardData;

const update = async function (req, res) {
  let err, user, data
  user = req.user;
  data = req.body;
  user.set(data);

  [err, user] = await to(user.save());
  if (err) {
    if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
    return ReE(res, err);
  }
  return ReS(res, {
    message: 'Updated User: ' + user.email
  });
}
module.exports.update = update;

const editUser = async function (req, res) {
  console.log('edit started.');
  let userInfo;
  if (req.headers['authorization']) {
    userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);
  } else {
    userInfo = false;
  }

  res.setHeader('Content-Type', 'application/json');

  console.log('userInfo: ', userInfo);
  console.log('req.body: ', req.body);

  if (req.body['password']) {
    req.body['password'] = bcrypt.hashSync(req.body['password'], 8);
  }

  User.findOne({
      where: {
        'u-id': userInfo['user_id']
      }
    })
    .then(user => {
      console.log('user: ', user, req.body);
      user.update(req.body, {
        where: {
          'u-id': userInfo['user_id']
        }
      }).then(data => {
        return ReS(res, {
          message: 'Edited User',
          data: data
        }, 204);
      });
    });
}
module.exports.editUser = editUser;

const removeUser = async function (req, res) {
  let userInfo;
  if (req.headers['authorization']) {
    userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);
  } else {
    userInfo = false;
  }

  User.findOne({
    where: {
      'u-id': userInfo['user_id']
    },
    attributes: ['level']
  }).then(data => {
    console.log('user Data on removeUser(): ', data);
    if (data['level'] !== 'ADMIN') {
      console.log('REQUEST FAILED: Not an administrator.');
      return ReS(res, {
        message: 'Not an administrator'
      }, 422);
    }
  })

  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    User.findOne({
        where: {
          'u-id': req.params.id
        }
      })
      .then(data => {
        console.log('data');
        data.destroy();
        // [err, user] = await to(data.destroy());
        // if (err) return ReE(res, 'error occured trying to delete user');

        return ReS(res, {
          message: 'Deleted User'
        }, 204);
      });
  }
}
module.exports.removeUser = removeUser;

const login = async function (req, res) {
  const body = req.body;
  let err, user;

  console.log(req.body);

  [err, user] = await to(authService.authUser(req.body));
  if (err) return ReE(res, err, 422);

  console.log('login successful: ', user);

  return ReS(res, {
    token: user.getJWT(),
    user: user.toWeb()
  });
}
module.exports.login = login;

const loginWithKakao = async function (req, res) {
  const body = req.body;
  let err, user;

  console.log(req.body);

  [err, user] = await to(authService.authUserWithKakao(req.body));
  if (err) return ReE(res, err, 422);

  console.log('loginWithKakao successful: ', user);

  return ReS(res, {
    token: user.getJWT(),
    user: user.toWeb()
  });
}
module.exports.loginWithKakao = loginWithKakao;

const getSchedule = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  let uId;
  if (userInfo['user_id']) {
    uId = userInfo['user_id'];
  } else if (userInfo['u-id']) {
    uId = userInfo['u-id'];
  }

  [err, contents] = await to(authService.getSchedule(req.params.id, uId));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Schedule Lists.',
    contents: contents
  });
}
module.exports.getSchedule = getSchedule;

const addSchedule = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  let uId;
  if (userInfo['user_id']) {
    uId = userInfo['user_id'];
  } else if (userInfo['u-id']) {
    uId = userInfo['u-id'];
  }

  [err, user] = await to(authService.addSchedule(uId, req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Done Scheduleing'
  });
}
module.exports.addSchedule = addSchedule;

const removeSchedule = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  let uId;
  if (userInfo['user_id']) {
    uId = userInfo['user_id'];
  } else if (userInfo['u-id']) {
    uId = userInfo['u-id'];
  }

  [err, user] = await to(authService.removeSchedule(uId, req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Done removing Schedule'
  });
}
module.exports.removeSchedule = removeSchedule;

const hasBookmark = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  let uId;
  if (userInfo['user_id']) {
    uId = userInfo['user_id'];
  } else if (userInfo['u-id']) {
    uId = userInfo['u-id'];
  }

  [err, contents] = await to(authService.hasBookmark(req.params.id, uId));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Bookmark Lists.',
    contents: contents
  });
}
module.exports.hasBookmark = hasBookmark;

const getBookmark = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  let uId;
  if (userInfo['user_id']) {
    uId = userInfo['user_id'];
  } else if (userInfo['u-id']) {
    uId = userInfo['u-id'];
  }

  [err, contents] = await to(authService.getBookmark(req.params.id, uId));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Bookmark Lists.',
    contents: contents
  });
}
module.exports.getBookmark = getBookmark;

const addBookmark = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  let uId;
  if (userInfo['user_id']) {
    uId = userInfo['user_id'];
  } else if (userInfo['u-id']) {
    uId = userInfo['u-id'];
  }

  [err, user] = await to(authService.addBookmark(uId, req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Done Bookmarking'
  });
}
module.exports.addBookmark = addBookmark;

const removeBookmark = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  let uId;
  if (userInfo['user_id']) {
    uId = userInfo['user_id'];
  } else if (userInfo['u-id']) {
    uId = userInfo['u-id'];
  }

  [err, user] = await to(authService.removeBookmark(uId, req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Done removing Bookmark'
  });
}
module.exports.removeBookmark = removeBookmark;

const detailedInfo = async function (req, res) {
  const body = req.body;
  let err, user;

  console.log('detailedInfo: ', req.body);
  console.log('detailedInfo: ', req.headers);

  [err, user] = await to(authService.getUserInfo(req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    user: user.toWeb()
  });
}
module.exports.detailedInfo = detailedInfo;

const hasId = async function (req, res) {
  const body = req.body;
  let err, user;

  console.log('ID from hasId(): ', JSON.stringify(body));

  [err, hasUser] = await to(authService.hasUser(req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    'available': !hasUser
  });
}
module.exports.hasId = hasId;

const checkUser = async function (req, res) {
  const body = req.body;

  [err, hasUser] = await to(authService.hasUser(req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    'available': !hasUser
  });
}
