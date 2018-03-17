const Content = require('../models').Content;
const Info = require('../models').Info;
const News = require('../models').News;
const Law = require('../models').Law;
const Site = require('../models').Site;
const Meeting = require('../models').Meeting;
const Employee = require('../models').Employee;
const Employer = require('../models').Employer;
const authService = require('./../services/AuthService');

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

const getInfoList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Info.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getInfoList = getInfoList;

const getNewsList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  // News.findAll({ attributes: ['ID', 'Name', 'Email', 'ULevel', 'UPoint', 'ULevelStart', 'ULevelEnd'] })
  News.findAll({  })
  .then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getNewsList = getNewsList;

const getLawList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Law.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getLawList = getLawList;

const getApartmentList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Site.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getApartmentList = getApartmentList;

const getOfficetelList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Site.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getOfficetelList = getOfficetelList;

const getCommercialList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Site.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getCommercialList = getCommercialList;

const getGroundList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Site.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getGroundList = getGroundList;

const getMeetingList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Meeting.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getMeetingList = getMeetingList;

const getEmployeeList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Employee.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getEmployeeList = getEmployeeList;

const getEmployerList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  Employer.findAll({}).then((contentList) => {
    return ReS(res, {
      list: JSON.stringify(contentList)
    })
  });
}
module.exports.getEmployerList = getEmployerList;

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
