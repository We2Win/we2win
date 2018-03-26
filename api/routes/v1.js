const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const ContentController = require('./../controllers/ContentController');
// const CompanyController = require('./../controllers/CompanyController');
// const HomeController = require('./../controllers/HomeController');

// const custom = require('./../middleware/custom');

const passport = require('passport');

// User Routes

router.post('/users', UserController.create); //create   
// router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);  //read
// router.get('/users', UserController.get);

router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update); //update

router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove); //delete
router.post('/users/login', UserController.login);

router.get('/testing', (req, res) => { res.send('Testing Successful.'); });
router.post('/testing', (req, res) => { res.send(JSON.stringify(req.body)); });

router.post('/contents', ContentController.create);
router.get('/contents', ContentController.get);
router.delete('/contents', ContentController.remove);

router.get('/contents/report', ContentController.getInfoList);
router.get('/contents/news', ContentController.getNewsList);
router.get('/contents/law', ContentController.getLawList);
router.get('/contents/apartment', ContentController.getApartmentList);
router.get('/contents/officetel', ContentController.getOfficetelList);
router.get('/contents/commercial', ContentController.getCommercialList);
router.get('/contents/ground', ContentController.getGroundList);
router.get('/contents/employee', ContentController.getEmployeeList);
router.get('/contents/employer', ContentController.getEmployerList);
router.get('/contents/meeting', ContentController.getMeetingList);

router.get('/contents/report/:id', ContentController.getInfoList);
router.get('/contents/news/:id', ContentController.getNewsList);
router.get('/contents/law/:id', ContentController.getLawList);
router.get('/contents/apartment/:id', ContentController.getApartmentList);
router.get('/contents/officetel/:id', ContentController.getOfficetelList);
router.get('/contents/commercial/:id', ContentController.getCommercialList);
router.get('/contents/ground/:id', ContentController.getGroundList);
router.get('/contents/employee/:id', ContentController.getEmployeeList);
router.get('/contents/employer/:id', ContentController.getEmployerList);
router.get('/contents/meeting/:id', ContentController.getMeetingList);

router.post('/login', UserController.login); //login   

router.post('/hasid', UserController.hasId);

router.get('/mng/users', UserController.get);
router.get('/mng/dashboard', ContentController.getDashboard);
module.exports = router;