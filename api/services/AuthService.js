const User = require('./../models').User;
const Content = require('./../models').Content;
const Info = require('./../models').Info;
const News = require('./../models').News;
const Law = require('./../models').Law;
const Site = require('./../models').Site;
const Meeting = require('./../models').Meeting;
const Employer = require('./../models').Employer;
const Employee = require('./../models').Employee;
const validator = require('validator');

const getUniqueKeyFromBody = function (body) {
    let unique_key = body.ID;

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createInfo = async function (data) {
    console.log('createInfo() Starting');
    
    console.log(JSON.stringify(data));
    [err, info] = await to (Info.create(data));
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

const createUser = async function (userInfo) {
    console.log('createUser1()');
    let auth_info, err;

    auth_info = {}
    auth_info.status = 'create';

    if (!userInfo.ID) TE('ID를 입력하지 않았습니다.');

    auth_info.method = 'ID';

    console.log(JSON.stringify(userInfo));
    [err, user] = await to (User.create(userInfo));
    if (err) TE('생성 중 오류가 발생했습니다. (createUser())');

    console.log('createUser()');
    User.beforeSave(user);
    return user;
}
module.exports.createUser = createUser;

const authUser = async function (userInfo) {//returns token
    let auth_info = {};
    auth_info.status = 'login';

    if (!userInfo.ID) TE('ID를 올바르게 입력해주세요.');
    if (!userInfo.Password) TE('비밀번호를 올바르게 입력해주세요.');

    let user;

    [err, user] =await to (User.findOne({ where: { ID: unique_key }}));

    if (!user) TE('Not registered');

    console.log(user.Password, userInfo.Password);

    // [err, user] = await to(user.comparePassword(userInfo.Password));

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

// const Company = require('../models').Company;

// const create = async function (req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     let err, company;
//     let user = req.user;

//     let company_info = req.body;


//     [err, company] = await to(Company.create(company_info));
//     if (err) return ReE(res, err, 422);

//     company.addUser(user, { through: { status: 'started' } })

//     [err, company] = await to(company.save());
//     if (err) return ReE(res, err, 422);

//     let company_json = company.toWeb();
//     company_json.users = [{ user: user.id }];

//     return ReS(res, { company: company_json }, 201);
// }
// module.exports.create = create;

// const getAll = async function (req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     let user = req.user;
//     let err, companies;

//     [err, companies] = await to(user.getCompanies());

//     let companies_json = []
//     for (let i in companies) {
//         let company = companies[i];
//         let users = await company.getUsers()
//         let company_info = company.toWeb();
//         let users_info = []
//         for (let i in users) {
//             let user = users[i];
//             // let user_info = user.toJSON();
//             users_info.push({ user: user.id });
//         }
//         company_info.users = users_info;
//         companies_json.push(company_info);
//     }

//     return ReS(res, { companies: companies_json });
// }
// module.exports.getAll = getAll;

// const get = function (req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     let company = req.company;

//     return ReS(res, { company: company.toWeb() });
// }
// module.exports.get = get;

// const update = async function (req, res) {
//     let err, company, data;
//     company = req.company;
//     data = req.body;
//     company.set(data);

//     [err, company] = await to(company.save());
//     if (err) {
//         return ReE(res, err);
//     }
//     return ReS(res, { company: company.toWeb() });
// }
// module.exports.update = update;

// const remove = async function (req, res) {
//     let company, err;
//     company = req.company;

//     [err, company] = await to(company.destroy());
//     if (err) return ReE(res, 'error occured trying to delete the company');

//     return ReS(res, { message: 'Deleted Company' }, 204);
// }
// module.exports.remove = remove;