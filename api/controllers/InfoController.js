const Info = require('../models').Info;
const authService = require('./../services/AuthService');

const create = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;

  if (!body.Title) {
    return ReE(res, '제목을 입력해주세요.');
  } else if (!body.Description) {
    return ReE(res, '설명을 입력해주세요.');
  } else {
    let err, info;

    [err, info] = await to(authService.createInfo(body));

    if (err) return ReE(res, err, 422);
    return ReS(res, {
      message: 'Successfully created new info data.',
      info: info.toWeb(),
    }, 201);
  }
}
module.exports.create = create;

const get = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Info.findOne({})
    .then((info) => {
      return ReS(res, {
        info: info.dataValues
      })
    });
}
module.exports.get = get;

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
  let info, err;
  info = req.info;

  [err, info] = await to(info.destroy());
  if (err) return ReE(res, 'error occured trying to delete info');

  return ReS(res, {
    message: 'Deleted info'
  }, 204);
}
module.exports.remove = remove;

// const login = async function (req, res) {
//     const body = req.body;
//     let err, user;

//     [err, user] = await to(authService.authUser(req.body));
//     if (err) return ReE(res, err, 422);

//     return ReS(res, {
//         token: user.getJWT(),
//         user: user.toWeb()
//     });
// }
// module.exports.login = login;
