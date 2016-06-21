var express = require('express'),
app = express(),
port = process.env.PORT || 8080,
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
multer = require('multer'),
upload = multer(),
ObjectId = require('mongodb').ObjectId,
_ = require('underscore'),
methodOverride = require('method-override');

var urlDB = 'mongodb://root:cefet17web@jello.modulusmongo.net:27017/a2dosAqa';
// MongoClient.connect(urlDB, function(err, db) {
//   console.log("Connected correctly to server.");
//   db.close();
// });

app.use(express.static(__dirname + '/../view/static/'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());


app.set('view engine', 'hbs');
app.set('views', __dirname + '/../view/');

app.get('/', function(req, res) {
  logRoute(req);
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
  logRoute(req);
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
  logRoute(req);
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGamesOn;
  console.log(user + '-' + login);
console.log('---------------------------------------');
  res.render('login' , '');
});

app.post('/make-login', function(req, res) {
  logRoute(req);
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
  logRoute(req);
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
  logRoute(req);
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGamesOn;
  console.log(user + '-' + login);
  console.log('---------------------------------------');
  res.render('registro' , '');
});

app.get('/logout', function(req, res) {
  logRoute(req);
  var login = req.cookies.loginGamesOn;
  var user = req.cookies.userGamesOn;
  console.log(user + '-' + login);
  res.clearCookie('loginGamesOn');
  res.clearCookie('userGamesOn');
  console.log('---------------------------------------');
  res.render('index' , '');
});

app.get('/novo-campeonato', function(req, res) {
  logRoute(req);
  var loginGamesOn = req.cookies.loginGamesOn;
  var userGamesOn = req.cookies.userGamesOn;
  console.log(userGamesOn + '-' + loginGamesOn);
  var dados = {
    loginGamesOn: loginGamesOn,
    userGamesOn: userGamesOn
  };
  console.log('---------------------------------------');
  res.render('novo-campeonato.hbs' , dados);
});

app.post('/novo-campeonato', function (req, res) {
  logRoute(req);
  console.log(req.body);
  var loginGamesOn = req.cookies.loginGamesOn;
  var userGamesOn = req.cookies.userGamesOn;
  console.log(userGamesOn + '-' + loginGamesOn);
  var dados = {
    loginGamesOn: loginGamesOn,
    userGamesOn: userGamesOn,
  };

  if(!dados.loginGamesOn){
    responseError(res, dados, 'Não há usuario logado!', 'novo-campeonato.hbs');
    return;
  }

  MongoClient.connect(urlDB, function(err, db) {
    if(err){
      console.log(err);
      responseError(res, dados, err.message, 'novo-campeonato.hbs');
      return;
    }

    console.log("Connected correctly to server.");
    db.collection('users').find(
      { "userGamesOn": userGamesOn }
    ).toArray(function(err, users) {
      if(err){
        console.log(err);
        responseError(res, dados, err.message, 'novo-campeonato.hbs');
        return;
      }

      console.log(users);
      if(users.length == 0){
        responseError(res, dados, 'Usuario não cadastrado!', 'novo-campeonato.hbs');
        return;
      }

      if(users[0].loginGamesOn !== loginGamesOn){
        responseError(res, dados, 'Usuario ou senha incorretos!!', 'novo-campeonato.hbs');
        return;
      }

      var numberCountEquipes = parseInt(req.body['count-equipes']);

      if(numberCountEquipes < 2){
        responseError(res, dados, 'Minimo de 2 equipes para um campeonato', 'novo-campeonato.hbs');
        return;
      }

      if(!isPotencia2(numberCountEquipes)){
        responseError(res, dados, 'Numeros de Equipes precisa ser potencia de 2', 'novo-campeonato.hbs');
        return;
      }

      var championship = {};
      var equipes = [];
      for (var i = 0; i < numberCountEquipes; i++){
        equipes[i] = req.body['equipe-'+(i+1)];
      }
      championship.nome = req.body['title-camp'];
      championship.equipes = equipes;
      championship.partidasTotais = numberCountEquipes-1;
      championship.partidasRealizadas = 0;
      championship.loginGamesOn = loginGamesOn;
      championship.quantidadeRodadas = Math.log2(numberCountEquipes);
      var rodadas = [];

      console.log('*********************************');
      shuffleEquipes = shuffle(equipes);
      for(var k = 0; k < championship.quantidadeRodadas; k++){
        var partidasRodada = [];
        var countPartidas = Math.pow(2, k);
        for(var i = 0, j = 0; j < countPartidas ; i += 2, j++){
          if((k+1) !== championship.quantidadeRodadas){
            partidasRodada[j] = {
              id: j,
              equipe1: '@id' + i + '#R' + (k+2),
              equipe2: '@id' + (i+1) + '#R' + (k+2),
              resultado1: '',
              resultado2: '',
            }
          }else{
            partidasRodada[j] = {
              id: j,
              equipe1: equipes[i],
              equipe2: equipes[i+1],
              resultado1: '',
              resultado2: '',
            }
          }
        }

        rodadas[k] = {
          rodada: '' + (k+1),
          partidas: partidasRodada
        }
        console.log(rodadas[k]);
      }
      console.log('*********************************');

      championship.rodadas = rodadas;
      console.log(championship);
      // console.log(partidasPrimeiraRodada);

      db.collection('championships').insert(championship, function(err, result) {
        if(err){
          console.log(err);
          responseError(res, dados, err.message, 'novo-campeonato.hbs');
          return;
        }
        console.log(result);

        console.log('---------------------------------------');
        if(result.insertedCount > 0){
          res.redirect(301, '/campeonato/' + result.insertedIds[0]);
        }else{
          res.redirect(301, '/');
        }
      });
    });
  });
});

app.get('/campeonato/:id', function (req, res) {
  logRoute(req);
  var loginGamesOn = req.cookies.loginGamesOn;
  var userGamesOn = req.cookies.userGamesOn;
  console.log(userGamesOn + '-' + loginGamesOn);
  console.log(req.params.id);
  var dados = {
    loginGamesOn: loginGamesOn,
    userGamesOn: userGamesOn,
  };

  if(!checkForHexRegExp.test(req.params.id)){
    res.redirect(301, '/lista-campeonatos');
    console.log('---------------------------------------');
    return;
  }

  MongoClient.connect(urlDB, function(err, db) {
    if(err){
      console.log(err);
      responseError(res, dados, err.message, 'lista-campeonatos.hbs');
      return;
    }
    console.log("Connected correctly to server.");

    db.collection('championships').find(
      { "_id": ObjectId(req.params.id) }
    ).toArray(function(err, championships) {
      if(err){
        console.log(err);
        responseError(res, dados, err.message, 'lista-campeonatos.hbs');
        return;
      }
      console.log(championships);

      if(championships.length === 0){
        res.redirect(301, '/lista-campeonatos');
        console.log('---------------------------------------');
        return;
      }

      console.log('---------------------------------------');
      dados.id = req.params.id;
      dados.equipes = championships[0].equipes;
      dados.nome = championships[0].nome;
      var porc = (championships[0].partidasRealizadas / championships[0].partidasTotais) * 100;
      dados.porcentagem = parseFloat(porc).toFixed(2) + "%";
      dados.rodadas = championships[0].rodadas;
      if(championships[0].loginGamesOn === loginGamesOn){
        dados.editar = true;
      }
      console.log(dados);
      res.render('campeonato.hbs' , dados);
      db.close();
    });
  });

});

app.get('/editar/:id', function (req, res) {
  logRoute(req);
  var loginGamesOn = req.cookies.loginGamesOn;
  var userGamesOn = req.cookies.userGamesOn;
  console.log(userGamesOn + '-' + loginGamesOn);
  console.log(req.params.id);
  var dados = {
    loginGamesOn: loginGamesOn,
    userGamesOn: userGamesOn,
  };

  if(!checkForHexRegExp.test(req.params.id)){
    res.redirect(301, '/lista-campeonatos');
    console.log('---------------------------------------');
    return;
  }

  MongoClient.connect(urlDB, function(err, db) {
    if(err){
      console.log(err);
      responseError(res, dados, err.message, 'lista-campeonatos.hbs');
      return;
    }
    console.log("Connected correctly to server.");

    db.collection('championships').find(
      { "_id": ObjectId(req.params.id) }
    ).toArray(function(err, championships) {
      if(err){
        console.log(err);
        responseError(res, dados, err.message, 'lista-campeonatos.hbs');
        return;
      }
      console.log(championships);
      if(championships.length === 0){
        res.redirect(301, '/lista-campeonatos');
        console.log('---------------------------------------');
        return;
      }

      if(championships[0].loginGamesOn !== loginGamesOn){
        res.redirect(301, '/campeonato/' + req.params.id);
        console.log("Usuario Nao permitido editar");
        console.log('---------------------------------------');
        return;
      }

      console.log('---------------------------------------');
      dados.id = req.params.id;
      dados.equipes = championships[0].equipes;
      dados.nome = championships[0].nome;
      var porc = (championships[0].partidasRealizadas / championships[0].partidasTotais) * 100;
      dados.porcentagem = parseFloat(porc).toFixed(2) + "%";
      dados.rodadas = championships[0].rodadas;
      dados.RodadaMax = dados.rodadas.length;
      dados.idMax = 0;
      for (var i in dados.rodadas){
        var partidasNew = dados.rodadas[i].partidas;
        dados.idMax = Math.max(partidasNew.length, dados.idMax);
        for (var j in partidasNew){
          if(checkNewRodada.test(partidasNew[j].equipe1) ||
              checkNewRodada.test(partidasNew[j].equipe2)){
            partidasNew[j].editavel = null;
          }else{
            partidasNew[j].editavel = true;
          }
          if(partidasNew[j].resultado1 !== ''){
            partidasNew[j].editavel = null;
          }
        }
      }
      dados.vencedor = championships[0].vencedor;
      console.log(dados);
      console.log('---------------------------------------');
      res.render('editar.hbs' , dados);
      db.close();
    });
  });
});

app.get('/lista-campeonatos', function(req, res) {
  logRoute(req);
  var loginGamesOn = req.cookies.loginGamesOn;
  var userGamesOn = req.cookies.userGamesOn;
  console.log(userGamesOn + '-' + loginGamesOn);
  var dados = {
    loginGamesOn: loginGamesOn,
    userGamesOn: userGamesOn
  };

  MongoClient.connect(urlDB, function(err, db) {
    if(err){
      console.log(err);
      console.log('---------------------------------------');
      res.redirect(301, '/');
      return;
    }
    console.log("Connected correctly to server.");
    db.collection('championships').find({ }
    ).toArray(function(err, championships) {
      if(err){
        console.log(err);
        console.log('---------------------------------------');
        res.redirect(301, '/');
        return;
      }
      var campeonatos = [];
      for (var index in championships) {
        var aux = {};
        aux.id = championships[index]._id;
        aux.nome = championships[index].nome;
        aux.countEquipes = championships[index].equipes.length;
        var porc = (championships[index].partidasRealizadas / championships[index].partidasTotais) * 100;
        aux.porcentagem = parseFloat(porc).toFixed(2) + "%";
        aux.vencedor = championships[index].vencedor;
        campeonatos[index] = aux;
      }
      dados.campeonatos = campeonatos;
      console.log(JSON.stringify(dados, null, '\t'));
      console.log('---------------------------------------');
      res.render('lista-campeonatos.hbs' , dados);
    });
  });
});

app.post('/editar', function (req, res) {
  logRoute(req);
  var loginGamesOn = req.cookies.loginGamesOn;
  var userGamesOn = req.cookies.userGamesOn;
  console.log(userGamesOn + '-' + loginGamesOn);
  console.log(req.body);
  var dados = {
    loginGamesOn: loginGamesOn,
    userGamesOn: userGamesOn,
  };


  if(!checkForHexRegExp.test(req.body.campeonato)){
    // res.redirect(301, '/lista-campeonatos');
    console.log("ID incorreto");
    console.log('---------------------------------------');
    res.redirect(301, '/editar/5764aab1bf15097e625e844b');
    return;
  }

  MongoClient.connect(urlDB, function(err, db) {
    if(err){
      console.log(err);
      console.log('---------------------------------------');
      res.redirect(301, '/lista-campeonatos');
      return;
    }
    console.log("Connected correctly to server.");

    db.collection('championships').find(
      { "_id": ObjectId(req.body.campeonato) }
    ).toArray(function(err, championships) {
      if(err){
        console.log(err);
        console.log('---------------------------------------');
        res.redirect(301, '/lista-campeonatos');
        return;
      }
      console.log(championships);
      if(championships.length === 0){
        console.log('---------------------------------------');
        res.redirect(301, '/lista-campeonatos');
        return;
      }

      if(championships[0].loginGamesOn !== loginGamesOn){
        res.redirect(301, '/campeonato/' + req.params.id);
        console.log("Usuario Nao permitido editar");
        console.log('---------------------------------------');
        return;
      }

      var rodadasInd = championships[0].rodadas;
      championships[0].partidasRealizadas++;
      var rodadaAtual = _.where(rodadasInd ,{ rodada: req.body.rodada });
      var partidaAtual = _.where(rodadaAtual[0].partidas, { id: parseInt(req.body.id) });
      partidaAtual[0].resultado1 = req.body['resultado-equipe1'];
      partidaAtual[0].resultado2 = req.body['resultado-equipe2'];
      console.log(partidaAtual[0]);

      var equipeWin;
      if(parseInt(req.body['resultado-equipe1']) > parseInt(req.body['resultado-equipe2'])){
        equipeWin = partidaAtual[0].equipe1;
      }else{
        equipeWin = partidaAtual[0].equipe2;
      }

      var condWhere = { rodada: "" + (parseInt(req.body.rodada)-1) };
      var rodadaAtualizada = _.where(rodadasInd, condWhere);

      console.log("partidaAtual---------------------");
      if(req.body.rodada !== '1'){
        var equipeAtualizar = '@id' + req.body.id + '#R' + req.body.rodada;
        for (var x in rodadaAtualizada[0].partidas) {
          if(rodadaAtualizada[0].partidas[x].equipe1 === equipeAtualizar){
            rodadaAtualizada[0].partidas[x].equipe1 = equipeWin;
          }
          if(rodadaAtualizada[0].partidas[x].equipe2 === equipeAtualizar){
            rodadaAtualizada[0].partidas[x].equipe2 = equipeWin;
          }
        }
      }else{
        championships[0].vencedor = equipeWin;
      }
      db.collection('championships').save(championships[0],function(err, result) {
        if(err){
          console.log(err);
          console.log('---------------------------------------');
          return;
          res.redirect(301 , '/editar/' + championships[0]._id);
        }
        console.log(result.result);
        console.log('---------------------------------------');
        console.log(JSON.stringify(championships[0], null, '\t'));
        res.redirect(301 , '/editar/' + championships[0]._id);
        db.close();
      });
    });
  });
});

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }

    res.render('erro', {});
});

var server = app.listen(port, function () {
  console.log('Server Listen : ' + port);
});

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
var checkNewRodada = (new RegExp("^@id[0-9]#R[0-9]$"));

function responseError(res, dados, error, url){
  console.log('---------------------------------------');
  dados.error = error;
  res.render(url , dados);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};

function isPotencia2(n) {
	if (n%2 != 0){
		return false;
	}
	var contador = 1;
	while(n != 2){
	    n = n/2;
	    if (n%2 == 0){
	         contador++;
	    }
	    else {
	    	return false;
	    }
	}
	return true;
}

function logRoute(req){
  consoleTime()
  console.log(req.path + ' - ' + req.ip);
}

function consoleTime(){
  var now = new Date;
  console.log(now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + ' - ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds());
}
