const bcrypt = require('bcrypt');
const User = require('../models').user;
const authService = require('./../services/AuthService');
const jwt = require('jsonwebtoken');

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

const get = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let body = req.body;

  console.log('body: ', JSON.stringify(body));

  [err, users] = await to(authService.getUserList(body));

  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Successfully loading user lists.',
    list: JSON.stringify(users),
    // user: user.toWeb(),
    // token: User.getJWT()
  }, 201);
}
module.exports.get = get;

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

const remove = async function (req, res) {
  // let user, err;
  // user = req.user;

  // [err, user] = await to(user.destroy());
  // if (err) return ReE(res, 'error occured trying to delete user');

  // return ReS(res, {
  //   message: 'Deleted User'
  // }, 204);
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    User.findOne({
        where: {
          'ID': req.params.id
        }
      })
      .then((data) => {
        data.destroy();
        // [err, user] = await to(data.destroy());
        // if (err) return ReE(res, 'error occured trying to delete user');

        return ReS(res, {
          message: 'Deleted User'
        }, 204);
      });
  }
}
module.exports.remove = remove;

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

const getBookmark = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  [err, contents] = await to(authService.getBookmark(req.params.id, userInfo['user_id']));
  if (err) return ReE(res, err, 422);
  
  return ReS(res, {
    message: 'Done Bookmarking',
    contents: contents
  });
}
module.exports.getBookmark = getBookmark;

const addBookmark = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  console.log(userInfo);

  [err, user] = await to(authService.addBookmark(userInfo['user_id'], req.body));
  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Done Bookmarking'
  });
}
module.exports.addBookmark = addBookmark;

const removeBookmark = async function (req, res) {
  const userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);

  [err, user] = await to(authService.removeBookmark(userInfo['user_id'], req.body));
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
