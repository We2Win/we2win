const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const ContentController = require('./../controllers/ContentController');
const InfoController = require('./../controllers/InfoController');
// const CompanyController = require('./../controllers/CompanyController');
// const HomeController = require('./../controllers/HomeController');

// const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');

// User Routes

router.post('/users', UserController.create); //create   


// router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);  //read
router.get('/users', UserController.get);

router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update); //update

router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove); //delete
router.post('/users/login', UserController.login);

router.get('/testing', (req, res) => { res.send('Testing Successful.'); });

router.post('/contents', ContentController.create);
router.get('/contents', ContentController.get);
router.delete('/contents', ContentController.remove);

router.post('/infos', InfoController.create);
router.get('/infos', InfoController.get);
router.delete('/infos', InfoController.remove);

// // Company Routes
// router.post('/companies',
//     passport.authenticate('jwt', { session: false }), CompanyController.create);
// router.get('/companies', passport.authenticate('jwt', { session: false }), CompanyController.getAll);

// router.get('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.get);
// router.put('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.update);
// router.delete('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.remove);

module.exports = router;