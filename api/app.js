require('./config/config');
require('./global_functions');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const jade = require('jade');
const v1 = require('./routes/v1');
const cors = require('cors');

const app = express();

// CORS 설정
// print the request log on console
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//swap jade for ejs etc

app.use(express.static(path.join(__dirname, 'uploads')));


const models = require('./models');
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database.');

}).catch( err => {
    console.error('Error loading SQL database:', err);
})
if(CONFIG.app === 'We2Win') {
    // creates tables from models
    models.sequelize.sync();
    // for testing:
    // models.sequelize.sync({ force: true });
}

app.use(cors());


const DIR = './uploads/';
// const upload = multer({ dest: DIR });
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, DIR);
    },
    filename: function (request, file, callback) {
        let dateTimeStamp = Date.now();
        let originalFileName = file.originalname;

        originalFileName = originalFileName.split('.');
        let originalName = originalFileName[originalFileName.length - 1];

        callback(null, file.fieldname + '-' + dateTimeStamp + '.' + originalName);
    }
});
const upload = multer({ storage: storage }).array('userPhoto', 5);

// console.log(upload.array('uploads[]', 12));

// router.post('/upload', upload.array('uploads[]', 12), UploadController.upload);
app.post('/upload', upload.single('cin'), (req, res) => {
    upload(req, res, function(err) {
        console.log('req.body: ', req.body);
        console.log('req.files: ', req.files);
        if (err) {
            return res.end('Error uploading file.');
        }
        res.end('File is uploaded');
    });
});


// // CORS
// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers',
//     'X-Requested-With, content-type, Authorization, Content-Type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });

// Setup Routes and handle errors
app.use('/api/v1/', v1);

app.use('/api/', function (req, res) {
    res.statusCode = 200;//send the appropriate status code
    res.json({ status: "success", message: "Parcel Pending API", data: {} })
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

// module.exports = app;
app.listen(3000, () => console.log('Example app listening on port 3000!'));