const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const ContentController = require('./../controllers/ContentController');

const passport = require('passport');

// User Routes

router.post('/users', UserController.create); //create   
// router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);  //read
// router.get('/users', UserController.get);

router.put('/users', UserController.editUser);
// router.put('/users', passport.authenticate('jwt', {
//   session: false
// }), UserController.update); //update

// router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove); //delete
router.post('/users/login', UserController.login);
router.get('/users/verify', UserController.verify);
router.get('/users/verify2', UserController.verify2);
router.post('/users/findId', UserController.findId);
router.post('/users/findPassword', UserController.findPassword);
router.get('/users/sendEmail', UserController.sendEmail2);

router.get('/testing', (req, res) => {
  res.send('Testing Successful.');
});
router.post('/testing', (req, res) => {
  res.send(JSON.stringify(req.body));
});


router.post('/contents', ContentController.createContents);
// router.get('/contents', ContentController.get);
router.delete('/contents/:type/:cid', ContentController.deleteContent);


router.get('/search/:id/:pages', ContentController.searchContents);

router.post('/contents/comments', ContentController.createComments);
router.get('/contents/comments/:cid', ContentController.getComments);
router.delete('/contents/comments/:cid/:uid', ContentController.deleteComment);

router.post('/contents/isbookmarked', ContentController.isBookmarked);

router.put('/contents/employer', ContentController.createEmployer);
router.put('/contents/employee', ContentController.createEmployee);

// For Infos and Sites
router.get('/contents/:page/:list/:sort/:id', ContentController.getContentsList);
router.get('/contents/:page/:list', ContentController.getContentsList);
router.put('/contents', ContentController.updateContent);

// For Employee/Employer and Meeting
router.get('/simples/:page/:sort/:id', ContentController.getSimplesList)

// Detailed View
router.get('/detail/:page/:id', ContentController.getContentsDetail);


router.get('/file/:cid', ContentController.getFilePath);


router.post('/login', UserController.login); //login   
router.post('/login/kakao', UserController.loginWithKakao); //login   
router.post('/hasid', UserController.hasId);
router.post('/userInfo', UserController.detailedInfo);

router.put('/bookmark/add', UserController.addBookmark);
router.post('/bookmark/remove', UserController.removeBookmark);
router.get('/bookmark/:id', UserController.getBookmark);
// router.get('/bookmark/:id', UserController.hasBookmark);
// router.get('/mng/dash', ContentController.getDashboardData);

router.put('/schedule/add', UserController.addSchedule);
router.post('/schedule/remove', UserController.removeSchedule);
router.get('/schedule', UserController.getSchedule);

router.get('/countShare/:cid', ContentController.countShare);
// router.get('/check', UserController.checkStatus);

router.get('/mng/dashboard/users', UserController.getDashBoardData);
router.get('/mng/dashboard/contents', ContentController.getDashBoardData);
router.get('/mng/users/:level/:amount/:id', UserController.getUsers);
router.get('/mng/users/:query', UserController.getUsersByQuery);
router.delete('/mng/users/:id', UserController.removeUser); //delete
// router.get('/mng/contents/:level/:amount/:id', ContentController.getContents);
router.get('/mng/contents/:query', ContentController.getContentsByQuery);
router.get('/mng/contents/count', ContentController.getCount);
router.get('/mng/contents/meeting', ContentController.getMeetingTitles);
router.get('/mng/employers', ContentController.getEmployers);
router.get('/mng/employees', ContentController.getEmployees);
router.post('/mng/employers', ContentController.confirmEmployers);
router.post('/mng/employees', ContentController.confirmEmployees);

module.exports = router;
