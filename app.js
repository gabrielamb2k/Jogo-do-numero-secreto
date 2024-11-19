let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibitTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial(){
    exibitTextoNaTela('h1', 'Jogo do numero secreto');
    exibitTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}

mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibitTextoNaTela('h1', 'Acertou');
        let palavraTentantivas = tentativas > 1 ? 'tentavias' : 'tentaviva';
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentantivas}`;
        exibitTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto) {
            exibitTextoNaTela('p' , 'O numero secreto e menor');
        } else {
            exibitTextoNaTela('p', 'O numero secreto e maior');
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return  gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}