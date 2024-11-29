let totalPuntos = 0; 
let preguntasRespondidas = 0;
let seleccionTema = '';
let seleccionPregunta = 0;
let cartasCreadas = false;
let preguntas = {}; 
let respuestasUsuario = [];
let usuarioEmail = ''; 


Swal.fire({
  title: "Por favor, ingresa tu correo electrónico",
  input: "email",
  inputAttributes: {
    autocapitalize: "off"
  },
  showCancelButton: true,
  confirmButtonText: "Iniciar juego",
  showLoaderOnConfirm: true,
  preConfirm: (email) => {
    if (!email) {
      Swal.showValidationMessage("¡Por favor, ingresa un correo válido!");
    } else {
      usuarioEmail = email; 
    }
  },
  allowOutsideClick: () => !Swal.isLoading(),
  customClass: {
    popup: 'sweetalert-popup',
    title: 'sweetalert-title',
    input: 'sweetalert-input',
    confirmButton: 'sweetalert-button',
    cancelButton: 'sweetalert-cancel-button'
  }
}).then((result) => {
  if (result.isConfirmed) {
    cargarPreguntas();  
  }
});


function cargarPreguntas() {
  fetch("./data/questions.json")  
    .then(response => response.json()) 
    .then(data => {
      preguntas = data;  
      crearCartas(); 
    })
    .catch(error => {
      console.error('Error al cargar las preguntas:', error);
    });
}

function obtenerPuntaje() {
  return parseInt(localStorage.getItem('puntaje')) || 0;
}

function actualizarPuntaje() {
  const puntajeElement = document.getElementById('puntaje');
  if (puntajeElement) {
    puntajeElement.innerText = `Puntaje: ${totalPuntos}`;
  }
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
  document.getElementById('respuesta-menu').innerHTML = 
    `<button class="respuesta" data-respuesta="verdadero">Verdadero</button>
     <button class="respuesta" data-respuesta="falso">Falso</button>`;
  document.querySelectorAll('.respuesta').forEach(boton => {
    boton.addEventListener('click', verificarRespuesta);
  });
}

function verificarRespuesta(evento) {
  const respuestaUsuario = evento.target.getAttribute('data-respuesta');
  const preguntaActual = preguntas[seleccionTema][seleccionPregunta];

  respuestasUsuario.push({
    pregunta: preguntaActual.pregunta, 
    respuestaUsuario: respuestaUsuario, 
    respuestaCorrecta: preguntaActual.respuestaCorrecta 
  });

  if (respuestaUsuario === preguntaActual.respuestaCorrecta) {
    totalPuntos += 10;  
    preguntasRespondidas++;
    mostrarMensaje("¡Correcto! Tu puntaje actual es: " + totalPuntos);
  } else {
    mostrarMensaje("Incorrecto. Debes practicar más!");
  }

  localStorage.setItem('puntaje', totalPuntos);

  actualizarPuntaje();

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

  const verResultadosBtn = document.createElement('button');
  verResultadosBtn.innerText = 'Ver Resultados';
  verResultadosBtn.addEventListener('click', () => {
    localStorage.setItem('resultados', JSON.stringify({
      respuestas: respuestasUsuario, 
      puntaje: totalPuntos,
      email: usuarioEmail 
    }));
    window.location.href = 'resultado.html'; 
  });

  const resultadoBtnContainer = document.getElementById('resultado-btn-container');
  if (resultadoBtnContainer) {
    resultadoBtnContainer.appendChild(verResultadosBtn);
  } else {
    console.error('Contenedor de resultados no encontrado');
  }

  resetGame();
}

function guardarPuntaje() {
  localStorage.setItem('puntaje', totalPuntos);
}

const puntajeElement = document.getElementById('puntaje');
if (puntajeElement) {
  const puntajeGuardado = obtenerPuntaje();
  totalPuntos = puntajeGuardado;  
  actualizarPuntaje(); 
}
