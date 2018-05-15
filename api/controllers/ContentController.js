const Content = require('../models').contentsList;
const Report = require('../models').report;
const News = require('../models').news;
const Law = require('../models').law;
const Site = require('../models').site;
const Meeting = require('../models').meeting;
const Employee = require('../models').employee;
const Employer = require('../models').employer;
const Comment = require('../models').comment;
const authService = require('./../services/AuthService');

// temporary
const Sequelize = require('sequelize');
const db = require('../models/index');

const contentsInfo = {
  'report': {
    symbol: 'I',
    db: Report
  },
  'news': {
    symbol: 'N',
    db: News
  },
  'law': {
    symbol: 'L',
    db: Law
  },
  'site': {
    symbol: 'S',
    db: Site
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

const createContents = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;

  let err, content;

  console.log('body: ', JSON.stringify(body));
  [err, content] = await to(authService.createContent(body));

  if (err) return ReE(res, err, 422);

  // console.log('content.json: ', content);
  content = JSON.stringify(content);
  // console.log('content.string: ', content);
  return ReS(res, {
    message: 'Successfully created new content data.',
    body: content,
  }, 201);
}
module.exports.createContents = createContents;

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

  Comment.findAll({
    where: {
      'c-id': req.params.postId
    }
  }).then((content) => {
    return ReS(res, {
      content: content
    })
  })
}
module.exports.getComments = getComments;

const getCount = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Report.findAll({
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

const getDashBoardData = async function (req, res) {
  let ret = {};

  res.setHeader('Content-Type', 'application/json');

  let cC, cI, cN, cL, cS, cE, cR, cM;
  [err, cC] = await to(Content.count());
  [err, cI] = await to(Report.count());
  [err, cN] = await to(News.count());
  [err, cL] = await to(Law.count());
  [err, cS] = await to(Site.count());
  [err, cM] = await to(Meeting.count());
  [err, cE] = await to(Employee.count());
  [err, cR] = await to(Employer.count());

  let cClick, cSns, cScrap, cComment, cSchedule;
  [err, cClick] = await to(Content.sum('c-click'));
  [err, cSns] = await to(Content.sum('c-sns'));
  [err, cScrap] = await to(Content.sum('c-scrap'));
  [err, cComment] = await to(Content.sum('c-comment'));
  [err, cSchedule] = await to(Content.sum('c-schedule'));

  if (err) return ReE(res, 'error occured trying to get data');

  ret = {
    'contents': {
      'total': cC,
      'info': cI + cN + cL,
      'site': cS,
      'recruit': cE + cR,
      'meeting': cM,
    },
    'logs': {
      'click': cClick,
      'sns': cSns,
      'scrap': cScrap,
      'comment': cComment,
      'schedult': cSchedule
    }
  }

  // for returning to UserController
  return ReS(res, ret);
}
module.exports.getDashBoardData = getDashBoardData;

// const getDashboard = async function (req, res) {
//   res.setHeader('Content-Type', 'application/json');

//   Content.findAll({
//       where: {
//         Title: 'hello'
//       }
//     })
//     .then((content) => {
//       // console.log('Content: ', content.dataValues);
//       return ReS(res, {
//         content: content.dataValues
//       })
//     });
// }
// module.exports.getDashboard = getDashboard;

const getList = (name) =>
  async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    // const symbol = contentsInfo[name].symbol;
    // const symbolId = symbol + '-id';

    let db = contentsInfo[name].db;
    const WHERE = {};
    if (req.params.id) {
      WHERE['no'] = req.params.id;
    }

    switch (name) {
      case 'apartment':
        WHERE['s-type'] = '아파트';
        break;
      case 'officetel':
        WHERE['s-type'] = '오피스텔';
        break;
      case 'commercial':
        WHERE['s-type'] = '상가/호텔';
        break;
      case 'ground':
        WHERE['s-type'] = '토지';
        break;
    }

    // if (symbolId === 'S-id' && name !== 'site') {
    //   WHERE['S-type'] = contentsInfo[name].type;
    // }

    if (req.params.id) {
      db.findOne({
          where: WHERE
        })
        .then((content) => {
          content.update({
            'c-click': Sequelize.literal('`c-click` + 1')
          });

          return ReS(res, content);
        });
    } else {
      db.findAll({
          where: WHERE
        })
        .then((contentList) => {
          return ReS(res, contentList);
        });
    }
  };
module.exports.getList = getList;
// const getList = (name) =>
//   async function (req, res) {
//     res.setHeader('Content-Type', 'application/json');

//     const symbol = contentsInfo[name].symbol;
//     const symbolId = symbol + '-id';
//     const db = contentsInfo[name].db;
//     const WHERE = {};
//     if (req.params.id) {
//       WHERE[symbolId] = req.params.id;
//     }
//     if (symbolId === 'S-id' && name !== 'site') {
//       WHERE['S-type'] = contentsInfo[name].type;
//     }

//     if (req.params.id) {
//       db.findOne({
//           where: WHERE
//         })
//         .then((content) => {
//           content.update({
//             'data-click': Sequelize.literal('`data-click` + 1')
//           });

//           return ReS(res, content);
//         });
//     } else {
//       db.findAll({
//           where: WHERE
//         })
//         .then((contentList) => {
//           return ReS(res, contentList);
//         });
//     }
//   };
// module.exports.getList = getList;

const getRankingList = (name) =>
  async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    const id = (req.params.id - 1) || 0;
    let contentList = [];

    console.log(id);
    switch (name) {
      case 'info/newly':
        Content.findAll({
            offset: id,
            limit: 8,
            order: [
              ['createdAt', 'DESC']
            ],
            where: {
              'c-type': {
                [Sequelize.Op.or]: ['리포트', '부동산 뉴스', '법률 및 정책']
              }
            }
          })
          .then((content) => {
            return ReS(res, content);
          });
        break;
      case 'info/weekly':
        Content.findAll({
            offset: id,
            limit: 3,
            order: [
              ['c-click', 'DESC']
            ],
            where: {
              'c-type': {
                [Sequelize.Op.or]: ['리포트', '부동산 뉴스', '법률 및 정책']
              }
            }
          })
          .then((content) => {
            return ReS(res, content);
          });
        break;
      case 'info/report':
        Content.findAll({
            offset: id,
            limit: 8,
            order: [
              ['c-click', 'DESC']
            ],
            where: {
              'c-type': '리포트'
            }
          })
          .then((content) => {
            return ReS(res, content);
          });
        break;
      case 'info/news':
        Content.findAll({
            offset: id,
            limit: 8,
            order: [
              ['c-click', 'DESC']
            ],
            where: {
              'c-type': '부동산 뉴스'
            }
          })
          .then((content) => {
            return ReS(res, content);
          });
        break;
      case 'info/law':
        Content.findAll({
            offset: id,
            limit: 8,
            order: [
              ['c-click', 'DESC']
            ],
            where: {
              'c-type': '법률 및 정책'
            }
          })
          .then((content) => {
            return ReS(res, content);
          });
        break;
      case 'site/newly':
        Content.findAll({
            offset: id,
            limit: 8,
            order: [
              ['c-click', 'DESC']
            ],
            where: {
              'c-type': '법률 및 정책'
            }
          })
          .then((content) => {
            return ReS(res, content);
          });
        break;
      case 'site/weekly':
        Content.findAll({
            offset: id,
            limit: 8,
            order: [
              ['c-click', 'DESC']
            ],
            where: {
              's-type': {
                [Sequelize.Op.or]: ['아파트', '오피스텔', '상가/호텔', '토지']
              }
            }
          })
          .then((content) => {
            return ReS(res, content);
          });
        break;
    }
  };
