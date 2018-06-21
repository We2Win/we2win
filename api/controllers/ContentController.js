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
const InfoScrap = require('../models').infoScrap;
const SiteScrap = require('../models').siteScrap;
const Schedule = require('../models').schedule;
const ViewList = require('../models').viewList;
const CompanyInfo = require('../models').companyInfo;
const jwt = require('jsonwebtoken');

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

const bookmarkTypes = {
  'info': InfoScrap,
  'report': InfoScrap,
  'news': InfoScrap,
  'law': InfoScrap,
  'site': SiteScrap,
  'apartment': SiteScrap,
  'officetel': SiteScrap,
  'commercial': SiteScrap,
  'ground': SiteScrap,
  'meeting': Schedule,
  'employee': undefined,
  'employer': undefined,
}

const searchContents = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.params.id;
  const page = req.params.page || 1;
  let resultArr;

  let err, content;

  // console.log('body: ', JSON.stringify(body));

  [err, content] = await to(authService.searchContent(body, page));

  if (err) return ReE(res, err, 422);

  console.log('content: ', content);

  // content = JSON.stringify(content);

  return ReS(res, {
    message: 'Search Results.',
    body: content,
  }, 201);
};
module.exports.searchContents = searchContents;

const getContents = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let params = req.params;

  console.log(req.params);

  [err, users] = await to(authService.getContentList(params));

  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Successfully loading user lists.',
    list: JSON.stringify(users),
    // user: user.toWeb(),
    // token: User.getJWT()
  }, 201);
}
module.exports.getContents = getContents;

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

const updateContent = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;

  let err, content;

  // console.log('body: ', JSON.stringify(body));
  [err, content] = await to(authService.updateContent(body));

  if (err) return ReE(res, err, 422);

  // console.log('content.json: ', content);
  content = JSON.stringify(content);
  // console.log('content.string: ', content);
  return ReS(res, {
    message: 'Successfully updated new content data.',
    body: content,
  }, 201);
}
module.exports.updateContent = updateContent;

const deleteContent = async function (req, res) {
  let userInfo;
  if (req.headers['authorization']) {
    userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);
  } else {
    userInfo = false;
  }

  console.log('doing with ', userInfo);

  if (userInfo['user_level'] !== 'ADMIN' && userInfo['user_level'] !== 'MANAGER') {
    console.log('not authorized:', userInfo, userInfo['user_level']);
    return ReS(res, 'not authorized.', 422);
  }

  res.setHeader('Content-Type', 'application/json');

  [err, content] = await to(authService.deleteContent(req.params.cid, req.params.type));

  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'successfully deleted comment.'
  });
}
module.exports.deleteContent = deleteContent;

const countShare = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Content.update({
    'c-sns': Sequelize.literal('`c-sns` + 1')
  }, {
    where: {
      'c-id': req.params.cid
    }
  });

  return ReS(res, {
    message: 'Successfully created new comment data.',
  }, 201);
}
module.exports.countShare = countShare;

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

  console.log('req.params at getComments(): ', req.params);

  Comment.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    where: {
      'c-id': req.params.cid
    }
  }).then((content) => {
    return ReS(res, {
      content: content
    })
  })
}
module.exports.getComments = getComments;

const deleteComment = async function (req, res) {
  let userInfo;
  if (req.headers['authorization']) {
    userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);
  } else {
    userInfo = false;
  }


  if (userInfo['user_level'] !== 'ADMIN' && userInfo['user_level'] !== 'MANAGER') {
    console.log('not authorized:', userInfo, userInfo['user_level']);
    return ReS(res, 'not authorized.', 422);
  }

  res.setHeader('Content-Type', 'application/json');

  let err, content;

  [err, content] = await to(Comment.findOne({
    where: {
      'c-id': req.params.cid,
      'u-id': req.params.uid
    }
  }));

  console.log(content);

  if (err) return ReE(res, err, 422);

  content.destroy();
  return ReS(res, {
    message: 'successfully deleted comment.'
  });
}
module.exports.deleteComment = deleteComment;

