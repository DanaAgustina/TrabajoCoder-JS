const preguntas = {
    matematicas: [
        { pregunta: "2 + 2 = 4. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "5 - 3 = 1. Verdadero/Falso", respuestaCorrecta: "falso" },
        { pregunta: "3 * 3 = 9. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "10 / 2 = 4. Verdadero/Falso", respuestaCorrecta: "falso" },
        { pregunta: "7 + 5 = 12. Verdadero/Falso", respuestaCorrecta: "verdadero" }
    ],
    ciencia: [
        { pregunta: "El agua hierve a 100 grados Celsius. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "La tierra es plana. Verdadero/Falso", respuestaCorrecta: "falso" },
        { pregunta: "El sol es una estrella. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "Los humanos pueden respirar bajo el agua. Verdadero/Falso", respuestaCorrecta: "falso" },
        { pregunta: "Los pingüinos pueden volar. Verdadero/Falso", respuestaCorrecta: "falso" }
    ],
    historia: [
        { pregunta: "Cristóbal Colón descubrió América en 1492. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "La Revolución Francesa ocurrió en 1789. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "Napoleón Bonaparte fue un emperador romano. Verdadero/Falso", respuestaCorrecta: "falso" },
        { pregunta: "La Guerra Civil Americana fue entre 1861 y 1865. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "La primera guerra mundial comenzó en 1914. Verdadero/Falso", respuestaCorrecta: "verdadero" }
    ],
    entretenimiento: [
        { pregunta: "Harry Potter es un personaje de Marvel. Verdadero/Falso", respuestaCorrecta: "falso" },
        { pregunta: "La película Titanic fue dirigida por James Cameron. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "El primer videojuego fue Pong. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "El actor que hizo de Iron Man es Robert Downey Jr. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "El anime es originario de Francia. Verdadero/Falso", respuestaCorrecta: "falso" }
    ],
    deporte: [
        { pregunta: "El fútbol se juega con una pelota ovalada. Verdadero/Falso", respuestaCorrecta: "falso" },
        { pregunta: "Usain Bolt es un famoso velocista. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "La NBA es la liga de fútbol americano. Verdadero/Falso", respuestaCorrecta: "falso" },
        { pregunta: "El rugby es un deporte de contacto. Verdadero/Falso", respuestaCorrecta: "verdadero" },
        { pregunta: "Michael Phelps es un nadador famoso. Verdadero/Falso", respuestaCorrecta: "verdadero" }
    ]
};

let totalPuntos = 0;
let preguntasRespondidas = 0;
let seleccionTema = '';
let seleccionPregunta = 0;
let cartasCreadas = false;


function obtenerPuntaje() {
    return parseInt(localStorage.getItem('puntaje')) || 0;
}

function crearCartas() {
    if (!cartasCreadas) { 
        const container = document.getElementById('cartas-menu');
        Object.keys(preguntas).forEach(tema => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerText = tema.charAt(0).toUpperCase() + tema.slice(1);
            card.addEventListener('click', () => seleccionarTema(tema));
            container.appendChild(card);
        });
        cartasCreadas = true;
    }
}

function seleccionarTema(tema) {
    seleccionTema = tema;
    seleccionPregunta = 0;
    preguntasRespondidas = 0;
    totalPuntos = 0;  
    document.getElementById('cartas-menu').style.display = 'none';
    document.getElementById('preguntas-menu').style.display = 'block';
    mostrarPregunta();
}

function mostrarPregunta() {
    const preguntaActual = preguntas[seleccionTema][seleccionPregunta];
    document.getElementById('pregunta-titulo').innerText = preguntaActual.pregunta;
    document.getElementById('respuesta-menu').innerHTML = `
        <button class="respuesta" data-respuesta="verdadero">Verdadero</button>
        <button class="respuesta" data-respuesta="falso">Falso</button>
    `;
    document.querySelectorAll('.respuesta').forEach(boton => {
        boton.addEventListener('click', verificarRespuesta);
    });
}

function verificarRespuesta(evento) {
    const respuestaUsuario = evento.target.getAttribute('data-respuesta');
    const preguntaActual = preguntas[seleccionTema][seleccionPregunta];

    if (respuestaUsuario === preguntaActual.respuestaCorrecta) {
        totalPuntos += 10; 
        preguntasRespondidas++;
        mostrarMensaje("¡Correcto! Tu puntaje actual es: " + totalPuntos);
    } else {
        mostrarMensaje("Incorrecto. Debes practicar más!");
    }

    localStorage.setItem('puntaje', totalPuntos);  

    seleccionPregunta++;

    if (seleccionPregunta < preguntas[seleccionTema].length) {
        mostrarPregunta();
    } else {
        finalizarJuego();
    }
}

function mostrarMensaje(mensaje) {
    const messageDiv = document.getElementById('mensaje');
    messageDiv.innerText = mensaje;
}

function resetGame() {
    document.getElementById('preguntas-menu').style.display = 'none';
    document.getElementById('cartas-menu').style.display = 'flex';
}

function finalizarJuego() {
    const mensajeFinal = document.getElementById('mensaje');
    guardarPuntaje();  

    if (totalPuntos === 50) {
        mensajeFinal.innerText = "¡Felicidades! Has completado todas las preguntas. Ganaste un 10% de descuento en Papelera MABU. Tu código de descuento es: Papeles3486";
    } else {
        mensajeFinal.innerText = "Has completado todas las preguntas de " + seleccionTema + "! Tu puntaje final es: " + totalPuntos;
    }
    resetGame();
}

function guardarPuntaje() {
    localStorage.setItem('puntaje', totalPuntos);  
}


const puntajeElement = document.getElementById('puntaje');  
if (puntajeElement) {
    const puntajeGuardado = obtenerPuntaje();
    puntajeElement.innerText = `Puntaje: ${puntajeGuardado}`;  
}

crearCartas();
