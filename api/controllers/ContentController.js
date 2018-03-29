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

    if (req.params.id) {
      Info.findOne({
          where: {
            'I-id': req.params.id
          }
        })
        .then((content) => {
          return ReS(res, {
            body: JSON.stringify(content)
          })
        });
    } else {
      Info.findAll({}).then((contentList) => {
        return ReS(res, {
          list: JSON.stringify(contentList)
        })
      });
    }
  }

const getInfoList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Info.findOne({
        where: {
          'I-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Info.findAll({}).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getInfoList = getInfoList;

const getIreplyList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Ireply.findOne({
        where: {
          'I-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Ireply.findAll({}).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getIreplyList = getIreplyList;

const getNewsList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    News.findOne({
        where: {
          'N-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    // News.findAll({ attributes: ['ID', 'Name', 'Email', 'ULevel', 'UPoint', 'ULevelStart', 'ULevelEnd'] })
    News.findAll({})
      .then((contentList) => {
        return ReS(res, {
          list: JSON.stringify(contentList)
        })
      });
  }
}
module.exports.getNewsList = getNewsList;

const getNreplyList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Nreply.findOne({
        where: {
          'N-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Nreply.findAll({})
      .then((contentList) => {
        return ReS(res, {
          list: JSON.stringify(contentList)
        })
      });
  }
}
module.exports.getNreplyList = getNreplyList;

const getLawList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Law.findOne({
        where: {
          'L-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Law.findAll({}).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getLawList = getLawList;

const getLreplyList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Lreply.findOne({
        where: {
          'L-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Lreply.findAll({}).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getLreplyList = getLreplyList;

const getApartmentList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Site.findOne({
        where: {
          'S-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Site.findAll({
      where: {
        'S-type': '아파트'
      }
    }).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getApartmentList = getApartmentList;

const getSreplyList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Sreply.findOne({
        where: {
          'S-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Sreply.findAll({
      where: {
        'S-type': '아파트'
      }
    }).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getSreplyList = getSreplyList;

const getOfficetelList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Site.findOne({
        where: {
          'S-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Site.findAll({
      where: {
        'S-type': '오피스텔'
      }
    }).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getOfficetelList = getOfficetelList;

const getCommercialList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Site.findOne({
        where: {
          'S-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Site.findAll({
      where: {
        'S-type': '상가/호텔'
      }
    }).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getCommercialList = getCommercialList;

const getGroundList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Site.findOne({
        where: {
          'S-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Site.findAll({
      where: {
        'S-type': '토지'
      }
    }).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getGroundList = getGroundList;

const getMeetingList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Meeting.findOne({
        where: {
          'M-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Meeting.findAll({}).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getMeetingList = getMeetingList;

const getMreplyList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Mreply.findOne({
        where: {
          'M-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Mreply.findAll({}).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getMreplyList = getMreplyList;

const getEmployeeList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Employee.findOne({
        where: {
          'E-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Employee.findAll({}).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
}
module.exports.getEmployeeList = getEmployeeList;

const getEmployerList = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.params.id) {
    Employer.findOne({
        where: {
          'R-id': req.params.id
        }
      })
      .then((content) => {
        return ReS(res, {
          body: JSON.stringify(content)
        })
      });
  } else {
    Employer.findAll({}).then((contentList) => {
      return ReS(res, {
        list: JSON.stringify(contentList)
      })
    });
  }
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