const createEmployer = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;

  let err, comment;

  console.log('body: ', JSON.stringify(body));
  [err, comment] = await to(authService.createEmployer(body));

  if (err) return ReE(res, err, 422);

  comment = JSON.stringify(comment);
  return ReS(res, {
    message: 'Successfully created new employer data.',
    body: comment,
  }, 201);
}
module.exports.createEmployer = createEmployer;

const createEmployee = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body;

  let err, comment;

  console.log('body: ', JSON.stringify(body));
  [err, comment] = await to(authService.createEmployee(body));

  if (err) return ReE(res, err, 422);

  console.log('comment.json: ', comment);
  comment = JSON.stringify(comment);
  console.log('comment.string: ', comment);
  return ReS(res, {
    message: 'Successfully created new comment data.',
    body: comment,
  }, 201);
}
module.exports.createEmployee = createEmployee;

const getAnalysisData = async function (req, res) {
  const types = ['c-click', 'c-scrap', 'c-comments', 'c-sns'];
  const contents = [];

  let results = {
    'c-click': [],
    'c-scrap': [],
    'c-comments': [],
    'c-sns': []
  };

  let err, total;
  [err, total] = await to(Content.count());
  total = Math.floor(total / 3);
  console.log('total: ', total);

  for (const type in types) {
    const rowLevel = ['ALL', 'STANDARD', 'PREMIUM', 'PLATINUM'];
    for (const i in rowLevel) {
      let result;
      [err, result] = await to(Content.findAll({
        order: [[types[type], 'DESC']],
        where: {
          'level': rowLevel[i]
        },
        limit: total
      }));

      // console.log('level result: ', result.length);
      results[types[type]][0] = result.length;
    }

    const rowAmount = [0, 5, 10, 30, 50, 100];
    for (let i in rowAmount) {
      i = parseInt(i);
      if (i === 6) {
        break;
      }
      let result;      
      [err, result] = await to(Content.findAll({
        order: [[types[type], 'DESC']],
        where: {
          'ammount': {
            [Sequelize.Op.between]: [rowAmount[i], rowAmount[i + 1]]
          }
        },
        limit: total
      }));

      // console.log('amount result: ', result.length);
      results[types[type]][1] = result.length;      
    }
  }

  console.log('results: ', results);
  return ReS(res, results);
}
module.exports.getAnalysisData = getAnalysisData;

const getEmployees = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log('req.params: ', req.params);

  Employee.findAll().then(content => {
    console.log(content['c-id']);
    return ReS(res, content);
  });
}
module.exports.getEmployees = getEmployees;

const getEmployers = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log('req.params: ', req.params);

  Employer.findAll().then(content => {
    console.log(content['c-id']);
    return ReS(res, content);
  });
}
module.exports.getEmployers = getEmployers;

const confirmEmployees = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.body.array.length) {
    Employee.update({
      'confirm': req.body.confirm
    }, {
      where: {
        'c-id': {
          [Sequelize.Op.or]: req.body.array
        }
      }
    }).then(content => {
      console.log(content['c-id']);
      return ReS(res, content);
    });
  }

  return false;
}
module.exports.confirmEmployees = confirmEmployees;

const confirmEmployers = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.body.array.length) {
    Employer.update({
      'confirm': req.body.confirm
    }, {
      where: {
        'c-id': {
          [Sequelize.Op.or]: req.body.array
        }
      }
    }).then(content => {
      console.log(content['c-id']);
      return ReS(res, content);
    });
  }

  return false;
}
module.exports.confirmEmployers = confirmEmployers;

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

const getPrivacyData = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  CompanyInfo.findOne({
    where: {
      'type': 'privacy'
    }
  }).then((content) => {
    console.log('privacy content: ', content);
    if (content) {
      return ReS(res, {
        content: content.dataValues
      })
    } else {
      return ReS(res, {
        content: ''
      });
    }
  });
}
module.exports.getPrivacyData = getPrivacyData;

const getUseData = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  CompanyInfo.findOne({
    where: {
      'type': 'use'
    }
  }).then((content) => {
    console.log('use content: ', content);
    if (content) {
      return ReS(res, {
        content: content.dataValues
      })
    } else {
      return ReS(res, {
        content: ''
      });
    }
  });
}
module.exports.getUseData = getUseData;

