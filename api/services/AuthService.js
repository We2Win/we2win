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
const validator = require('validator');

const getUniqueKeyFromBody = function (body) {
    const unique_key = body['u-id'];

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createInfo = async function (data) {
    console.log('createInfo() Starting');
    
    console.log(JSON.stringify(data));
    // [err, info] = await to (Report.create(data));
    if(err) TE('생성 중 오류가 발생했습니다.');

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
            'title': data.body['title'],
            'level': data.body['level'],
            'no': data.body['no'],
            's-type': data.body['s-type'] || '',
            'open-start': data.body['open-start'] || '',
            'open-end': data.body['open-end'] || '',
            'amount': data.body['ammount'] || '',
            'master-image': data.body['master-image']
        }
        // console.log('indexData: ', indexData);
        [err, indexContent] = await to(Content.create(indexData));
        if (err) TE('인덱스 생성 중 오류가 발생했습니다.');

        console.log('indexContent: ', indexContent);        
    }

    switch(data.type) {
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

const createComment = async function (body) {
    let unique_key, auth_info, err, content;

    console.log('createComment(): body: ', JSON.stringify(body));
    
    [err, content] = await to (Comment.create(body));
    if (err) TE('생성 중 오류가 발생했습니다.');
    return content;
}
module.exports.createComment = createComment;

const createUser = async function (userInfo) {
    // console.log('createUser1()');
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
    [err, users] = await to(User.findAll( {attributes: ['u-id', 'name', 'email', 'level', 'point', 'level-start', 'level-end']} ));
    if (err) TE('불러오기에 실패하였습니다.' + JSON.stringify(err));

    return users;
}
module.exports.getUserList = getUserList;

const authUser = async function (userInfo) {//returns token
    let unique_key, err, user;
    const auth_info = {};
    auth_info.status = 'login';

    unique_key = getUniqueKeyFromBody(userInfo);

    if (!userInfo['u-id']) TE('ID를 올바르게 입력해주세요.');
    if (!userInfo['password']) TE('비밀번호를 올바르게 입력해주세요.');

    [err, user] = await to (User.findOne({ where: { 'u-id': unique_key }}));
    if (!user) TE('등록되지 않았습니다.');

    [err, user] = await to (user.comparePassword(userInfo['password']));
    if (!user) TE('패스워드가 맞지 않습니다.');
    
    if (err) TE(err.message);

    return user;
}
module.exports.authUser = authUser;

const hasUser = async function (userInfo) {
    [err, user] = await to(User.findOne({ where: { 'u-id': userInfo['u-id'] } }));
    
    if (user) return true;
    else return false;
}
module.exports.hasUser = hasUser;