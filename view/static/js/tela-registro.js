var botaoRegistrar = document.getElementById('botao-make-register');
var boxErroRegistro = document.getElementById('box-erro-registro');
var nomeGamesOn = document.getElementById('nomeGamesOn');
var emailGamesOn = document.getElementById('emailGamesOn');
var userGamesOn = document.getElementById('userGamesOn');
var senhaGamesOn = document.getElementById('senhaGamesOn');
var confirmPasswordGamesOn = document.getElementById('confirmPasswordGamesOn');


botaoRegistrar.addEventListener('click', registrar);
nomeGamesOn.addEventListener("keyup", clickRegister);
emailGamesOn.addEventListener("keyup", clickRegister);
userGamesOn.addEventListener("keyup", clickRegister);
senhaGamesOn.addEventListener("keyup", clickRegister);
confirmPasswordGamesOn.addEventListener("keyup", clickRegister);

function clickRegister(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("botao-make-register").click();
    }
}

function registrar(e){
	var makeRequest = true;
	removerFocusIncorreto(nomeGamesOn, emailGamesOn, userGamesOn, senhaGamesOn, confirmPasswordGamesOn);
	ocultarBox(boxErroRegistro);
	var stringErro = 'Campos incorretos <br>';
	if(nomeGamesOn.value === '' || nomeGamesOn.value === 'undefined'){
			stringErro += '- Nome em branco <br>';
			focarCampoIncorreto(nomeGamesOn);
			makeRequest = false;
	}else if(nomeGamesOn.value.length < 6){
		stringErro += '- Nome sem tamanho minimo (minimo 6) <br>';
		focarCampoIncorreto(nomeGamesOn);
		makeRequest = false;
	}

	if(!validateEmail(emailGamesOn.value)){
		stringErro += '- Email incorreto <br>';
		focarCampoIncorreto(emailGamesOn);
		makeRequest = false;
	}

	if(userGamesOn.value === '' || userGamesOn.value === 'undefined'){
			stringErro += '- Usuário em branco <br>';
			focarCampoIncorreto(userGamesOn);
			makeRequest = false;
	}else if(userGamesOn.value.length < 6){
		stringErro += '- Usuário sem tamanho minimo (minimo 6) <br>';
		focarCampoIncorreto(userGamesOn);
		makeRequest = false;
	}

	var booleanSenhaBranco = false;
	if(senhaGamesOn.value === '' || senhaGamesOn.value === 'undefined'){
			stringErro += '- Senha em branco <br>';
			focarCampoIncorreto(senhaGamesOn);
			focarCampoIncorreto(confirmPasswordGamesOn);
			makeRequest = false;
			booleanSenhaBranco = true;
	}else if(senhaGamesOn.value.length < 6){
		stringErro += '- Senha sem tamanho minimo (minimo 6) <br>';
		focarCampoIncorreto(senhaGamesOn);
		makeRequest = false;
	}else if(senhaGamesOn.value.indexOf(' ') !== -1){
		stringErro += '- Senha com espaço em branco <br>';
		focarCampoIncorreto(senhaGamesOn);
		makeRequest = false;
	}

	if(!booleanSenhaBranco){
		if(senhaGamesOn.value !== confirmPasswordGamesOn.value){
			stringErro += '- Senha é confirmacao não são iguais <br>';
			focarCampoIncorreto(senhaGamesOn);
			focarCampoIncorreto(confirmPasswordGamesOn);
			makeRequest = false;
		}
	}

  var data = {
    nomeGamesOn: nomeGamesOn.value,
		emailGamesOn: emailGamesOn.value,
		userGamesOn: userGamesOn.value,
		loginGamesOn: encode(userGamesOn.value + '-' + senhaGamesOn.value)
	};

	if(!makeRequest){
		boxErroRegistro.classList.remove('oculto');
		boxErroRegistro.innerHTML = stringErro;
	}else{
		var request = new XMLHttpRequest();
		request.open('POST', '/make-register', true);
		request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		request.onreadystatechange = function() {
				if (request.readyState == XMLHttpRequest.DONE) {
					if(request.status === 200){
						var response = JSON.parse(request.responseText);
						if(response.success === true){
							window.location.href = '/';
						}else{
							boxErroRegistro.classList.remove('oculto');
							boxErroRegistro.innerHTML = response.message;
						}
					}else{
							alert(request.responseText);
					}
				}
		}
		request.send(JSON.stringify(data));
	}
	//alert(JSON.stringify(data));box-erro-registro

}

function ocultarBox(box){
	if(!box.classList.contains('oculto')){
		box.classList.add('oculto');
	}
}

function removerFocusIncorreto(){
	for (var i = 0; i !== arguments.length; i++) {
    arguments[i].classList.remove('campo-incorreto');
		arguments[i].classList.add('campo-correto');
  }
}

function focarCampoIncorreto(campo){
	campo.classList.remove('campo-correto');
	campo.classList.add('campo-incorreto');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function encode (stringToEncode) { // eslint-disable-line camelcase

  if (typeof window !== 'undefined') {
    if (typeof window.btoa !== 'undefined') {
      return window.btoa(escape(encodeURIComponent(stringToEncode)))
    }
  } else {
    return new Buffer(stringToEncode).toString('base64')
  }

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var o1
  var o2
  var o3
  var h1
  var h2
  var h3
  var h4
  var bits
  var i = 0
  var ac = 0
  var enc = ''
  var tmpArr = []

  if (!stringToEncode) {
    return stringToEncode
  }

  stringToEncode = unescape(encodeURIComponent(stringToEncode))

  do {
    // pack three octets into four hexets
    o1 = stringToEncode.charCodeAt(i++)
    o2 = stringToEncode.charCodeAt(i++)
    o3 = stringToEncode.charCodeAt(i++)

    bits = o1 << 16 | o2 << 8 | o3

    h1 = bits >> 18 & 0x3f
    h2 = bits >> 12 & 0x3f
    h3 = bits >> 6 & 0x3f
    h4 = bits & 0x3f

    // use hexets to index into b64, and append result to encoded string
    tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
  } while (i < stringToEncode.length)

  enc = tmpArr.join('')

  var r = stringToEncode.length % 3

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
}
