const Content = require('../models').Content;
const Info = require('../models').Info;
const News = require('../models').News;
const Law = require('../models').Law;
const Site = require('../models').Site;
const Meeting = require('../models').Meeting;
const Employee = require('../models').Employee;
const Employer = require('../models').Employer;
const authService = require('./../services/AuthService');

// temporary
const Sequelize = require('sequelize');
const db = require('../models/index');

const contentsInfo = {
  'info': {
    symbol: 'I',
    db: Info
  },
  'news': {
    symbol: 'N',
    db: News
  },
  'law': {
    symbol: 'L',
    db: Law
  },
  'apartment': {
    symbol: 'S',
    db: Site
  },
  'officetel': {
    symbol: 'S',
    db: Site
  },
  'commercial': {
    symbol: 'S',
    db: Site
  },
  'ground': {
    symbol: 'S',
    db: Site
  },
  'meeting': {
    symbol: 'M',
    db: Meeting
  },
  'employer': {
    symbol: 'R',
    db: Employer
  },
  'employee': {
    symbol: 'E',
    db: Employee
  }
};

const create = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;

  let err, content;

  console.log('body: ', JSON.stringify(body));
  [err, content] = await to(authService.createContent(body));

  if (err) return ReE(res, err, 422);

  console.log('content.json: ', content);
  content = JSON.stringify(content);
  console.log('content.string: ', content);
  return ReS(res, {
    message: 'Successfully created new content data.',
    body: content,
  }, 201);
}
module.exports.create = create;

const createReply = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;

  let err, content;

  console.log('body: ', JSON.stringify(body));
  [err, content] = await to(authService.createReply(body));

  if (err) return ReE(res, err, 422);

  console.log('content.json: ', content);
  content = JSON.stringify(content);
  console.log('content.string: ', content);
  return ReS(res, {
    message: 'Successfully created new content data.',
    body: content,
  }, 201);
}
module.exports.create = create;

const get = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Content.findAll({
      where: {
        Title: 'hello'
      }
    })
    .then((content) => {
      // console.log('Content: ', content.dataValues);
      return ReS(res, {
        content: content.dataValues
      })
    });
}
module.exports.get = get;

const getCount = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Info.findAll({
    include: [
      // { model: }
      // { model: db.Room, attributes: ['DisplayLabel'] },
      // { model: db.Periods, attributes: ['DisplayLabel'] },
      // { model: db.Subjects, attributes: ['Name'] }
    ]
  }).then((content) => {
    return ReS(res, {
      content: content.dataValues
    })
  });
}
module.exports.getCount = getCount;

const getDashboard = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Content.findAll({
      where: {
        Title: 'hello'
      }
    })
    .then((content) => {
      // console.log('Content: ', content.dataValues);
      return ReS(res, {
        content: content.dataValues
      })
    });
}
module.exports.getDashboard = getDashboard;

const getList = (name) =>
  async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    const symbol = contentsInfo[name].symbol + '-id';
    const db = contentsInfo[name].db;
    if (req.params.id) {
      db.findOne({
          where: {
            symbol: req.params.id
          }
        })
        .then((content) => {
          return ReS(res, {
            body: JSON.stringify(content)
          })
        });
    } else {
      db.findAll({}).then((contentList) => {
        return ReS(res, {
          list: JSON.stringify(contentList)
        })
      });
    }
  };
module.exports.getList = getList;

const updateList = (name) =>
  async function (req, res) {
    let err, data
    data = req.body;

    const symbol = contentsInfo[name].symbol + '-id';
    const db = contentsInfo[name].db;
    [err, contents] = await to(db.save());
    if (err) {
      return ReE(res, err);
    }
    return ReS(res, {
      message: 'Updated Contents: ' + contents
    });
  };
module.exports.updateList = updateList;

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
  let content, err;
  content = req.content;

  [err, content] = await to(content.destroy());
  if (err) return ReE(res, 'error occured trying to delete content');

  return ReS(res, {
    message: 'Deleted content'
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
