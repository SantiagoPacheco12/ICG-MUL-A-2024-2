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
        const x = Math.random() * (600 - 50) + 25; // Margen para no salir del contenedor
        const y = Math.random() * (400 - 50) + 25;
        puntosGenerados.push(new Punto(x, y));
    }
    return ordenarPuntos(puntosGenerados);
}

// Función para ordenar puntos en sentido horario
function ordenarPuntos(puntos) {
    const centroide = calcularCentroide(puntos);
    return puntos.sort((a, b) => {
        return Math.atan2(a.y - centroide.y, a.x - centroide.x) - Math.atan2(b.y - centroide.y, b.x - centroide.x);
    });
}
