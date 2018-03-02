const User = require('./../models').User;
const validator = require('validator');

const getUniqueKeyFromBody = function (body) {
    let unique_key = body.ID;

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function (userInfo) {
    let unique_key, auth_info, err;

    auth_info = {}
    auth_info.status = 'create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if (!unique_key) TE('ID를 입력하지 않았습니다.');

    auth_info.method = 'ID';
    userInfo.ID = unique_key;

    [err, user] = await to (User.create(userInfo));
    if (err) TE('생성 중 오류가 발생했습니다.');

    User.beforeSave(user);
    return user;
}
module.exports.createUser = createUser;

const authUser = async function (userInfo) {//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if (!unique_key) TE('ID를 올바르게 입력해주세요.');
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