const editPrivacyData = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  console.log('contents: ', req.body);

  CompanyInfo.findOne({
    where: {
      type: 'privacy'
    }
  }).then(
    data => {
      if (data) {
        CompanyInfo.update({
          contents: req.body.contents
        }, {
          where: {
            type: 'privacy'
          }
        }).then(
          content => {
            return ReS(res, {
              message: 'done'
            });
          }
        )
      } else {
        CompanyInfo.findOrCreate({
            where: {
              type: 'privacy'
            },
            defaults: {
              contents: req.body.contents
            }
          })
          .spread((body, created) => {
            if (created) {
              console.log('New body: ', body.dataValues);
              return ReS(res, body.dataValues);

            } else {
              console.log('Old body: ', body.dataValues);
              return ReS(res, body.dataValues);
            }
          });
      }
    }
  )
}
module.exports.editPrivacyData = editPrivacyData;

const editUseData = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  console.log('contents: ', req.body);

  CompanyInfo.findOne({
    where: {
      type: 'use'
    }
  }).then(
    data => {
      if (data) {
        CompanyInfo.update({
          contents: req.body.contents
        }, {
          where: {
            type: 'use'
          }
        }).then(
          content => {
            return ReS(res, {
              message: 'done'
            });
          }
        )
      } else {
        CompanyInfo.findOrCreate({
            where: {
              type: 'use'
            },
            defaults: {
              contents: req.body.contents
            }
          })
          .spread((body, created) => {
            if (created) {
              console.log('New body: ', body.dataValues);
              return ReS(res, body.dataValues);

            } else {
              console.log('Old body: ', body.dataValues);
              return ReS(res, body.dataValues);
            }
          });
      }
    }
  )
}
module.exports.editUseData = editUseData;

const getMeetingTitles = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

}
module.exports.getMeetingTitles = getMeetingTitles;

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
  [err, cComment] = await to(Comment.count());
  [err, cSchedule] = await to(Schedule.count());

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
      'schedule': cSchedule
    }
  }

  console.log(ret);
  // for returning to UserController
  return ReS(res, ret);
}
module.exports.getDashBoardData = getDashBoardData;

const getContentsDetail = async function (req, res) {
  let userInfo;
  if (req.headers['authorization']) {
    userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);
  } else {
    userInfo = false;
  }

  res.setHeader('Content-Type', 'application/json');
  console.log('req.params: ', req.params);

  const pageTypes = {
    'report': Report,
    'news': News,
    'law': Law,
    'site': Site,
    'apartment': Site,
    'officetel': Site,
    'commercial': Site,
    'ground': Site,
    'employee': Employee,
    'employer': Employer,
    'meeting': Meeting
  }

  let whereArr = {
    'no': req.params.id
  };

  let err, content;
  [err, content] = await to(pageTypes[req.params.page].findOne({
    where: whereArr
  }));

  if (err) return ReE(res, err, 422);

  // console.log(content['c-id']);
  Content.update({
    'c-click': Sequelize.literal('`c-click` + 1')
  }, {
    where: {
      'c-id': content['c-id']
    }
  });

  let viewContent, viewErr;
  [viewErr, viewContent] = await to(ViewList.create({
    'c-id': content['c-id'],
    'c-type': req.params.page,
    'u-id': userInfo['user_id'] || '',
  }));

  // console.log('viewCOntent Status: ', viewErr, viewContent);

  if (bookmarkTypes[req.params.page] && userInfo) {
    // console.log('searching bookmark...');
    // console.log('c-id: ', content['c-id'], content.dataValues['c-id']);
    bookmarkTypes[req.params.page].findOne({
      where: {
        'c-id': content['c-id'],
        'u-id': userInfo['user_id']
      }
    }).then(isBookmarked => {
      content.dataValues['isBookmarked'] = isBookmarked ? true : false;
      // console.log('content: ', content);
      return ReS(res, content);
    });
  } else {
    console.log('skipped searching bookmark: ', req.params.page, bookmarkTypes);
    return ReS(res, content);
  }

}
module.exports.getContentsDetail = getContentsDetail;

