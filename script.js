const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Definir el tamaño del canvas para que coincida con el contenedor
canvas.width = 1200;
canvas.height = 800;

let shapes = [];
let selectedShape = null;
let dragging = false;
let offsetX, offsetY;

function addShape(type) {
    const shape = {
        type,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        color: document.getElementById('colorPicker').value
    };
    shapes.push(shape);
    drawShapes();
}

function deleteShape() {
    if (selectedShape !== null) {
        shapes.splice(selectedShape, 1);
        selectedShape = null;
        document.getElementById('colorPicker').classList.add('hidden');
        drawShapes();
    }
}

function generateVector() {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">`;
    shapes.forEach(shape => {
        const color = shape.color;
        switch (shape.type) {
            case 'circle':
                svg += `<circle cx="${shape.x}" cy="${shape.y}" r="${shape.width / 2}" fill="${color}" />`;
                break;
            case 'rectangle':
                svg += `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" fill="${color}" />`;
                break;
            case 'triangle':
                svg += `<polygon points="${shape.x},${shape.y} ${shape.x + shape.width},${shape.y} ${shape.x + shape.width / 2},${shape.y - shape.height}" fill="${color}" />`;
                break;
        }
    });
    svg += `</svg>`;

    const vectorOutput = document.getElementById('vector-output');
    vectorOutput.innerHTML = `<h3>Figura Vectorizada:</h3><pre>${svg}</pre>`;
}

function generateRaster() {
    drawShapes();
    const dataUrl = canvas.toDataURL('image/png');
    const rasterOutput = document.getElementById('raster-output');
    rasterOutput.innerHTML = `<h3>Figura Rasterizada:</h3><img src="${dataUrl}" alt="Figura Rasterizada">`;
}

function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape, index) => {
        ctx.fillStyle = shape.color;
        switch (shape.type) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.width / 2, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'rectangle':
                ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(shape.x, shape.y);
                ctx.lineTo(shape.x + shape.width, shape.y);
                ctx.lineTo(shape.x + shape.width / 2, shape.y - shape.height);
                ctx.closePath();
                ctx.fill();
                break;
        }
    });
}

function updateSelectedShapeColor(color) {
    if (selectedShape !== null) {
        shapes[selectedShape].color = color;
        drawShapes();
    }
}

function updateSize(size) {
    if (selectedShape !== null) {
        const shape = shapes[selectedShape];
        shape.width = size;
        shape.height = size;
        drawShapes();
    }
}

function isPointInShape(x, y, shape) {
    switch (shape.type) {
        case 'circle':
            return Math.hypot(x - shape.x, y - shape.y) <= shape.width / 2;
        case 'rectangle':
            return x >= shape.x && x <= shape.x + shape.width &&
                   y >= shape.y && y <= shape.y + shape.height;
        case 'triangle':
            const { x: x1, y: y1 } = shape;
            const x2 = x1 + shape.width;
            const y2 = y1;
            const x3 = x1 + shape.width / 2;
            const y3 = y1 - shape.height;

            const area = Math.abs((x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) / 2);
            const s1 = Math.abs((x*(y1-y2) + x1*(y2-y) + x2*(y-y1)) / 2) / area;
            const s2 = Math.abs((x*(y2-y3) + x2*(y3-y) + x3*(y-y2)) / 2) / area;
            const s3 = Math.abs((x*(y3-y1) + x3*(y1-y) + x1*(y-y3)) / 2) / area;

            return s1 >= 0 && s2 >= 0 && s3 >= 0;
    }
    return false;
}

canvas.addEventListener('mousedown', e => {
    const { offsetX: x, offsetY: y } = e;
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if (isPointInShape(x, y, shape)) {
            selectedShape = i;
            dragging = true;
            offsetX = x - shape.x;
            offsetY = y - shape.y;
            document.getElementById('colorPicker').classList.remove('hidden');
            document.getElementById('colorPicker').value = shape.color;
            break;
        }
    }
});

canvas.addEventListener('mousemove', e => {
    if (dragging && selectedShape !== null) {
        const { offsetX: x, offsetY: y } = e;
        const shape = shapes[selectedShape];
        shape.x = x - offsetX;
        shape.y = y - offsetY;
        drawShapes();
    }
});

canvas.addEventListener('mouseup', () => {
    dragging = false;
});
