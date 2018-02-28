const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

let users = [{
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'bek'
  },
  {
    id: 3,
    name: 'chris'
  }
]

app.set('port', process.env.PORT || 3000);


app.get('/api', (req, res) => {
  res.send('Root');
    // return 'hi';
});

app.get('/users', (req, res) => {
  console.log(users);

  connection.query('SELECT * from `01011803`', function (err, rows, fields) {
    if (!err) {
      console.log('The solution is: ', rows);
      res.send(rows);
    } else {
      console.log('Error while performing Query.', err);
    }
  });
});

// app.get('/users:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (!id) {
//     return res.status(400).json({
//       error: 'Incorrect id'
//     });
//   }
// });




app.listen(3000, () => {
  console.log('Example app listening on port ' + app.get('port'));
});