const getContentsList = async function (req, res) {
  let userInfo;
  if (req.headers['authorization']) {
    userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);
  } else {
    userInfo = false;
  }

  res.setHeader('Content-Type', 'application/json');
  let id;
  if (req.params.list === 'main') {
    id = (req.params.id - 1) * 8 || 0;
  } else {
    id = (req.params.id - 1) * 12 || 0;
  }

  const pageTypes = {
    'info': {
      'c-type': {
        [Sequelize.Op.or]: ['리포트', '부동산 뉴스', '법률 및 정책']
      }
    },
    'site': {
      's-type': {
        [Sequelize.Op.or]: ['아파트', '오피스텔', '상가/호텔', '토지']
      }
    },
    'report': {
      'c-type': '리포트'
    },
    'news': {
      'c-type': '부동산 뉴스'
    },
    'law': {
      'c-type': '법률 및 정책'
    },
    'apartment': {
      's-type': '아파트'
    },
    'officetel': {
      's-type': '오피스텔'
    },
    'commercial': {
      's-type': '상가/호텔'
    },
    'ground': {
      's-type': '토지'
    }
  };

  const sortTypes = {
    'date': ['createdAt', 'DESC'],
    'click': ['c-click', 'DESC'],
    'reply': ['c-comments', 'DESC'],
    'sns': ['c-sns', 'DESC'],
    'scrap': ['c-scrap', 'DESC']
  }

  const whereArr = pageTypes[req.params.page];
  let orderArr;
  if (req.params.sort) {
    orderArr = [
      ['notification', 'DESC'], sortTypes[req.params.sort]
    ];
  } else {
    orderArr = [
      ['notification', 'DESC']
    ];
  }

  let err, content;

  switch (req.params.list) {
    case 'All':
      [err, content] = await to(Content.findAll({
        offset: id,
        order: orderArr,
        where: whereArr
      }));
      break;
    case 'main':
      [err, content] = await to(Content.findAll({
        offset: id,
        limit: 8,
        order: orderArr,
        where: whereArr
      }));
      break;
    case 'newly':
      [err, content] = await to(Content.findAll({
        offset: id,
        limit: 12,
        order: orderArr,
        where: whereArr
      }));
      break;
    case 'weekly':
      let contentList = [];
      let content1, content2, content3;
      [err, content1] = await to(Content.findOne({
        order: [
          ['c-click', 'DESC']
        ],
        where: whereArr
      }));

      contentList.push(content1);
      [err, content2] = await to(Content.findOne({
        order: [
          ['c-comments', 'DESC']
        ],
        where: whereArr
      }));

      contentList.push(content2);
      [err, content3] = await to(Content.findOne({
        order: [
          ['c-sns', 'DESC']
        ],
        where: whereArr
      }));
      contentList.push(content3);
      content = contentList;
      break;
    case 'titles':
      [err, content] = await to(Content.findAll({
        order: orderArr,
        where: whereArr,
        attributes: ['title', 'no']
      }));
      break;
    case 'reporter':
      [err, content] = await to(Content.findAll({
        offset: id,
        limit: 4,
        order: orderArr,
        where: whereArr
      }));
      break;
  }

  if (err) return ReE(res, 'error occured: ', err);


  if (bookmarkTypes[req.params.page] && userInfo) {
    // console.log('searching bookmark...');
    let isBookmarked;

    for (let i in content) {
      [err, isBookmarked] = await to(bookmarkTypes[req.params.page].findOne({
        where: {
          'c-id': content[i]['c-id'],
          'u-id': userInfo['user_id']
        }
      }));
      // console.log(isBookmarked, content[0]['c-id'])

      if (err) return ReE(res, 'error occured: ', err);

      content[i].dataValues['isBookmarked'] = isBookmarked ? true : false;
    }

    return ReS(res, content);
  } else {
    console.log('skipped searching bookmark: ', bookmarkTypes[req.params.page], userInfo);
    return ReS(res, content);
  }
};
module.exports.getContentsList = getContentsList;

