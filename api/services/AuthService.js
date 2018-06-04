const User = require('./../models').user;
const Content = require('./../models').contentsList;
const Report = require('./../models').report;
const News = require('./../models').news;
const Law = require('./../models').law;
const Site = require('./../models').site;
const Meeting = require('./../models').meeting;
const Employer = require('./../models').employer;
const Employee = require('./../models').employee;
const Comment = require('./../models').comment;
const Reply = require('./../models').reply;
const InfoScrap = require('./../models').infoScrap;
const SiteScrap = require('./../models').siteScrap;
const Schedule = require('./../models').schedule;
const validator = require('validator');

const Sequelize = require('sequelize');


const getUniqueKeyFromBody = function (body) {
  const unique_key = body['u-id'];

  return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createInfo = async function (data) {
  console.log('createInfo() Starting');

  console.log(JSON.stringify(data));
  // [err, info] = await to (Report.create(data));
  if (err) TE('생성 중 오류가 발생했습니다.');

  console.log('createInfo() Terminated');
  return info;
}
module.exports.createInfo = createInfo;

const createContent = async function (data) {
  // console.log('createContent1()');
  let unique_key, auth_info, err, content, indexContent;

  // console.log('data.type: ', data.type);
  // console.log('data.body: ', JSON.stringify(data.body));

  const toIndexData = async (data) => {
    const indexData = {
      'c-id': content['c-id'],
      'c-type': data.type,
      'title': content['title'],
      'level': content['level'],
      'no': content['no'],
      's-type': content['s-type'] || '',
      'open-start': content['open-start'] || '',
      'open-end': content['open-end'] || '',
      'ammount': content['ammount'] || '',
      'master-image': content['master-image']
    }
    console.log('indexData: ', indexData);
    [err, indexContent] = await to(Content.create(indexData));
    if (err) TE('인덱스 생성 중 오류가 발생했습니다.');

    console.log('indexContent: ', indexContent);
  }

  switch (data.type) {
    case '리포트':
      [err, content] = await to(Report.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      toIndexData(data)
      break;
    case '부동산 뉴스':
      [err, content] = await to(News.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      toIndexData(data)
      break;
    case '법률 및 정책':
      [err, content] = await to(Law.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      toIndexData(data)
      break;
    case '아파트':
      [err, content] = await to(Site.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      toIndexData(data)
      break;
    case '오피스텔':
      [err, content] = await to(Site.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      toIndexData(data)
      break;
    case '상가/호텔':
      [err, content] = await to(Site.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      toIndexData(data)
      break;
    case '토지':
      [err, content] = await to(Site.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      toIndexData(data)
      break;
    case '오프라인 모임':
      [err, content] = await to(Meeting.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      break;
    case '구인':
      [err, content] = await to(Employer.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      break;
    case '구직':
      [err, content] = await to(Employee.create(data.body));
      if (err) TE('데이터 생성 중 오류가 발생했습니다.');
      break;
  }

  // console.log('createcontent()');
  return content;
}
module.exports.createContent = createContent;

const updateContent = async function (data) {
  let unique_key, auth_info, err, content, indexContent;

  const toIndexData = async (data) => {
    const indexData = {
      // 'c-id': data.body['c-id'],
      'c-type': data.type,
      'title': data.body['title'],
      'level': data.body['level'],
      // 'no': data.body['no'],
      's-type': data.body['s-type'] || '',
      'open-start': data.body['open-start'] || '',
      'open-end': data.body['open-end'] || '',
      'ammount': data.body['ammount'] || '',
      'master-image': data.body['master-image']
    }
    console.log('indexData: ', indexData);
    [err, indexContent] = await to(Content.update(indexData, {
      where: {
        'c-id': data.body['c-id']
      }
    }));
    if (err) TE('인덱스 생성 중 오류가 발생했습니다.');

    console.log('indexContent: ', indexContent);
  }

  switch (data.type) {
    case '리포트':
      console.log(data.body);
      Report.update(data.body, {
        where: {
          'c-id': data.body['c-id']
        }
      });
      toIndexData(data)

      console.log('done updating.');
      break;
    case '부동산 뉴스':
      console.log(data.body);
      News.update(data.body, {
        where: {
          'c-id': data.body['c-id']
        }
      });
      toIndexData(data)

      console.log('done updating.');
      break;
    case '법률 및 정책':
      console.log(data.body);
      Law.update(data.body, {
        where: {
          'c-id': data.body['c-id']
        }
      });
      toIndexData(data)

      console.log('done updating.');
      break;
    case '아파트':
    case '오피스텔':
    case '상가/호텔':
    case '토지':
      console.log(data.body);
      Site.update(data.body, {
        where: {
          'c-id': data.body['c-id']
        }
      });
      toIndexData(data)

      console.log('done updating.');
      break;
    case '오프라인 모임':
      console.log(data.body);
      Meeting.update(data.body, {
        where: {
          'c-id': data.body['c-id']
        }
      });
      toIndexData(data)

      console.log('done updating.');
    case '구인':
      console.log(data.body);
      Employer.update(data.body, {
        where: {
          'c-id': data.body['c-id']
        }
      });
      toIndexData(data)

      console.log('done updating.');
    case '구직':
      console.log(data.body);
      Employee.update(data.body, {
        where: {
          'c-id': data.body['c-id']
        }
      });
      toIndexData(data)

      console.log('done updating.');
  }

  // console.log('createcontent()');
  return content;
}
module.exports.updateContent = updateContent;

const deleteContent = async function (cId, type) {
  let unique_key, auth_info, err, content, indexContent;

  switch (type) {
    case '리포트':
      Report.destroy({
        where: {
          'c-id': cId
        }
      });
      Content.destroy({
        where: {
          'c-id': cId
        }
      });

      console.log('done updating.');
      break;
    case '부동산 뉴스':
      News.destroy({
        where: {
          'c-id': cId
        }
      });
      Content.destroy({
        where: {
          'c-id': cId
        }
      });

      console.log('done updating.');
      break;
    case '법률 및 정책':
      Law.destroy({
        where: {
          'c-id': cId
        }
      });
      Content.destroy({
        where: {
          'c-id': cId
        }
      });

      console.log('done updating.');
      break;
    case '아파트':
    case '오피스텔':
    case '상가/호텔':
    case '토지':
      Site.destroy({
        where: {
          'c-id': cId
        }
      });
      Content.destroy({
        where: {
          'c-id': cId
        }
      });

      console.log('done updating.');
      break;
    case '오프라인 모임':
      Meeting.destroy({
        where: {
          'c-id': cId
        }
      });

      console.log('done updating.');
    case '구인':
      Employer.destroy({
        where: {
          'c-id': cId
        }
      });

      console.log('done updating.');
    case '구직':
      Employee.destroy({
        where: {
          'c-id': cId
        }
      });

      console.log('done updating.');
  }

  // console.log('createcontent()');
  return content;
}
module.exports.deleteContent = deleteContent;

const searchContent = async function (body, page) {
  let err, content;
  page = (page - 1) * 8 || 0;

  [err, content] = await to(Content.findAll({
    offset: page,
    limit: 8,
    where: {
      [Sequelize.Op.or]: {
        title: {
          [Sequelize.Op.like]: '%' + body + '%'
        },
        level: {
          [Sequelize.Op.like]: '%' + body + '%'
        },
        'c-type': {
          [Sequelize.Op.like]: '%' + body + '%'
        },
      }
    }
  }));

  console.log('err: ', err, 'content: ', content);

  return content;
}
module.exports.searchContent = searchContent;

const createComment = async function (body) {
  let unique_key, auth_info, err, content;

  console.log('createComment(): body: ', JSON.stringify(body));

  [err, content] = await to(Comment.create(body));
  console.log(err);
  if (err) TE(err);

  Content.findOne({
    where: {
      'c-id': body['c-id']
    }
  }).then(
    content => {
      content.update({
        'c-comments': Sequelize.literal('`c-comments` + 1')
      }).then(content => {
        console.log('comment counted: ', content);
        return content;
      });
    });
}
module.exports.createComment = createComment;

const hasBookmark = async function (id, uId) {
  let unique_key, auth_info, err, content;

  switch (id) {
    case 'info':
      [err, content] = await to(InfoScrap.findAll({
        where: {
          'u-id': uId
        }
      }));
      if (err) TE('생성 중 오류가 발생했습니다.');
      break;
    case 'site':
      [err, content] = await to(SiteScrap.findAll({
        where: {
          'u-id': uId
        }
      }));
      break;
    case 'meeting':
      [err, content] = await to(Schedule.findAll({
        where: {
          'u-id': uId
        }
      }))
      break;
  }

  return content;
}
module.exports.hasBookmark = hasBookmark;

const getBookmark = async function (id, uId) {
  let unique_key, auth_info, err, content;

  switch (id) {
    case 'info':
      [err, content] = await to(InfoScrap.findAll({
        where: {
          'u-id': uId
        }
      }));
      if (err) TE('생성 중 오류가 발생했습니다.');
      break;
    case 'site':
      [err, content] = await to(SiteScrap.findAll({
        where: {
          'u-id': uId
        }
      }));
      break;
    case 'meeting':
      [err, content] = await to(Schedule.findAll({
        where: {
          'u-id': uId
        }
      }))
      break;
  }

  return content;
}
module.exports.getBookmark = getBookmark;

const addBookmark = async function (uId, body) {
  let unique_key, auth_info, err, content;

  const info = {
    'u-id': uId,
    'c-id': body['c-id'],
    'no': body['no'],
    'title': body['title'],
    'date': body['createdAt']
  }

  console.log('info on addBoookmark(): ', info, body['c-type']);

  switch (body['c-type']) {
    case '리포트':
    case '부동산 뉴스':
    case '법률 및 정책':
      info['c-type'] = body['c-type'];
      [err, scrap] = await to(InfoScrap.findOne({
        where: {
          'u-id': uId,
          'c-id': info['c-id']
        }
      }));

      if (scrap) {
        TE('북마크된 항목입니다.')
      }

      [err, content] = await to(InfoScrap.create(info));
      if (err) TE('생성 중 오류가 발생했습니다.');

      break;
    case '아파트':
    case '오피스텔':
    case '상가/호텔':
    case '토지':
      [err, scrap] = await to(SiteScrap.findOne({
        where: {
          'u-id': uId,
          'c-id': info['c-id']
        }
      }));

      if (scrap) {
        TE('북마크된 항목입니다.')
      }

      info['s-type'] = body['s-type'];
      [err, content] = await to(SiteScrap.create(info));
      if (err) TE('생성 중 오류가 발생했습니다.');
      break;
    case '오프라인 모임':
      [err, scrap] = await to(Schedule.findOne({
        where: {
          'u-id': uId,
          'c-id': info['c-id']
        }
      }));

      if (scrap) {
        TE('북마크된 항목입니다.')
      }

      [err, content] = await to(Schedule.create(info));
      if (err) TE('생성 중 오류가 발생했습니다.');
      break;
  }

  if (content) {
    Content.update({
      'c-scrap': Sequelize.literal('`c-scrap` + 1')
    }, {
      where: {
        'c-id': info['c-id']
      }
    });
  }

  return content;
}
module.exports.addBookmark = addBookmark;

const removeBookmark = async function (uId, body) {
  let unique_key, auth_info, err, content;

  const info = {
    'u-id': uId,
    'c-id': body['c-id'],
    'no': body['no'],
    'title': body['title'],
    'c-type': body['c-type'],
    's-type': body['s-type'],
    'date': body['createdAt']
  }

  switch (body['c-type']) {
    case '리포트':
    case '부동산 정보':
    case '법률 및 정책':
      [err, content] = await to(InfoScrap.destroy({
        where: {
          'u-id': uId,
          'c-id': info['c-id']
        }
      }));
      if (err) TE('생성 중 오류가 발생했습니다.');
      break;
    case '아파트':
    case '오피스텔':
    case '상가/호텔':
    case '토지':
      [err, content] = await to(InfoScrap.destroy({
        where: {
          'u-id': uId,
          'c-id': info['c-id']
        }
      }));
      if (err) TE('생성 중 오류가 발생했습니다.');
      break;
    case '오프라인 모임':
      [err, content] = await to(InfoScrap.destroy({
        where: {
          'u-id': uId,
          'c-id': info['c-id']
        }
      }));
      if (err) TE('생성 중 오류가 발생했습니다.');
      break;
  }

  return content;
}
module.exports.removeBookmark = removeBookmark;


const getSchedule = async function (id, uId) {
  let unique_key, auth_info, err, content;

  [err, content] = await to(Schedule.findAll({
    where: {
      'u-id': uId
    }
  }));
  if (err) TE('생성 중 오류가 발생했습니다.');


  return content;
}
module.exports.getSchedule = getSchedule;

const addSchedule = async function (uId, body) {
  let unique_key, auth_info, err, content;

  const info = {
    'u-id': uId,
    'c-id': body['c-id'],
    'no': body['no'],
    'title': body['title'],
    'duration-start': body['duration-start'],
    'duration-end': body['duration-end']
  }

  console.log('info on addSchedule(): ', info);

  info['c-type'] = body['c-type'];
  [err, content] = await to(Schedule.create(info));
  if (err) TE('생성 중 오류가 발생했습니다.');

  return content;
}
module.exports.addSchedule = addSchedule;

const removeSchedule = async function (uId, body) {
  let unique_key, auth_info, err, content;

  const info = {
    'u-id': uId,
    'c-id': body['c-id'],
    'no': body['no'],
    'title': body['title'],
    'duration-start': body['duration-start'],
    'duration-end': body['duration-end']
  }

  [err, content] = await to(Schedule.destroy({
    where: {
      'u-id': uId,
      'c-id': info['c-id']
    }
  }));
  if (err) TE('생성 중 오류가 발생했습니다.');

  return content;
}
module.exports.removeSchedule = removeSchedule;

const createEmployer = async function (body) {
  let unique_key, auth_info, err, content;

  console.log('createEmployer(): body: ', JSON.stringify(body));

  [err, content] = await to(Employer.create(body));
  if (err) TE('생성 중 오류가 발생했습니다.');
  return content;
}
module.exports.createEmployer = createEmployer;

const createEmployee = async function (body) {
  let unique_key, auth_info, err, content;

  console.log('createEmployee(): body: ', JSON.stringify(body));

  [err, content] = await to(Employee.create(body));
  console.log('err: ', err);
  if (err) TE('생성 중 오류가 발생했습니다.');
  return content;
}
module.exports.createEmployee = createEmployee;

const createUser = async function (userInfo) {
  // console.log('createUser1()');
  let unique_key, auth_info, err;

  auth_info = {}
  auth_info.status = 'create';

  unique_key = getUniqueKeyFromBody(userInfo);
  if (!unique_key) TE('ID를 입력하지 않았습니다.');

  auth_info.method = 'ID';

  console.log(JSON.stringify(userInfo));
  [err, data] = await to(User.create(userInfo));
  if (err) TE('생성 중 오류가 발생했습니다.' + JSON.stringify(err));

  console.log('createUser()');
  // User.beforeSave(data);
  return data;
}
module.exports.createUser = createUser;

const getUserList = async function (params) {
  const whereArr = {};
  if (params.level !== 'ALL') {
    whereArr['level'] = params.level;
  }
  if (params.amount !== 'ALL') {
    whereArr['amount'] = params.amount;
  }

  console.log('getUserList: ', params, whereArr);

  [err, users] = await to(User.findAll({
    offset: (parseInt(params.id) - 1) * 8 || 0,
    limit: 20,
    attributes: ['u-id', 'name', 'email', 'level', 'point', 'level-start', 'level-end', 'amount'],
    where: whereArr,
  }));
  if (err) TE('불러오기에 실패하였습니다.' + JSON.stringify(err));

  return users;
}
module.exports.getUserList = getUserList;

const searchUser = async function (body) {
  [err, users] = await to(User.findAll({
    // IMPORTANT: has no params.id
    // offset: (parseInt(params.id) - 1) * 8 || 0,
    limit: 20,
    attributes: ['u-id', 'name', 'email', 'level', 'point', 'level-start', 'level-end', 'amount'],
    where: {
      [Sequelize.Op.or]: {
        name: {
          [Sequelize.Op.like]: '%' + body + '%'
        },
        email: {
          [Sequelize.Op.like]: '%' + body + '%'
        },
        'u-id': {
          [Sequelize.Op.like]: '%' + body + '%'
        }
      }
    }
  }));

  console.log('body: ', body, users);
  if (err) TE('불러오기에 실패하였습니다.' + JSON.stringify(err));

  return users;
}
module.exports.searchUser = searchUser;

const authUser = async function (userInfo) { //returns token
  let unique_key, err, user;
  const auth_info = {};
  auth_info.status = 'login';

  unique_key = getUniqueKeyFromBody(userInfo);

  if (!userInfo['u-id']) TE('ID를 올바르게 입력해주세요.');
  // if (!userInfo['password']) TE('비밀번호를 올바르게 입력해주세요.');

  [err, user] = await to(User.findOne({
    where: {
      'u-id': unique_key
    }
  }));
  if (!user) TE('등록되지 않았습니다.');

  [err, user] = await to(user.comparePassword(userInfo['password']));
  if (!user) TE('패스워드가 맞지 않습니다.');

  if (err) TE(err.message.message);

  return user;
}
module.exports.authUser = authUser;

const authUserWithKakao = async function (userInfo) { //returns token
  let unique_key, err, user;
  const auth_info = {};
  auth_info.status = 'login';

  // unique_key = getUniqueKeyFromBody(userInfo);

  if (!userInfo['user_id']) TE('ID를 올바르게 입력해주세요.');
  // if (!userInfo['password']) TE('비밀번호를 올바르게 입력해주세요.');

  [err, user] = await to(User.findOne({
    where: {
      'u-id': userInfo['user_id']
    }
  }));
  if (!user) TE('등록되지 않았습니다.');

  if (err) TE(err.message.message);

  return user;
}
module.exports.authUserWithKakao = authUserWithKakao;

const getUserInfo = async function (userInfo) {
  console.log('userInfo in getUserInfo(): ', userInfo);
  [err, user] = await to(User.findOne({
    where: {
      'u-id': userInfo['user_id']
    }
  }));

  return user;
}
module.exports.getUserInfo = getUserInfo;

const hasUser = async function (userInfo) {
  [err, user] = await to(User.findOne({
    where: {
      'u-id': userInfo['u-id']
    }
  }));

  if (user) return true;
  else return false;
}
module.exports.hasUser = hasUser;
