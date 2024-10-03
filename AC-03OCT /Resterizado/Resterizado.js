class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Obtener el canvas y el contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let centroidVisible = false;
let puntos = [];

// Función para generar un polígono aleatorio
function generarPuntosAleatorios(numPuntos) {
    const puntosGenerados = [];
    for (let i = 0; i < numPuntos; i++) {
        const x = Math.random() * (canvas.width - 50) + 25; // Margen para no salir del canvas
        const y = Math.random() * (canvas.height - 50) + 25;
        puntosGenerados.push(new Punto(x, y));
    }

    // Ordenar los puntos en sentido horario
    return ordenarPuntos(puntosGenerados);
}

// Función para ordenar puntos en sentido horario
function ordenarPuntos(puntos) {
    const centroide = calcularCentroide(puntos);
    return puntos.sort((a, b) => {
        return Math.atan2(a.y - centroide.y, a.x - centroide.x) - Math.atan2(b.y - centroide.y, b.x - centroide.x);
    });
}

// Función personalizada para dibujar el polígono
function dibujarPoligono(puntos) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);
    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.stroke();

    const tipo = esConvexo(puntos) ? "Convexo" : "Cóncavo";
    document.getElementById('polygonType').innerText = `Tipo de polígono: ${tipo}`;

    if (centroidVisible) {
        const centroide = calcularCentroide(puntos);
        dibujarCentroide(centroide, puntos);
    }
}

// Función personalizada para calcular el centroide
function calcularCentroide(puntos) {
    let x = 0, y = 0;
    for (const punto of puntos) {
        x += punto.x;
        y += punto.y;
    }
    return new Punto(x / puntos.length, y / puntos.length);
}

// Función personalizada para dibujar el centroide
function dibujarCentroide(centroide, puntos) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(centroide.x, centroide.y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'red';
    for (const punto of puntos) {
        ctx.beginPath();
        ctx.moveTo(centroide.x, centroide.y);
        ctx.lineTo(punto.x, punto.y);
        ctx.stroke();
    }
}
