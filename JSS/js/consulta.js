var pacientes = []; //declara vetor global
var chamado = [];
var ultimos = [];

function adicionarPaciente() {
    var inPaciente = document.getElementById("inPaciente");
    var outLista = document.getElementById("outLista");
    var nome = inPaciente.value; // Obtém nome do paciente

    if (nome == "") {
        alert("Informe o nome do paciente");
        inPaciente.focus();
        return;
    }

    pacientes.push(nome); // Adiciona o paciente ao final do vetor
    var lista = "";
    for (i = 0; i < pacientes.length; i++) {
        lista += (i + 1) + ". " + pacientes[i] + "\n";
    }
    outLista.textContent = lista;
    inPaciente.value = "";
    inPaciente.focus();
}
var btAdicionar = document.getElementById("btAdicionar");
btAdicionar.addEventListener("click", adicionarPaciente);

function adicionarurgencia() {
    var inPaciente = document.getElementById("inPaciente");
    var outLista = document.getElementById("outLista");
    var nome = inPaciente.value;
    if (nome == "") {
        alert("Informe o nome do paciente");
        inPaciente.focus();
        return;
    }
    pacientes.unshift(nome);
    var lista = "";
    for (i = 0; i < pacientes.length; i++) {
        lista += (i + 1) + ". " + pacientes[i] + "\n";
    }
    outLista.textContent = lista;
    inPaciente.value = "";
    inPaciente.focus();
}
var bturgencia = document.getElementById("bturgencia");
bturgencia.addEventListener("click", adicionarurgencia);

function atenderPaciente() {
    if (pacientes.length == 0) {
        alert("Não há pacientes na lista de espera");
        inPaciente.focus();
        return;
    }

    var outAtendimento = document.getElementById("outAtendimento");
    var outLista = document.getElementById("outLista");
    var outChamado = document.getElementById("outChamado");

    var atender = pacientes.shift(); // Remove o primeiro da fila
    outAtendimento.textContent = atender;
    chamado = atender;
    outChamado.textContent = atender + Date();
    var lista = "";

    for (i = 0; i < pacientes.length; i++) {
        lista += (i + 1) + ". " + pacientes[i] + "\n";
    }
    outLista.textContent = lista;
}

var btAtender = document.getElementById("btAtender");
btAtender.addEventListener('click', function (event) {
    stop();
    atenderPaciente();
    speak();
});


function speak() {
    const utterance = new SpeechSynthesisUtterance(chamado);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];
    speechSynthesis.speak(utterance);
}

let context,
    oscillator,
    contextGain,
    x = 1,
    type = '';

function start() {
    context = new AudioContext();
    oscillator = context.createOscillator();
    contextGain = context.createGain();

    oscillator.type = type;
    oscillator.connect(contextGain);
    contextGain.connect(context.destination);
    oscillator.start(0);
}

function stop() {
    start();
    contextGain.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + x
    )

}