const getRankingList = async function (req, res) {
  let userInfo;
  if (req.headers['authorization']) {
    userInfo = jwt.verify(req.headers['authorization'], CONFIG.jwt_encryption);
  } else {
    userInfo = false;
  }

  res.setHeader('Content-Type', 'application/json');

  let endDate = new Date(req.params.date);
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);
  // endDate = endDate.toISOString().slice(0, 10);

  console.log('date: ', startDate, endDate);

  let err, contents, result, results;
  results = [];

  switch (req.params.list) {
    case 'info':
      [err, contents] = await to(ViewList.findAll({
        where: {
          // from: {
          // [Sequelize.Op.between]: [startDate, endDate],
          // },
          [Sequelize.Op.or]: ['report', 'news', 'law']
        },
        limit: 3
      }));

      for (let i in contents) {
        [err, result] = await to(Content.findOne({
          where: {
            'c-id': contents[i]['c-id']
          }
        }));
        if (err) return ReE(res, err, 422);
        results.push(result);
      }
      break;
    case 'site':
    case 'report':
    case 'news':
    case 'law':
      [err, content] = await to(ViewList.findAll({
        // where: {
        //   from: {
        //     // [Sequelize.Op.between]: [startDate, endDate],
        //   }
        // },
        limit: 3
      }));
      break;
  }
  if (err) return ReE(res, err, 422);

  console.log('results: ', results);
  return ReS(res, {
    message: 'Successfully loading ranking lists.',
    content: results
    // user: user.toWeb(),
    // token: User.getJWT()
  }, 201);
}
module.exports.getRankingList = getRankingList;

const getContentsByQuery = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let params = req.params;

  [err, contents] = await to(authService.searchContents(params.query));

  if (err) return ReE(res, err, 422);

  return ReS(res, {
    message: 'Successfully loading user lists.',
    list: JSON.stringify(contents),
    // user: user.toWeb(),
    // token: User.getJWT()
  }, 201);
}
module.exports.getContentsByQuery = getContentsByQuery;

const getSimplesList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log('req.params: ', req.params);
  const id = (req.params.id - 1) * 12 || 0;

  const sortTypes = {
    'date': ['createdAt', 'DESC'],
    'click': ['c-click', 'DESC'],
    'reply': ['c-comments', 'DESC'],
    'sns': ['c-sns', 'DESC'],
    'scrap': ['c-scrap', 'DESC']
  }

  let orderArr;
  if (req.params.sort) {
    orderArr = [sortTypes[req.params.sort]];
  } else {
    orderArr = [];
  }

  switch (req.params.page) {
    case 'meetingAll':
      Meeting.findAll({
        offset: id,
        order: orderArr,
      }).then(content => {
        if (bookmarkTypes[req.params.page] && userInfo) {
          // console.log('searching bookmark...');
          bookmarkTypes[req.params.page].findOne({
            where: {
              'c-id': content['c-id'],
              'u-id': userInfo['user_id']
            }
          }).then(isBookmarked => {
            content.dataValues['isBookmarked'] = isBookmarked ? true : false;
            // console.log('content: ', content);
            return ReS(res, content);
          });
        } else {
          console.log('skipped searching bookmark: ', req.params.page, bookmarkTypes);
          return ReS(res, content);
        }
      });
      break;
    case 'employeeAll':
      Employee.findAll({
        offset: id,
        order: orderArr,
        where: {
          'confirm': 1
        }
      }).then(content => {
        return ReS(res, content);
      });
      break;
    case 'employerAll':
      Employer.findAll({
        offset: id,
        order: orderArr,
        where: {
          'confirm': 1
        }
      }).then(content => {
        return ReS(res, content);
      });
      break;
    case 'meeting':
      Meeting.findAll({
        offset: id,
        limit: 12,
        order: orderArr,
      }).then(content => {
        return ReS(res, content);
      });
      break;
    case 'employee':
      Employee.findAll({
        offset: id,
        limit: 12,
        order: orderArr,
        where: {
          'confirm': 1
        }
      }).then(content => {
        return ReS(res, content);
      });
      break;
    case 'employer':
      Employer.findAll({
        offset: id,
        limit: 12,
        order: orderArr,
        where: {
          'confirm': 1
        }
      }).then(content => {
        return ReS(res, content);
      });
      break;
  }
}
module.exports.getSimplesList = getSimplesList;

const getFilePath = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  console.log('req.params at getFilePath(): ', req.params);

  Law.findOne({
    where: {
      'c-id': req.params.cid
    }
  }).then((content) => {
    return ReS(res, {
      content: content
    })
  });
}
module.exports.getFilePath = getFilePath;

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
