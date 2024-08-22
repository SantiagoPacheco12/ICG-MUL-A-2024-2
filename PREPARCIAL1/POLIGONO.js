document.getElementById('dibujarBtn').addEventListener('click', dibujarFigura);
document.getElementById('coordenadasTipo').addEventListener('change', actualizarCampos);

function actualizarCampos() {
    const tipo = document.getElementById('coordenadasTipo').value;
    document.getElementById('coordenadasCartesiana').style.display = tipo === 'cartesiana' ? 'block' : 'none';
    document.getElementById('coordenadasPolar').style.display = tipo === 'polar' ? 'block' : 'none';
}

function dibujarFigura(event) {
    event.preventDefault(); 

    
    const nlados = parseInt(document.getElementById('nlados').value); 
    const tipo = document.getElementById('coordenadasTipo').value; 
    const color = document.getElementById('color').value; 

    const canvas = document.getElementById('canvas'); 
    const ctx = canvas.getContext('2d'); 

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    const tamaño = 150; 

    let coordX = canvas.width / 2;
    let coordY = canvas.height / 2;

    if (tipo === 'cartesiana') {
        coordX = parseInt(document.getElementById('coordX').value);
        coordY = parseInt(document.getElementById('coordY').value); 
    } else if (tipo === 'polar') {
        const radio = parseInt(document.getElementById('radio').value);
        const angulo = parseInt(document.getElementById('angulo').value) * Math.PI / 180; 
        coordX = canvas.width / 2 + radio * Math.cos(angulo);
        coordY = canvas.height / 2 - radio * Math.sin(angulo);
    }

    ctx.save(); 
    ctx.translate(coordX, coordY); 

    ctx.beginPath(); 


    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    if (!isNaN(nlados) && nlados >= 3) {
       
        dibujarPoligono(ctx, 0, 0, tamaño, nlados);
    } else {
        alert('Por favor, ingresa un número de lados válido (al menos 3 o si no no es un poligono).'); 
    }

    ctx.fill(); 
    ctx.stroke(); 
    ctx.restore(); 
}

function dibujarPoligono(ctx, x, y, radius, sides) {
    if (sides < 3) {
        console.error('El número de lados debe ser al menos 3 (si no no es un polígono).'); 
        return;
    }
    
    const angle = (2 * Math.PI) / sides; 

   
    const rotation = -Math.PI / 2; 
    
    ctx.moveTo(x + radius * Math.cos(rotation), y + radius * Math.sin(rotation)); 
    for (let i = 1; i <= sides; i++) {
        ctx.lineTo(x + radius * Math.cos(rotation + i * angle), y + radius * Math.sin(rotation + i * angle)); 
    }
    ctx.closePath(); 
}
