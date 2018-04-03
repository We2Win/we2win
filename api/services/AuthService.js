const User = require('./../models').User;
const Content = require('./../models').Content;
const Info = require('./../models').Info;
const News = require('./../models').News;
const Law = require('./../models').Law;
const Site = require('./../models').Site;
const Meeting = require('./../models').Meeting;
const Employer = require('./../models').Employer;
const Employee = require('./../models').Employee;
const Reply = require('./../models').Reply;
const validator = require('validator');

const getUniqueKeyFromBody = function (body) {
    const unique_key = body.ID;

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createInfo = async function (data) {
    console.log('createInfo() Starting');
    
    console.log(JSON.stringify(data));
    // [err, info] = await to (Info.create(data));
    if(err) TE('생성 중 오류가 발생했습니다.');

    console.log('createInfo() Terminated');
    return info;
}
module.exports.createInfo = createInfo;

const createContent = async function (data) {
    console.log('createContent1()');
    let unique_key, auth_info, err, content;

    console.log('data.type: ', data.type);
    console.log('data.body: ', JSON.stringify(data.body));
    switch(data.type) {
        case '리포트':
            [err, content] = await to (Info.create(data.body));
        break;
        case '부동산 뉴스':
            [err, content] = await to(News.create(data.body));
        break;
        case '법률 및 정책':
            [err, content] = await to(Law.create(data.body));
        break;
        case '아파트':
            [err, content] = await to(Site.create(data.body));
        break;
        case '오피스텔':
            [err, content] = await to(Site.create(data.body));
        break;
        case '상가/호텔':
            [err, content] = await to(Site.create(data.body));
        break;
        case '토지':
            [err, content] = await to(Site.create(data.body));
        break;
        case '오프라인 모임':
            [err, content] = await to(Meeting.create(data.body));
        break;
        case '구인':
            [err, content] = await to(Employer.create(data.body));
        break;
        case '구직':
            [err, content] = await to(Employee.create(data.body));
        break;
    }
    if (err) TE('생성 중 오류가 발생했습니다.');

    console.log('createcontent()');
    return content;
}
module.exports.createContent = createContent;

const createComment = async function (body) {
    let unique_key, auth_info, err, content;

    console.log('createComment(): body: ', JSON.stringify(body));
    
    [err, content] = await to (Comments.create(body));
    if (err) TE('생성 중 오류가 발생했습니다.');
    return content;
}
module.exports.createComment = createComment;

const createUser = async function (userInfo) {
    console.log('createUser1()');
    let unique_key, auth_info, err;

    auth_info = {}
    auth_info.status = 'create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if (!unique_key) TE('ID를 입력하지 않았습니다.');

    auth_info.method = 'ID';

    console.log(JSON.stringify(userInfo));
    [err, data] = await to (User.create(userInfo));
    if (err) TE('생성 중 오류가 발생했습니다.' + JSON.stringify(err));

    console.log('createUser()');
    // User.beforeSave(data);
    return data;
}
module.exports.createUser = createUser;

const getUserList = async function (userInfo) {
    [err, users] = await to(User.findAll( {attributes: ['ID', 'Name', 'Email', 'U-level', 'U-point', 'U-level-start', 'U-level-end']} ));
    if (err) TE('불러오기에 실패하였습니다.' + JSON.stringify(err));

    return users;
}
module.exports.getUserList = getUserList;

const authUser = async function (userInfo) {//returns token
    console.log('authUser1()');
    let unique_key, err, user;
    const auth_info = {};
    auth_info.status = 'login';

    unique_key = getUniqueKeyFromBody(userInfo);

    if (!userInfo.ID) TE('ID를 올바르게 입력해주세요.');
    if (!userInfo.Password) TE('비밀번호를 올바르게 입력해주세요.');

    [err, user] = await to (User.findOne({ where: { ID: unique_key }}));
    if (!user) TE('Not registered');

    [err, user] = await to (user.comparePassword(userInfo.Password));
    if (!user) TE('Password is incorrect');
    
    if (err) TE(err.message);
    return user;
}
module.exports.authUser = authUser;

const hasUser = async function (userInfo) {
    [err, user] = await to(User.findOne({ where: { ID: userInfo.ID } }));
    
    if (user) return true;
    else return false;
}
module.exports.hasUser = hasUser;