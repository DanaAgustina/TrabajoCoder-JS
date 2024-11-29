*                                                                                Juego de Preguntas Interactivo



* Este es un juego de preguntas basado en un sistema de selección de temas y respuestas, donde el usuario tiene que elegir entre "Verdadero" o "Falso" para cada pregunta. Al final del juego, se muestra un puntaje junto con la opción de obtener un código de descuento si se responde correctamente a todas las preguntas. 


* Características

* Selección de Tema: El usuario puede elegir entre varios temas para jugar.
* Preguntas y Respuestas: Cada tema tiene un conjunto de preguntas, y el jugador debe seleccionar la respuesta correcta ("Verdadero" o "Falso").
* Puntaje: Se asignan puntos por cada respuesta correcta. El puntaje se muestra en tiempo real.
* Resultados Finales: Al terminar el juego, el puntaje final y las respuestas del jugador son mostradas, con la opción de reiniciar o volver al menú principal.
* Código de Descuento: Si el jugador responde todas las preguntas correctamente (puntaje máximo), recibe un código de descuento.


* Archivos Principales

* index.html: Página principal del juego donde se seleccionan los temas y se responde a las preguntas.
* resultado.html: Página donde se muestran los resultados finales del jugador, incluyendo su puntaje y respuestas.
* js/main.js: Lógica del juego, manejo de preguntas, respuestas y puntaje.
* js/resultado.js: Lógica para mostrar los resultados finales del juego.
* css/style.css: Estilos personalizados para las páginas.


* Flujo de Juego

* El jugador es solicitado a ingresar su correo electrónico mediante una ventana emergente de SweetAlert2.
* Luego, se muestran varios temas para que el jugador elija uno.
* Después de seleccionar el tema, el jugador responde a las preguntas, el puntaje se actualiza con cada respuesta.
* Si el jugador responde todas las preguntas correctamente (puntaje máximo), obtiene un código de descuento.
* Los resultados finales, incluyendo las respuestas correctas e incorrectas, se muestran al final.
* El jugador tiene la opción de reiniciar el juego y volver al menú principal.