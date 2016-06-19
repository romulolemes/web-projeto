
var checkNewRodada = (new RegExp("^@id[0-9]#R[0-9]$"));
var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

console.log(checkNewRodada.test('@id3#R9'));

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

Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};

var equipes = 64;
var rodadas = 0;

while (equipes !== 1){
	equipes = equipes/2;
	rodadas += equipes;
}


console.log((rodadas));
