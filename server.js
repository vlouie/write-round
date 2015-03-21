var express    = require('express');
var session    = require('express-session');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'passw0rd',
    database : 'write_round'
});

var app = express();

app.use(express.static('./www'));

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

app.get("/",function(req,res){
    connection.query('SELECT * from user', function(err, rows, fields) {
    connection.end();
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
    });
});

app.listen(3000);
//connection.connect();

//connection.query('SELECT * from user', function(err, rows, fields) {
  //if (!err)
    //console.log('The solution is: ', rows);
  //else
    //console.log('Error while performing Query.');
//});

//connection.end();
