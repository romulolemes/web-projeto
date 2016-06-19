var maxRodadas = document.getElementById('maxRodadas').innerHTML;
var idMax = document.getElementById('idMax').innerHTML;

for (var i = 0; i < parseInt(maxRodadas); i++) {
  console.log("Rodada " + i);
  for (var j = 0; j < parseInt(idMax); j++) {
    element = document.getElementById('R'+ (i+1)  +'id' + j +'S');
    if(element != null){
      element.addEventListener('click', function(e) {
        console.log(e.target.id);
        var equipe1 = (document.getElementById(e.target.id.substr(0,e.target.id.length-1) + 'E1'));
        var equipe2 = (document.getElementById(e.target.id.substr(0,e.target.id.length-1) + 'E2'));
        if(equipe1.value === "" ){
          equipe1.reportValidity();
          return;
        }

        if(equipe2.value === ""){
          equipe2.reportValidity();
          return;
        }
        if(equipe1.value === equipe2.value ){
            equipe1.setCustomValidity('Placar Igual');
            equipe2.setCustomValidity('Placar Igual');
            equipe1.reportValidity();
            equipe2.reportValidity();
            return;
        }

        console.log(equipe1.value + ' - ' + equipe2.value);
        e.target.form.submit();
      });
    }
  }
}
