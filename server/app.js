var express = require('express'),
app = express(),
port = 3000,
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
MongoClient = require('mongodb').MongoClient,
assert = require('assert');

var urlDB = 'mongodb://root:cefet17web@jello.modulusmongo.net:27017/a2dosAqa';
// MongoClient.connect(urlDB, function(err, db) {
//   console.log("Connected correctly to server.");
//   db.close();
// });

app.use(cookieParser());
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + '/../view/static/'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/../view/');

app.get('/', function(req, res) {
  logRoute(req)
  var loginGamesOn = req.cookies.loginGamesOn;
  var userGamesOn = req.cookies.userGamesOn;
  console.log(userGamesOn + '-' + loginGamesOn);
  console.log('---------------------------------------');
  var dados = {
    loginGamesOn: loginGamesOn,
    userGamesOn: userGamesOn
  };
  res.render('index' , dados);
});

app.get('/index.html', function(req, res) {
  logRoute(req)
  var loginGamesOn = req.cookies.loginGamesOn;
  var userGamesOn = req.cookies.userGamesOn;
  console.log(userGamesOn + '-' + loginGamesOn);
  console.log('---------------------------------------');
  var dados = {
    loginGamesOn: loginGamesOn,
    userGamesOn: userGamesOn
  };
  res.render('index' , dados);
});

app.get('/login.html', function(req, res) {
  logRoute(req)
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGamesOn;
  console.log(user + '-' + login);
console.log('---------------------------------------');
  res.render('login' , '');
});

app.post('/make-login', function(req, res) {
  logRoute(req)
  var loginGamesOn = req.body.loginGamesOn,
  userGamesOn = req.body.userGamesOn;
  console.log(req.body);
  var resBody = {
      success: false
  };

  MongoClient.connect(urlDB, function(err, db) {
    if(err){
      console.log(err);
      resBody.success = false;
      console.log('---------------------------------------');
      res.json(resBody);
    }else{
      console.log("Connected correctly to server.");
      db.collection('users').find(
        { "userGamesOn": userGamesOn }
      ).toArray(function(err, users) {
        if(err){
          console.log(err);
          resBody.success = false;
        }else{
          console.log(users);
          if(users.length > 0 && users[0].loginGamesOn === loginGamesOn){
            resBody.success = true;
            res.cookie('loginGamesOn', loginGamesOn);
            res.cookie('userGamesOn', userGamesOn);
          }else{
            resBody.success = false;
            resBody.message = 'Usuario e/ou senha incorretos';
          }
        }
        console.log('---------------------------------------');
        res.json(resBody);
      });
    }
  });
  // res.cookie('loginGamesOn', login);
  // res.cookie('userGamesOn', user);

  //TODO: Procurar uma formar melhor de responder pra front
});

app.post('/make-register', function(req, res) {
  logRoute(req)
  var userGamesOn = req.body.userGamesOn,
  emailGamesOn = req.body.emailGamesOn,
  nomeGamesOn = req.body.nomeGamesOn,
  loginGamesOn = req.body.loginGamesOn;
  console.log(req.body);
  var resBody = {
      success: true,
  };

  MongoClient.connect(urlDB, function(err, db) {
    if(err){
      console.log(err);
      resBody.success = false;
      console.log('---------------------------------------');
      res.json(resBody);
    }else{
      console.log("Connected correctly to server.");
      db.collection('users').find(
        { "userGamesOn": userGamesOn }
      ).toArray(function(err, users) {
          if(err){
            console.log(err);
            resBody.success = false;
            console.log('---------------------------------------');
            res.json(resBody);
          }else{
            console.log(users);
            if(users.length > 0){
              resBody.success = false;
              resBody.message = 'Usuario ja cadastrado';
              console.log('---------------------------------------');
              res.json(resBody);
            }else{
              resBody.success = true;
              db.collection('users').insertOne({
                  nomeGamesOn: nomeGamesOn,
              		emailGamesOn: emailGamesOn,
              		userGamesOn: userGamesOn,
              		loginGamesOn: loginGamesOn
              },function(err, result) {
                assert.equal(err, null);
                console.log("Novo usuario inserido");
                console.log('---------------------------------------');
                resBody.success = true;
                res.cookie('loginGamesOn', loginGamesOn);
                res.cookie('userGamesOn', userGamesOn);
                res.json(resBody);
              });
            }
          }
      });
    }
  });

  // console.log('---------------------------------------');
  // if (resBody.sucess){
  //   res.cookie('loginGamesOn', loginGamesOn);
  //   res.cookie('userGamesOn', userGamesOn);
  // }
  // res.json(resBody);
});

app.get('/registro.html', function(req, res) {
  logRoute(req)
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGamesOn;
  console.log(user + '-' + login);
  console.log('---------------------------------------');
  res.render('registro' , '');
});

app.get('/logout', function(req, res) {
  logRoute(req)
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGamesOn;
  console.log(user + '-' + login);
  res.clearCookie('loginGamesOn');
  res.clearCookie('userGamesOn');
  console.log('---------------------------------------');
  res.render('index' , '');
});

var server = app.listen(port, function () {
  console.log('Server Listen : ' + port);
});

function logRoute(req){
  consoleTime()
  console.log(req.path + ' - ' + req.ip);
}

function consoleTime(){
  var now = new Date;
  console.log(now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + ' - ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds());
}
