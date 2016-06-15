var botaoLogin = document.getElementById('botao-make-login');
var boxErroRegistro = document.getElementById('box-erro-registro');
var userGamesOn = document.getElementById('userGamesOn');
var senhaGamesOn = document.getElementById('senhaGamesOn');

botaoLogin.addEventListener('click', login);
userGamesOn.addEventListener("keyup", clickRegister);
senhaGamesOn.addEventListener("keyup", clickRegister);

function clickRegister(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("botao-make-login").click();
    }
}

function login(e){
	var makeRequest = true;
	removerFocusIncorreto(userGamesOn, senhaGamesOn);
	ocultarBox(boxErroRegistro);

	var stringErro = 'Campos incorretos <br>';
	if(userGamesOn.value === '' || userGamesOn.value === 'undefined'){
			stringErro += '- Usuário em branco <br>';
			focarCampoIncorreto(userGamesOn);
			makeRequest = false;
	}
	if(senhaGamesOn.value === '' || senhaGamesOn.value === 'undefined'){
			stringErro += '- Senha em branco <br>';
			focarCampoIncorreto(senhaGamesOn);
			makeRequest = false;
	}

	if(!makeRequest){
		boxErroRegistro.classList.remove('oculto');
		boxErroRegistro.innerHTML = stringErro;
	}else{
		var data = {
			userGamesOn: userGamesOn.value,
			loginGamesOn: encode(userGamesOn.value + '-' + senhaGamesOn.value)
		};
		var request = new XMLHttpRequest();
		request.open('POST', '/make-login', true);
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
