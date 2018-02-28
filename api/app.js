require('./config/config');
require('./global_functions');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const v1 = require('./routes/auth/v1');
const mysql = require('mysql');
// const connection = mysql.createConnection();
// const port = process.env.PORT || 3000;

const app = express();

// app.use(logger('dev'));
app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())
// print the request log on console
app.use(morgan('dev'))
app.use(passport.initialize());
// app.set('port', port);


const models = require('./models');
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database.');
}).catch( err => {
    console.error('Error loading SQL database:', err);
})
if(CONFIG.app === 'development') {
    // creates tables from models
    models.sequelize.sync();
    // for testing:
    // models.sequelize.sync({ force: true });
}

// CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Setup Routes and handle errors
app.use('/api/v1', v1);

app.use('/api', function (req, res) {
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
    res.render('error');
});

app.get('/api/todo', (req, res) => res.send('Hello!'));

module.exports = app;


// app.get('/api/users', (req, res) => {
//   console.log(users);

//   connection.query('SELECT * from `01011803`', function (err, rows, fields) {
//     if (!err) {
//       console.log('The solution is: ', rows);
//       res.send(rows);
//     } else {
//       console.log('Error while performing Query.', err);
//     }
//   });
// });




// app.listen(3000, () => {
//   console.log('Example app listening on port ${port}');
// });
