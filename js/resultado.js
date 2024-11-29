document.addEventListener('DOMContentLoaded', () => {
    const resultados = JSON.parse(localStorage.getItem('resultados'));
    if (!resultados) {
        window.location.href = 'index.html';
        return;
    }

    const { respuestas, puntaje } = resultados;

    const mensajeFinal = document.getElementById('mensaje-final');
    const detalleResultados = document.getElementById('detalle-resultados');
    const reiniciarContainer = document.getElementById('reiniciar-container');

    if (!respuestas || respuestas.length === 0) {
        console.error("No hay respuestas guardadas");
        return;
    }

    let detallesHTML = '<ul>';
    respuestas.forEach((respuesta, index) => {
        const pregunta = respuesta.pregunta || 'Pregunta no definida';
        const respuestaUsuario = respuesta.respuestaUsuario || 'Respuesta no dada';
        const respuestaCorrecta = respuesta.respuestaCorrecta || 'Respuesta correcta no definida';
        const esCorrecto = respuestaUsuario === respuestaCorrecta ? 'Correcta' : 'Incorrecta';

        detallesHTML += ` 
            <li>
                <span class="pregunta">Pregunta: ${pregunta}</span> <br>
                <span class="tu-respuesta ${esCorrecto === 'Correcta' ? 'correcta' : 'incorrecta'}">Tu respuesta: ${respuestaUsuario}</span> <br>
                <span class="respuesta-correcta ${esCorrecto === 'Correcta' ? 'correcta' : 'incorrecta'}">Respuesta correcta: ${respuestaCorrecta}</span> <br>
                <span class="estado ${esCorrecto === 'Correcta' ? 'correcta' : 'incorrecta'}">Estado: ${esCorrecto}</span>
            </li>
        `;
    });
    detallesHTML += '</ul>';
    detalleResultados.innerHTML = detallesHTML;

    if (puntaje === 50) {
        mensajeFinal.innerHTML = "¡Felicidades! Has respondido todas las preguntas correctamente. Tu código de descuento es: Papeles3486";
    } else {
        mensajeFinal.innerHTML = `Tu puntaje final es: ${puntaje}. ¡Sigue practicando!`;
    }

    const botonReiniciar = document.createElement('button');
    botonReiniciar.innerText = "Volver al menú";
    botonReiniciar.addEventListener('click', () => {
        localStorage.removeItem('puntaje');
        localStorage.removeItem('resultados');
        window.location.href = 'index.html';
    });

    reiniciarContainer.appendChild(botonReiniciar);
});
