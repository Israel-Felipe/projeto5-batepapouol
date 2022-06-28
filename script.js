usuario = prompt('Escreva o seu lindo nome:')

function login() {

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{name:usuario});
    promise.then(usuarioOnline);
    promise.catch(naoEntrou);
}
function usuarioOnline() {
   console.log(`Login efetuado!`)
   setInterval(online, 5000);
   recebeMensagens();
}
function naoEntrou(erro) {
        alert("Nome já está em uso, insira outro nome");
        refresh();
}

function online() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name:usuario});
    promise.then(continuaOnline);
}
function continuaOnline() {
    console.log(`Usuário online: ${usuario}`);
}


function recebeMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(recebendo);
    promise.catch(erro)
}
function erro(erro) {
    console.log("errrooo")
}
function recebendo(resposta) {
    chat = resposta.data;
    
    divchat = document.querySelector(".chat");
    divchat.innerHTML = "";


    for (let i=0 ; i<chat.length ; i++) {
        

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
            <span><span class="time">(${chat[i].time})</span> <span class="user">${chat[i].from}</span> <span class="texto"> para </span> <span class="destinatario">${chat[i].to}:</span><span class="texto"> ${chat[i].text}</span>
            </div>
            `
        }
        else if (chat[i].type === "private_message") { /* colocar ainda pra aparecer só pra mim */
            divchat.innerHTML += `
            <div class="msg-privada">
            <span><span class="time">(${chat[i].time})</span> <span class="user">${chat[i].from}</span> <span class="texto"> reservadamente para </span> <span class="destinatario">${chat[i].to}:</span><span class="texto"> ${chat[i].text}</span>
            </div>
            `
        }
    }

    document.querySelector('.chat div:last-of-type').scrollIntoView()

}

let sidebar = document.querySelector(".sidebar");

function participantes() {
    sidebar.classList.add("aparece");
    setInterval(transicao,100);
    buscarParticipantes();
}

function voltaChat () {
    sidebar.classList.remove("aparece");
    setInterval(transicao,100)
}

function transicao () {
    let teste = document.querySelector(".aparece");
    if (teste) {
        sidebar.classList.add("transicao");
    } else {
        sidebar.classList.remove("transicao");
    }
    
}

function buscarParticipantes () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(recebendoParticipantes);
}

function recebendoParticipantes(resposta) {
    participante = resposta.data;
    
    divparticipante = document.querySelector(".lista");
    divparticipante.innerHTML = `<div class="participante" onclick="selecionarparticipante(this)">
                                      <div class="between">
                                      <ion-icon name="people"></ion-icon>
                                     <span>Todos</span>
                                    </div>
                                    <div class="icone ativo"><img src="img/icone.svg" alt=""></div>
                                </div>`;


    for (let i=0 ; i<participante.length ; i++) {
         divparticipante.innerHTML += `
         <div class="participante" onclick="selecionarparticipante(this)">
            <div class="between">
            <ion-icon name="person-circle"></ion-icon>
            <span>${participante[i].name}</span>
            </div>
            <div class="icone"><img src="img/icone.svg" alt=""></div>
        </div>
`
}
}
let participanteselecionado = "Todos";


function selecionarparticipante(elemento) {
    const check = document.querySelector(".lista .ativo");
    
    
    if (check !== null) {
        check.classList.remove("ativo"); 
      }
      elemento.querySelector(".icone").classList.add("ativo");

      participanteselecionado = elemento.querySelector(".lista span"); /* pegar nome do elemento selecionado */
 
    }

function participanteseleciado() {
    selecionado = "Todos";



    if (participanteselecionado !== "Todos") {
        selecionado = `${participanteselecionado.innerHTML}`;
    }
    if (selecionado !== "Todos") {
        document.querySelector(".mensagempara").innerHTML = `Mensagem para ${selecionado}`;

        document.querySelector(".mensagempara").classList.add("ativo");
    } else {
        document.querySelector(".mensagempara").classList.remove("ativo");
    }
    

}
setInterval(participanteseleciado, 1000);
/* visibilidade */

let visibilidadeselecionado = "Público";

function selecionarvisibilidade(elemento) {
    const check = document.querySelector(".visibilidade .ativo");
    
    if (check !== null) {
        check.classList.remove("ativo"); 
      }
     elemento.querySelector(".icone").classList.add("ativo");
     
     visibilidadeselecionado = elemento.querySelector(".visibilidade span");
}
publicoselecionado = "Público";
function visibilidadeseleciado() {
    
    

    if (visibilidadeselecionado !== "Público") {
        publicoselecionado = `${visibilidadeselecionado.innerHTML}`;
    }
    
    if (publicoselecionado == "Público") {
        document.querySelector(".mensagempara").classList.remove("ativo");
    } else {
        document.querySelector(".mensagempara").innerHTML = `Mensagem reservada para ${selecionado}`;
        document.querySelector(".mensagempara").classList.add("ativo");
    }

}
setInterval(visibilidadeseleciado, 1000);

let typemsg = "message";

function publicose() {
if(publicoselecionado == "Público") {
    typemsg = "message"
} else if (publicoselecionado == "Reservadamente") {
    typemsg = "private_message"
}
}
setInterval(publicose, 1000);

console.log(typemsg);

function enviarMensagem() {
    let msgInput = document.querySelector(".msg-box input").value;
    
    

    mensagem = {
            from: usuario,
            to: selecionado,
            text: msgInput,
            type: typemsg // ou "private_message" para o bônus
    }   

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
    promise.then(recebeMensagens);
    promise.catch(refresh);

    document.querySelector(".msg-box input").value = "";
}

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        let btn = document.querySelector("#submit");
      
      btn.click();
    
    }
  });


function refresh() {
    window.location.reload();
}

login();

setInterval(recebeMensagens,3000);

setInterval(buscarParticipantes,10000);






