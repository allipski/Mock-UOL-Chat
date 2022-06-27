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
puxarMensagens();

function puxarMensagens() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(carregarMensagens);
    promise.catch(erro);
}

setInterval (puxarMensagens, 3000);

let listaDeMensagens = [];

function carregarMensagens(request) {
listaDeMensagens = request.data;
renderizarMensagens();
}

function erro(request) {
    console.log("deu errado pt II");
}

function renderizarMensagens() {
    let div = document.querySelector(".feedmensagens");
    div.innerHTML = "";
    for (let i = 0; i < listaDeMensagens.length; i++) {
        const mensagematual = listaDeMensagens[i];
        div.innerHTML += htmlMensagem(mensagematual);
    }
    document.querySelector(".feedmensagens > div:nth-last-of-type(1)").scrollIntoView();
}

function htmlMensagem(elemento) {
    if (elemento.type === "message") {
        return `
    <div class="message"> 
    <span class="time">(${elemento.time})</span> <span class="negrito">${elemento.from}</span> para <span class="negrito">${elemento.to}</span>: ${elemento.text}
    </div>
    `;
    }
    if (elemento.type === "status") {
        return `
    <div class="status"> 
    <span class="time">(${elemento.time})</span> <span class="negrito">${elemento.from}</span> ${elemento.text}
    </div>
    `;
    }
    if (elemento.type === "private_message" && elemento.to === username){
        return `
    <div class="private"> 
    <span class="time">(${elemento.time})</span> <span class="negrito">${elemento.from}</span> para <span class="negrito">${elemento.to}</span>: ${elemento.text}
    </div>
    `;
    } else {
        return "";
    }
}

function enviarMensagem() {
    let msg = document.querySelector('input').value;
    let timeNow = new Date().toLocaleTimeString();
    let msgCompleta = {
        from: username,
		to: "Todos",
		text: msg,
		type: "message",
		time: timeNow
    }; 
    document.querySelector('input').value = "";
    let enviar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msgCompleta);
    enviar.then(puxarMensagens);
    enviar.catch(recarregar);
}

function recarregar() {
    window.location.reload();
}