const https = require('https');

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

jQuery(document).ready(function($) {

	$("body").on('keydown', function(e) {

		var senhaAtual   = $("#senhaAtualNumero");
		var senhaNormal  = $("#senhaNormal");
		var senhaPref   = $("#senhaPreferencial");
		var ultimaSenha  = $("#ultimaSenhaNumero");

        var anteriorSenha = $("#anteriorSenhaNumero");
        var antepenultimaSenha = $("#antepenultimaSenhaNumero");

		const audioChamada = $("#audioChamada");

        let senha1="0";
        let senha2="0";
        let senha3="0";
        

        if(e.keyCode == 39){
            audioChamada.trigger("play")
            senha1 = senhaAtual.html();
            senha2 = anteriorSenha.html();
            senha3 =  ultimaSenha.html();

            senha = parseInt(senhaNormal.val().replace("C","")) + 1;
            senhaAtual.html("C" + pad(senha, 3));
            senhaNormal.val("C" + pad(senha, 3)) - 1;
            ultimaSenha.html(senha1);
            anteriorSenha.html(senha3);          
            antepenultimaSenha.html(senha2);         
        }
        
        if(e.keyCode == 65){
            audioChamada.trigger("play");

            senha = parseInt(senhaNormal.val().replace("C","")) - 1;       
            senhaAtual.html("C" + pad(senha, 3));
            senhaNormal.val("C" + pad(senha, 3));

        }
        if(e.keyCode == 38){
            audioChamada.trigger("play");

            senha1 = senhaAtual.html();
            senha2 = anteriorSenha.html();
            senha3 =  ultimaSenha.html();

            senha = parseInt(senhaPref.val().replace("P","")) + 1;
            senhaAtual.html("P" + pad(senha, 3));
            senhaPref.val("P" + pad(senha, 3));

            ultimaSenha.html(senha1);
            anteriorSenha.html(senha3);          
            antepenultimaSenha.html(senha2);

        }
        if(e.keyCode == 83){
            audioChamada.trigger("play");

            senha = parseInt(senhaPref.val().replace("P","")) - 1;
            senhaAtual.html("P" + pad(senha, 3));
            senhaPref.val("P" + pad(senha, 3));
            
        }
    });
});