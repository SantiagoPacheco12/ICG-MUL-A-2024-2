class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let centroidVisible = false;
let puntos = [];

// Función para generar un polígono aleatorio
function generarPuntosAleatorios(numPuntos) {
    const puntosGenerados = [];
    for (let i = 0; i < numPuntos; i++) {
        const x = Math.random() * (600 - 50) + 25; // Margen para no salir del canvas
        const y = Math.random() * (400 - 50) + 25;
        puntosGenerados.push(new Punto(x, y));
    }

    // Ordenar los puntos en sentido horario
    return ordenarPuntos(puntosGenerados);
}
