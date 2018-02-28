const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');
// const CompanyController = require('./../controllers/CompanyController');
// const HomeController = require('./../controllers/HomeController');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');

console.log("HIIII");
// User Routes
router.get('/api', (req, res) => res.send('Hello!'));
router.get('/test', (req, res) => res.send('Hello World!'))

// router.post('/users', UserController.create); //create   

// router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);  //read

// router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update); //update

// router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove); //delete
// router.post('/users/login', UserController.login);

// // Company Routes
// router.post('/companies',
//     passport.authenticate('jwt', { session: false }), CompanyController.create);
// router.get('/companies', passport.authenticate('jwt', { session: false }), CompanyController.getAll);

// router.get('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.get);
// router.put('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.update);
// router.delete('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.remove);

module.exports = router;