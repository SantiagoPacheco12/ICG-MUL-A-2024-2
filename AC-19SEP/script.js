// Clase base Figura (abstracta)
class Figura {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    // Método abstracto para dibujar la figura
    dibujar(svg) {
        throw new Error("El método dibujar debe ser implementado");
    }
}

// Clase Linea (utiliza el elemento <line> de SVG)
class Linea extends Figura {
    constructor(x1, y1, x2, y2) {
        super(x1, y1);
        this._x2 = x2;
        this._y2 = y2;
    }

    get x2() {
        return this._x2;
    }

    set x2(value) {
        this._x2 = value;
    }

    get y2() {
        return this._y2;
    }

    set y2(value) {
        this._y2 = value;
    }

    // Dibujar la línea con <line>
    dibujar(svg) {
        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
        linea.setAttribute("x1", this.x);
        linea.setAttribute("y1", this.y);
        linea.setAttribute("x2", this.x2);
        linea.setAttribute("y2", this.y2);
        linea.setAttribute("stroke", "black");
        linea.setAttribute("stroke-width", "2");
        svg.appendChild(linea);
    }
}

// Clase Circunferencia (utiliza el elemento <circle> de SVG)
class Circunferencia extends Figura {
    constructor(cx, cy, radio) {
        super(cx, cy);
        this._radio = radio;
    }

    get radio() {
        return this._radio;
    }

    set radio(value) {
        this._radio = value;
    }

    // Dibujar la circunferencia con <circle>
    dibujar(svg) {
        const circunferencia = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferencia.setAttribute("cx", this.x);
        circunferencia.setAttribute("cy", this.y);
        circunferencia.setAttribute("r", this.radio);
        circunferencia.setAttribute("stroke", "black");
        circunferencia.setAttribute("stroke-width", "2");
        circunferencia.setAttribute("fill", "none");
        svg.appendChild(circunferencia);
    }
}

// Clase Elipse (utiliza el elemento <ellipse> de SVG)
class Elipse extends Figura {
    constructor(cx, cy, radioX, radioY) {
        super(cx, cy);
        this._radioX = radioX;
        this._radioY = radioY;
    }

    get radioX() {
        return this._radioX;
    }

    set radioX(value) {
        this._radioX = value;
    }

    get radioY() {
        return this._radioY;
    }

    set radioY(value) {
        this._radioY = value;
    }

    // Dibujar la elipse con <ellipse>
    dibujar(svg) {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.x);
        elipse.setAttribute("cy", this.y);
        elipse.setAttribute("rx", this.radioX);
        elipse.setAttribute("ry", this.radioY);
        elipse.setAttribute("stroke", "black");
        elipse.setAttribute("stroke-width", "2");
        elipse.setAttribute("fill", "none");
        svg.appendChild(elipse);
    }
}

// Crear y dibujar las figuras en el SVG
const svgCanvas = document.getElementById('svgCanvas');

// Crear y dibujar las figuras
const linea = new Linea(50, 50, 200, 200);
linea.dibujar(svgCanvas);

const circunferencia = new Circunferencia(300, 100, 50);
circunferencia.dibujar(svgCanvas);

const elipse = new Elipse(400, 300, 80, 50);
elipse.dibujar(svgCanvas);
