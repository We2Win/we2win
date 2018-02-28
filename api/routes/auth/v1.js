const express = require('express');
const router = express.Router();

const UserController = require('./../../controllers/UserController');
// const CompanyController = require('./../../controllers/CompanyController');
// const HomeController = require('./../../controllers/HomeController');

const custom = require('./../../middleware/custom');

const passport = require('passport');
const path = require('path');

// User Routes
router.get('/api', (req, res) => res.send('Hello!'));
router.get('/', (req, res) => res.send('Hello2!'));
router.get('/api2', (req, res) => res.send('Hello3!'));
router.post('/api/users', UserController.create); //create   

router.get('/api/users', passport.authenticate('jwt', { session: false }), UserController.get);  //read

router.put('/api/users', passport.authenticate('jwt', { session: false }), UserController.update); //update

router.delete('/api/users', passport.authenticate('jwt', { session: false }), UserController.remove); //delete
router.post('/api/users/login', UserController.login);

// // Company Routes
// router.post('/companies',
//     passport.authenticate('jwt', { session: false }), CompanyController.create);
// router.get('/companies', passport.authenticate('jwt', { session: false }), CompanyController.getAll);

// router.get('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.get);
// router.put('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.update);
// router.delete('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.remove);

module.exports = router;