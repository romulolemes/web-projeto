var adicionarEquipe = document.getElementById('adiciona-equipe');
var removerEquipes = document.getElementById('remover-equipes');
var divEquipes = document.getElementById('equipes-participantes');
var countEquipes = document.getElementById('count-equipes');
var countParticipantes = 0;

adicionarEquipe.addEventListener('click', function(e) {
	countParticipantes++;
	divEquipes.innerHTML += '<p>' +
	'<label for=\"Equipe '+ countParticipantes +'\">Equipe '+ countParticipantes +': </label>'+
	'<input type="text" name=\"equipe-'+ countParticipantes +'\" required>'+
	'</p>';
	countEquipes.value = countParticipantes + '';
});

removerEquipes.addEventListener('click', function(e) {
	countParticipantes = 0;
	divEquipes.innerHTML = '';
	countEquipes.value = countParticipantes + '';
});


// <label for="Nome">Nome: </label>
// <input type="text" id="nome">
// botaoRolar.addEventListener('click', function(e) {
// 	var quantPart = document.getElementById('quantPart');
// 	valueNum = quantPart.value;
// 	console.log(valueNum);
// 	if(valueNum != ""){
// 		if(!isPotencia2(valueNum)){
// 			alert("Numero não é potencia de 2");
// 		}else{
// 			maxParticipantes = valueNum;
// 			// quantPart.classList.add('block');
// 			// divParticipantes.innerHTML += "<tr><td><label for=\"equipe\">Equipe: </label></td><td><input type=\"text\" id=\"value-add-participante\"> <input type=\"submit\" value=\"Adicionar Participantes\" id=\"add-participante\"></td></tr>";
// 			console.log(divParticipantesInit);
// 			divParticipantes.innerHTML = divParticipantesInit;
// 			for (var i=0; i < maxParticipantes; i++){
// 				divParticipantes.innerHTML +=
// 				"<tr>" +
// 					"<td>" +
// 						"<label for=\"Nome\">Nome: " + (i+1) + " </label>" +
// 					"</td>" +
// 					"<td align=\"left\">" +
// 						"<input type=\"text\" id=\"nome\">" +
// 					"</td>" +
// 				"</tr>";
// 			}
// 		}
// 	}
// });
//
//
// function listenerAdicionar(element) {
// 	element.addEventListener('click', function(e) {
// 		if(maxParticipantes > countParticipantes){
// 			var valueAddParticipante = document.getElementById('value-add-participante').value;
// 			divParticipantes.innerHTML += "<tr><td>Time "+(countParticipantes+1)+" :</td><td>" + valueAddParticipante + "</td></tr>";
// 			var addParticipante = document.getElementById('add-participante');
// 			listenerAdicionar(addParticipante);
// 			countParticipantes++;
// 		}else{
// 			alert("Todas Equipes adicionadas");
// 		}
// 	});
// }
//
//
// function isPotencia2(n) {
// 	if (n%2 != 0){
// 		return false;
// 	}
// 	var contador = 1;
// 	while(n != 2){
// 	    n = n/2;
// 	    if (n%2 == 0){
// 	         contador++;
// 	    }
// 	    else {
// 	    	return false;
// 	    }
// 	}
// 	return true;
// }
