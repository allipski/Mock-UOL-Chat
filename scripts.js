let username;
let nomeDeUsuario;

function checkUsername() {
    username = prompt("Qual seu nome de usuário?");
    nomeDeUsuario = {
        name: username
    };
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeDeUsuario);
    //promessa.then(setInterval(deuBomUsername, 5000));
    promessa.then(manterConexao);
    promessa.catch(deuRuimUsername);

    setInterval(manterConexao, 5000, nomeDeUsuario);
}

checkUsername();

function manterConexao(resposta) {
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeDeUsuario);
}

function deuRuimUsername(erro) {
    console.log("deu errado");
    alert ("Já existe um usuário com esse nome, por favor escolha um novo.")
    checkUsername();
}

function carregarMensagens() {
    let mensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
}