module.exports.getRankingList = getRankingList;
// const getRankingList = (name) =>
//   async function (req, res) {
//     res.setHeader('Content-Type', 'application/json');

//     const id = (req.params.id - 1) || 0;
//     let contentList = [];

//     console.log(id);
//     switch (name) {
//       case 'info/newly':
//         Report.findAll({
//             offset: id,
//             limit: 8,
//             order: [
//               ['createdAt', 'DESC']
//             ]
//           })
//           .then((content) => {
//             contentList.push(content);
//             News.findAll({
//                 offset: id,
//                 limit: 8,
//                 order: [
//                   ['createdAt', 'DESC']
//                 ]
//               })
//               .then((content) => {
//                 contentList.push(content);
//                 Law.findAll({
//                     offset: id,
//                     limit: 8,
//                     order: [
//                       ['createdAt', 'DESC']
//                     ]
//                   })
//                   .then((content) => {
//                     contentList.push(content);
//                     return ReS(res, contentList);
//                   });
//               });
//           });
//         break;
//       case 'info/weekly':
//         Report.findAll({
//             offset: id,
//             limit: 1,
//             order: [
//               ['data-click', 'DESC']
//             ]
//           })
//           .then((content) => {
//             contentList.push(content);
//             News.findAll({
//                 offset: id,
//                 limit: 1,
//                 order: [
//                   ['data-click', 'DESC']
//                 ]
//               })
//               .then((content) => {
//                 contentList.push(content);
//                 Law.findAll({
//                     offset: id,
//                     limit: 1,
//                     order: [
//                       ['data-click', 'DESC']
//                     ]
//                   })
//                   .then((content) => {
//                     contentList.push(content);
//                     return ReS(res, contentList);
//                   });
//               });
//           });
//         break;
//       case 'info/report':
//         Report.findAll({
//             offset: id,
//             limit: 8,
//             order: [
//               ['data-click', 'DESC']
//             ]
//           })
//           .then((content) => {
//             return ReS(res, content);
//           });
//         break;
//       case 'info/news':
//         News.findAll({
//             offset: id,
//             limit: 8,
//             order: [
//               ['data-click', 'DESC']
//             ]
//           })
//           .then((content) => {
//             return ReS(res, content);
//           });
//         break;
//       case 'info/law':
//         Law.findAll({
//             offset: id,
//             limit: 8,
//             order: [
//               ['data-click', 'DESC']
//             ]
//           })
//           .then((content) => {
//             return ReS(res, content);
//           });
//         break;
//       case 'site/newly':
//         Site.findAll({
//             offset: id,
//             limit: 8,
//             order: [
//               ['createdAt', 'DESC']
//             ]
//           })
//           .then((content) => {
//             return ReS(res, content);
//           });
//         break;
//       case 'site/weekly':
//         Site.findAll({
//             offset: id,
//             limit: 8,
//             order: [
//               ['data-click', 'DESC']
//             ]
//           })
//           .then((content) => {
//             return ReS(res, content);
//           });
//         break;
//     }
//   };
// module.exports.getRankingList = getRankingList;

const updateList = (name) =>
  async function (req, res) {
    let err, data
    data = req.body;

    const symbolId = contentsInfo[name].symbol + '-id';
    const db = contentsInfo[name].db;

    // console.log('req.body in updateList(): ', JSON.stringify(req.body));

    const WHERE = {};
    WHERE[symbolId] = req.body.body[symbolId];
    if (symbolId === 'no') {
      WHERE['s-type'] = req.body.body['s-type'];
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
