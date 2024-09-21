// Clase base Figura (abstracta)
class Figura {
    constructor(x, y) {
        this._x = x; // Coordenada x de la figura
        this._y = y; // Coordenada y de la figura
    }

    get x() {
        return this._x; // Getter para la coordenada x
    }

    set x(value) {
        this._x = value; // Setter para la coordenada x
    }

    get y() {
        return this._y; // Getter para la coordenada y
    }

    set y(value) {
        this._y = value; // Setter para la coordenada y
    }

    // Método abstracto para dibujar la figura
    dibujar(svg) {
        throw new Error("El método dibujar debe ser implementado");
    }
}

// Clase Linea (utiliza el elemento <line> de SVG)
class Linea extends Figura {
    constructor(x1, y1, x2, y2) {
        super(x1, y1); // Llama al constructor de la clase base
        this._x2 = x2; // Coordenada x del segundo punto
        this._y2 = y2; // Coordenada y del segundo punto
    }

    get x2() {
        return this._x2; // Getter para la coordenada x2
    }

    set x2(value) {
        this._x2 = value; // Setter para la coordenada x2
    }

    get y2() {
        return this._y2; // Getter para la coordenada y2
    }

    set y2(value) {
        this._y2 = value; // Setter para la coordenada y2
    }

    // Dibujar la línea con <line>
    dibujar(svg) {
        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
        linea.setAttribute("x1", this.x); // Coordenada x1
        linea.setAttribute("y1", this.y); // Coordenada y1
        linea.setAttribute("x2", this.x2); // Coordenada x2
        linea.setAttribute("y2", this.y2); // Coordenada y2
        linea.setAttribute("stroke", "black"); // Color del trazo
        linea.setAttribute("stroke-width", "2"); // Ancho del trazo
        svg.appendChild(linea); // Agrega la línea al SVG
    }
}

// Clase Circunferencia (utiliza el elemento <circle> de SVG)
class Circunferencia extends Figura {
    constructor(cx, cy, radio) {
        super(cx, cy); // Llama al constructor de la clase base
        this._radio = radio; // Radio de la circunferencia
    }

    get radio() {
        return this._radio; // Getter para el radio
    }

    set radio(value) {
        this._radio = value; // Setter para el radio
    }

    // Dibujar la circunferencia con <circle>
    dibujar(svg) {
        const circunferencia = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferencia.setAttribute("cx", this.x); // Centro en x
        circunferencia.setAttribute("cy", this.y); // Centro en y
        circunferencia.setAttribute("r", this.radio); // Radio
        circunferencia.setAttribute("stroke", "black"); // Color del trazo
        circunferencia.setAttribute("stroke-width", "2"); // Ancho del trazo
        circunferencia.setAttribute("fill", "none"); // Sin relleno
        svg.appendChild(circunferencia); // Agrega la circunferencia al SVG
    }
}

// Clase Elipse (utiliza el elemento <ellipse> de SVG)
class Elipse extends Figura {
    constructor(cx, cy, radioX, radioY) {
        super(cx, cy); // Llama al constructor de la clase base
        this._radioX = radioX; // Radio en el eje x
        this._radioY = radioY; // Radio en el eje y
    }

    get radioX() {
        return this._radioX; // Getter para el radioX
    }

    set radioX(value) {
        this._radioX = value; // Setter para el radioX
    }

    get radioY() {
        return this._radioY; // Getter para el radioY
    }

    set radioY(value) {
        this._radioY = value; // Setter para el radioY
    }

    // Dibujar la elipse con <ellipse>
    dibujar(svg) {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.x); // Centro en x
        elipse.setAttribute("cy", this.y); // Centro en y
        elipse.setAttribute("rx", this.radioX); // Radio en el eje x
        elipse.setAttribute("ry", this.radioY); // Radio en el eje y
        elipse.setAttribute("stroke", "black"); // Color del trazo
        elipse.setAttribute("stroke-width", "2"); // Ancho del trazo
        elipse.setAttribute("fill", "none"); // Sin relleno
        svg.appendChild(elipse); // Agrega la elipse al SVG
    }
}

// Crear y dibujar las figuras en el SVG
const svgCanvas = document.getElementById('svgCanvas');

// Crear y dibujar las figuras
const linea = new Linea(50, 50, 200, 200); // Crea una línea
linea.dibujar(svgCanvas); // Dibuja la línea en el SVG

const circunferencia = new Circunferencia(300, 100, 50); // Crea una circunferencia
circunferencia.dibujar(svgCanvas); // Dibuja la circunferencia en el SVG

const elipse = new Elipse(400, 300, 80, 50); // Crea una elipse
elipse.dibujar(svgCanvas); // Dibuja la elipse en el SVG
