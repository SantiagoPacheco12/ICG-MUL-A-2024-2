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

// Función personalizada para dibujar el polígono en SVG
function dibujarPoligonoSVG(puntos) {
    const svgElement = document.getElementById('svgElement');
    svgElement.innerHTML = ''; // Limpiar el contenido anterior

    const pointsString = puntos.map(p => `${p.x},${p.y}`).join(' ');
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", pointsString);
    polygon.setAttribute("fill", "lightblue");
    polygon.setAttribute("stroke", "black");
    svgElement.appendChild(polygon);

    const tipo = esConvexo(puntos) ? "Convexo" : "Cóncavo";
    document.getElementById('polygonType').innerText = `Tipo de polígono: ${tipo}`;

    if (centroidVisible) {
        const centroide = calcularCentroide(puntos);
        dibujarCentroideSVG(centroide, puntos);
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

// Función personalizada para dibujar el centroide en SVG
function dibujarCentroideSVG(centroide, puntos) {
    const svgElement = document.getElementById('svgElement');

    // Dibujar el centroide
    const centroideCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centroideCircle.setAttribute("cx", centroide.x);
    centroideCircle.setAttribute("cy", centroide.y);
    centroideCircle.setAttribute("r", 5);
    centroideCircle.setAttribute("fill", "red");
    svgElement.appendChild(centroideCircle);

    // Dibujar líneas desde el centroide a cada punto
    for (const punto of puntos) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centroide.x);
        line.setAttribute("y1", centroide.y);
        line.setAttribute("x2", punto.x);
        line.setAttribute("y2", punto.y);
        line.setAttribute("stroke", "red");
        svgElement.appendChild(line);
    }
}

// Función para verificar si el polígono es convexo o cóncavo
function esConvexo(puntos) {
    let signo = 0;
    const longitud = puntos.length;
    for (let i = 0; i < longitud; i++) {
        const dx1 = puntos[(i + 2) % longitud].x - puntos[(i + 1) % longitud].x;
        const dy1 = puntos[(i + 2) % longitud].y - puntos[(i + 1) % longitud].y;
        const dx2 = puntos[i].x - puntos[(i + 1) % longitud].x;
        const dy2 = puntos[i].y - puntos[(i + 1) % longitud].y;
        const cruz = dx1 * dy2 - dy1 * dx2;
        if (cruz !== 0) {
            const nuevoSigno = cruz > 0 ? 1 : -1;
            if (signo === 0) {
                signo = nuevoSigno;
            } else if (signo !== nuevoSigno) {
                return false; // Encontrado un cruce
            }
        }
    }
    return true; // Sin cruces, es convexo
}

// Evento para mostrar/ocultar el centroide
document.getElementById('toggleCentroid').addEventListener('click', () => {
    centroidVisible = !centroidVisible;
    dibujarPoligonoSVG(puntos);
});

// Evento para generar una nueva figura
document.getElementById('generatePolygon').addEventListener('click', () => {
    puntos = generarPuntosAleatorios(5); // Generar 5 puntos aleatorios
    dibujarPoligonoSVG(puntos);
});

// Dibuja un polígono inicial
puntos = generarPuntosAleatorios(5); // Generar 5 puntos aleatorios inicialmente
dibujarPoligonoSVG(puntos);
