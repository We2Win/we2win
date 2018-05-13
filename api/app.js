require('./config/config');
require('./global_functions');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const jade = require('jade');
// const v1 = require('./routes/v1');
const v2 = require('./routes/v2');
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

// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const models = require('./models');
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database..');
}).catch( err => {
    console.error('Error loading SQL database:', err);
})
if(CONFIG.app === 'We2Win') {
    // creates tables from models
    // models.sequelize.sync();
    // for testing:
    // models.sequelize.sync({ force: true });
}


app.use(cors());

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
// app.use('/api/v1/', v1);
app.use('/api/v2/', v2);


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
app.listen(3000, () => console.log('App listening on port 3000!'));