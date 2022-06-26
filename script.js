function login() {
    usuario = prompt('Escreva o seu lindo nome:')
    console.log(`Usuário: ${usuario}`);

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{name:usuario});
    promise.then(setInterval(usuarioOnline,5000));
    promise.catch(naoEntrou);
}
function usuarioOnline() {
   console.log(`USUÁRIO: ${usuario}`)
}
function naoEntrou(erro) {
        alert("Nome já está em uso, insira outro nome");
        login();
}

function online() {


}


function recebeMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(recebendo);
}

function recebendo(resposta) {
    chat = resposta.data;
    
    for (let i=0 ; i<20 ; i++) {
        divchat = document.querySelector(".chat");
        if (chat[i].type === "status") {
            divchat.innerHTML += `
            <div class="msg-status">
            <span><span class="time">(${chat[i].time})</span> <span class="user">${chat[i].from}</span> <span class="texto">${chat[i].text}</span>
            </span>
            </div>
            `
        }
        else if (chat[i].type === "message") {
            divchat.innerHTML += `
            <div class="msg-normal">
            <span><span class="time">(${chat[i].time})</span> <span class="user">${chat[i].from}</span> <span class="texto"> para </span> <span class="destinatario">${chat[i].to}</span><span class="texto"> ${chat[i].text}</span>
            </div>
            `
        }
        else if (chat[i].type === "private_message") {
            divchat.innerHTML += `
            <div class="msg-privada">
            <span><span class="time">(${chat[i].time})</span> <span class="user">${chat[i].from}</span> <span class="texto"> reservadamente para </span> <span class="destinatario">${chat[i].to}</span><span class="texto"> ${chat[i].text}</span>
            </div>
            `
        }
    } 
    document.querySelector('.chat div:last-of-type').scrollIntoView()

  
    
}




login();
recebeMensagens();
setInterval(recebeMensagens,3000);









