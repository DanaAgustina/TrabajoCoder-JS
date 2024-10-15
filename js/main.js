const mensajesPreguntas = [ "El cero es un número impar. Verdadero/Falso", "Cuando el agua se encuentra a 0 grados Celsius está en estado sólido. Verdadero/Falso", "El primer presidente de Argentina fue Bernardino Rivadavia. Verdadero/Falso", "Patoruzú es conocido por su amor por el dulce de leche. Verdadero/Falso", "El jugador Lionel Messi es conocido como La Pulga. Verdadero/Falso"]

const respuestasCorrectas = [ "falso", "verdadero", "verdadero", "falso", "verdadero"]

const MensajeRespuestasVerdaderas = ["¡Correcto! El número 0 es par.", "¡Correcto! El agua se congela a 0 grados Celsius.", "¡Correcto! Bernardino Rivadavia fue el primer presidente.",  "¡Correcto! Patoruzú no es fan del dulce de leche.", "¡Correcto! Lionel Messi es conocido como La Pulga."]

let puntos = [10, 20, 30, 40, 50] 
let totalPuntos = 0

function sumar(puntos) {
    totalPuntos = puntos + totalPuntos
    console.log("Tu puntaje es " + totalPuntos + " Ptos.")
    return totalPuntos
}

function mostrarFelicitacion(Pregunta1) {
    console.log(MensajeRespuestasVerdaderas[Pregunta1])
}

function verificarRespuesta(Pregunta1, respuestaUsuario) {
    return respuestaUsuario === respuestasCorrectas[Pregunta1]
}

let continuar = true
while (continuar) {
    let quiz = parseInt(prompt("Completa las 5 preguntas correctamente para ganar el juego, \n 1- Pregunta sobre Matemática, \n 2- Pregunta sobre Ciencia, \n 3- Pregunta sobre Historia, \n 4- Pregunta sobre Entretenimiento, \n 5- Pregunta sobre Deporte, \n 6- Para salir "))

    if (quiz >= 1 && quiz <= 5) {
        let Pregunta1 = quiz - 1 
        let respuestaUsuario = prompt(mensajesPreguntas[Pregunta1]).toLowerCase()

        if (verificarRespuesta(Pregunta1, respuestaUsuario)) {
            mostrarFelicitacion(Pregunta1)
            sumar(puntos[Pregunta1])
        } else {
            continuar = false;   
            alert("Incorrecto. Debes practicar más!")
        }
    } else if (quiz === 6) {
        continuar = false
        alert("Gracias por participar. Tu puntaje final es: " + totalPuntos + " Ptos.")
    } else {
        alert("Opción inválida. Por favor, elige una opción.")
    }

    if (continuar) {
        let confirmacion = prompt("¿Desea seguir? si/no").toLowerCase()
        if (confirmacion === "no") {
            continuar = false
            alert("Gracias por participar. Tu puntaje final es: " + totalPuntos + " Ptos.")
        }
    }
}
