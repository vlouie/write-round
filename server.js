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

    connection.query({
      sql: 'SELECT user.* from user where user.username = ?',
      timeout: 40000, // 40s
      values: [req.body.username]
      }, function(err, rows, fields) {
        if (!err){
          console.log(rows);
          //sess.username = req.body.username;
          sess.username = rows[0].username;
          sess.user_id = rows[0].id;
          // TODO add logic to match passwords
        }
        else{
          console.log('Error while performing Query.');
        }
    });

    res.end('done');
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
