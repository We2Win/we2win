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


router.post('/login', UserController.login); //login   



const DIR = './uploads/';
// const upload = multer({ dest: DIR });
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, DIR);
    },
    filename: function (request, file, callback) {
        // let dateTimeStamp = Date.now();
        // let originalFileName = file.originalname;

        // originalFileName = originalFileName.split('.');
        // let originalName = originalFileName[originalFileName.length - 1];

        // callback(null, file.fieldname + '-' + dateTimeStamp + '.' + originalName);
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).array('files[]', 5);

// console.log(upload.array('uploads[]', 12));

// router.post('/upload', upload.array('uploads[]', 12), UploadController.upload);
router.post('/upload', upload, (req, res) => {
    // return res.end({'hell': 'hello'});
    console.log('files: ', req.files);
    res.send(req.files);
    // upload(req, res, function (err) {
    //     console.log('req.body: ', req.body);
    //     console.log('req.files: ', req.files);
    //     if (err) {
    //         return res.end('Error uploading file.');
    //     }
    //     res.end('File is uploaded');
    // });
});

module.exports = router;