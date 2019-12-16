
setTimeout(function () {
    window.location.href = 'index.html';

}, 10000);
const https = require('https');
const querystring = require('querystring');
// const localStorage = require('localStorage');

let fila_id = localStorage.getItem('fila.id');
let fila_senha = localStorage.getItem('fila.senha');
let fila_guiche = localStorage.getItem('fila.guiche');


// // Function generica para criação de botão dinamica
// const criarLi = (idTagPai, classe, tipo, nome, valor, texto, acao) => {
//     var element = document.createElement("li");
//     element.className = classe;
//     element.type = tipo;
//     element.name = nome;
//     element.value = valor;
//     element.textContent = texto;
//     //element.onclick = acao;

//     var tagPai = document.querySelector(idTagPai);
//     tagPai.append(element);
// }

//Acessando cada posição

const divsSelect  = (data) => {

    // .value = data[0].senha.guiche;
    var div1 = document.getElementById('senhaAtualNumero');
    div1.innerText = "" + data[3].senha +" "+ data[3].guiche;

    // .value = data[1].senha.guiche;
    var div2 = document.getElementById('ultimaSenhaNumero');
    div2.innerText = "" + data[2].senha +" "+ data[2].guiche;

    // .value = data[2].senha.guiche;
    var div3 = document.getElementById('anteriorSenhaNumero');
    div3.innerText = "" + data[1].senha +" "+ data[1].guiche;

    // .value = data[3].senha.guiche;
    var div4 = document.getElementById('antepenultimaSenhaNumero');
    div4.innerText = "" + data[0].senha +" "+ data[0].guiche;

}

let params = {
    'id': fila_id, 
    'senha': fila_senha,
    'guiche': fila_guiche
};

let postData = querystring.stringify(params);

// // Ação das senhas ao serem criadas
// const spanText = ($event) => {
//     console.log('Captura de texto');

//     let senha = $event.target.innerText;
//     let id = $event.target.value;
    
//     localStorage.getItem('senha.id', id);
//     localStorage.getItem('senha.nome', senha);

//     window.location.href = 'index.html'; // Refresh da pagina atual
// }

//////////////////////////////////////////////////////////
const getSenhaAPI = (token) => {
    const tokenString = "Token " + token;

    let url = 'https://danielb.pythonanywhere.com/api/senha/fila/';

    // Opções da requisição LER Informações do banco
    let options = {
        method: 'GET', // Requisição GET
        headers: {
            "Authorization": tokenString
        }
    };


    let data = '';
    let apiRequest = https.request(url, options, function (response) { // requisição do REQUEST 'https'
        console.log('OK');
        console.log('statusCode:', response.statusCode);

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            console.log('Done!');
            data = JSON.parse(data);
            console.log(data);
            divsSelect(data)
            for (var i = 3; i < data.length; i--) {
                let obj = data[i];
                //criarLi('#divUl', "li margin", "li", "senha", obj.id, obj.senha, spanText);
                divsSelect();

            }
        });
    });
    apiRequest.write(postData);

    apiRequest.end();
}

// Criar a conta para acesso API e depois gerar o token
let token = '6af3a823498cf3696aaefd8fae0b8cfea4747e46';
window.onload = getSenhaAPI(token);