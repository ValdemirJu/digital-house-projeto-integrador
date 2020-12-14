function selectId(id){
    return document.getElementById(id);
}

function empty(input){
    return input.value.trim() === "";
}

function displayElement(aviso){
    aviso.style.display = "block";
}

function displayElementsNone(){
    avisoNome.style.display = "none";
    avisoEmail.style.display = "none";
    avisoAssunto.style.display = "none";
    avisoMensagem.style.display = "none";
}

//Form
let form = selectId("form-contato");

//Inputs
let nome = selectId("nome");
let email = selectId("email");
let assunto = selectId("assunto");
let mensagem = selectId("mensagem");

//Elementos de Aviso
let avisoNome = selectId("aviso-nome");
let avisoEmail = selectId("aviso-email");
let avisoAssunto = selectId("aviso-assunto");
let avisoMensagem = selectId("aviso-mensagem");

form.addEventListener("submit", function(evento){
    let qtdError = 0;
    displayElementsNone();
    if(empty(nome)){
        displayElement(avisoNome);
        qtdError++;
        evento.preventDefault();
    }

    if(empty(email)){
        displayElement(avisoEmail);
        qtdError++;
        evento.preventDefault();
    }

    if(empty(assunto)){
        displayElement(avisoAssunto);
        qtdError++;
        evento.preventDefault();
    }

    if(empty(mensagem)){
        displayElement(avisoMensagem);
        qtdError++;
        evento.preventDefault();
    }

    if(qtdError === 0){
        alert("Sua mensagem foi enviada com sucesso!");
    }
});