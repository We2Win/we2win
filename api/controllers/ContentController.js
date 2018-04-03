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
  'report': {
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
    type: '아파트',
    db: Site
  },
  'officetel': {
    symbol: 'S',
    type: '오피스텔',
    db: Site
  },
  'commercial': {
    symbol: 'S',
    type: '상가/호텔',
    db: Site
  },
  'ground': {
    symbol: 'S',
    type: '토지',
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

const createComments = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;

  let err, comment;

  console.log('body: ', JSON.stringify(body));
  [err, comment] = await to(authService.createComment(body));

  if (err) return ReE(res, err, 422);

  console.log('comment.json: ', comment);
  comment = JSON.stringify(comment);
  console.log('comment.string: ', comment);
  return ReS(res, {
    message: 'Successfully created new comment data.',
    body: comment,
  }, 201);
}
module.exports.createComments = createComments;

const getComments = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    Comments.findAll({
      where: {
        'post-id': req.params.postId
      }
    }).then((content) => {
      return ReS(res, {
        content: content.dataValues
      })
    })
  }
module.exports.getComments = getComments;

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

    const symbolId = contentsInfo[name].symbol + '-id';
    const db = contentsInfo[name].db;
    const WHERE = {};
    if (req.params.id) {
      WHERE[symbolId] = req.params.id;
    }
    if (symbolId === 'S-id') {
      WHERE['S-type'] = contentsInfo[name].type;
    }

    if (req.params.id) {
      db.findOne({
          where: WHERE
        })
        .then((content) => {
          return ReS(res, {
            body: JSON.stringify(content)
          })
        });
    } else {
      db.findAll({
          where: WHERE
        })
        .then((contentList) => {
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

    const symbolId = contentsInfo[name].symbol + '-id';
    const db = contentsInfo[name].db;

    // console.log('req.body in updateList(): ', JSON.stringify(req.body));

    const WHERE = {};
    WHERE[symbolId] = req.body.body[symbolId];
    if (symbolId === 'S-id') {
      WHERE['S-type'] = req.body.body['S-type'];
    }

    console.log('where to update: ', symbolId, req.body.body);

    db.update(req.body.body, {
        where: WHERE
      })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.error(err);
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
