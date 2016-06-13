var express = require('express'),
app = express(),
port = 3000,
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(__dirname + '/../view/static/'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/../view/');

app.get('/', function(req, res) { // usa cookie ou 'english'
  logRoute(req)
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGameson;
  console.log(user + '-' + login);
  res.render('index' , '');
});

app.get('/index.html', function(req, res) { // usa cookie ou 'english'
  logRoute(req)
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGameson;
  console.log(user + '-' + login);
  res.render('index' , '');
});

app.get('/login.html', function(req, res) { // usa cookie ou 'english'
  logRoute(req)
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGameson;
  console.log(user + '-' + login);
  res.render('login' , '');
});

app.post('/make-login', function(req, res) {
  logRoute(req)
  var user = req.body.user,
  login = req.body.login;
  console.log(req.body);
  res.cookie('loginGamesOn', login);
  res.cookie('userGameson', user);

  //TODO: Procurar uma formar melhor de responder pra front
  res.json(req.body);
});

app.post('/make-register', function(req, res) {
  logRoute(req)
  var userGameOn = req.body.userGameOn,
  loginGameOn = req.body.loginGameOn;
  console.log(req.body);
  res.cookie('loginGamesOn', loginGameOn);
  res.cookie('userGameson', userGameOn);

  //TODO: Procurar uma formar melhor de responder pra front
  res.json(req.body);
});

app.get('/registro.html', function(req, res) { // usa cookie ou 'english'
  logRoute(req)
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGameson;
  console.log(user + '-' + login);
  res.render('registro' , '');
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
