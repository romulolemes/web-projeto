var botaoRolar = document.getElementById('gerar-lista');
var divParticipantes = document.getElementById('table-new-camp');
var countParticipantes = 0;
var maxParticipantes = 0;

botaoRolar.addEventListener('click', function(e) {
	var botaoRolar = document.getElementById('gerar-lista');
	var quantPart = document.getElementById('quantPart');
	valueNum = quantPart.value;
	if(valueNum != ""){
		if(!isPotencia2(valueNum)){
			alert("Numero não é potencia de 2");
		}else{
			maxParticipantes = valueNum;
			quantPart.classList.add('block');
			divParticipantes.innerHTML += "<tr><td><label for=\"equipe\">Equipe: </label></td><td><input type=\"text\" id=\"value-add-participante\"> <input type=\"submit\" value=\"Adicionar Participantes\" id=\"add-participante\"></td></tr>";
			var addParticipante = document.getElementById('add-participante');
			listenerAdicionar(addParticipante);			
		}
	}
});


function listenerAdicionar(element) {
	element.addEventListener('click', function(e) {
		if(maxParticipantes > countParticipantes){
			var valueAddParticipante = document.getElementById('value-add-participante').value;
			divParticipantes.innerHTML += "<tr><td>Time "+(countParticipantes+1)+" :</td><td>" + valueAddParticipante + "</td></tr>";
			var addParticipante = document.getElementById('add-participante');
			listenerAdicionar(addParticipante);		
			countParticipantes++;
		}else{
			alert("Todas Equipes adicionadas");
		}
	});
}


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