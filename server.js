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
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');

app.use(bodyParser.json());
app.use(express.static('./www'));
app.use(express.static('./lib'));
app.use(session({secret: 'ssshhhhh'}));

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

var sess;
app.get('/',function(req,res){
    sess = req.session;
    if (sess.user_id){
        res.render('index.html');
    }
    else {
        res.redirect('login.html');
    }
});

app.post('/login',function(req,res){

    sess = req.session;
    var hash = bcrypt.hashSync(req.body.password);

    connection.query({
      sql: 'SELECT user.* from user where user.username = ?',
      timeout: 40000, // 40s
      values: [req.body.username]
      }, function(err, rows, fields) {
        if (!err){
          console.log(rows);
          if (bcrypt.compareSync(rows[0].password, hash)) {
            sess.username = rows[0].username;
            sess.user_id = rows[0].id;
            console.log('yay the password is correct!');
            res.send('loginSuccess', 200);
          }
          else {
            console.log('wrong password');
            res.send('incorrectPassword', 403);
          }
        }
        else{
          console.log('Error while performing Query.');
          res.send('databaseFail', 500);
        }
    });

    //res.end('done');
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

//app.get("/",function(req,res){
    //connection.query('SELECT * from user', function(err, rows, fields) {
    //if (!err)
      //console.log('The solution is: ', rows);
    //else
      //console.log('Error while performing Query.');
    //});
//});

app.listen(3000);
//connection.connect();

//connection.end();
