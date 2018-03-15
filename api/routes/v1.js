const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const ContentController = require('./../controllers/ContentController');
const UploadController = require('./../controllers/UploadController');
// const CompanyController = require('./../controllers/CompanyController');
// const HomeController = require('./../controllers/HomeController');

// const custom = require('./../middleware/custom');

const passport = require('passport');

// User Routes

router.post('/users', UserController.create(req, res)); //create   


// router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);  //read
router.get('/users', UserController.get);

router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update); //update

router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove); //delete
router.post('/users/login', UserController.login);

router.get('/testing', (req, res) => { res.send('Testing Successful.'); });
router.post('/testing', (req, res) => { res.send(JSON.stringify(req)); });

router.post('/contents', ContentController.create);
router.get('/contents', ContentController.get);
router.delete('/contents', ContentController.remove);


router.post('/login', UserController.login); //login   

router.post('/hasid', UserController.hasId);

module.exports = router;