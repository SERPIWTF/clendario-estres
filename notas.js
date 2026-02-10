document.addEventListener('DOMContentLoaded', () => {
    renderizarNotas();
});

function guardarNota() {
    const areaTexto = document.getElementById('nota-texto');
    const contenido = areaTexto.value.trim();

    if (contenido === "") return;

    const nota = {
        id: Date.now(),
        texto: contenido,
        fecha: new Date().toLocaleString('es-MX', { 
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
        })
    };

    let notas = JSON.parse(localStorage.getItem('misNotas')) || [];
    notas.unshift(nota);
    localStorage.setItem('misNotas', JSON.stringify(notas));

    areaTexto.value = ""; 
    renderizarNotas();
}

function renderizarNotas() {
    const contenedor = document.getElementById('contenedor-notas');
    const notas = JSON.parse(localStorage.getItem('misNotas')) || [];

    contenedor.innerHTML = notas.map(n => `
        <div style="background: white; border: 1px dashed #f48fb1; padding: 10px; margin-bottom: 10px; border-radius: 5px; font-family: sans-serif;">
            <small style="color: #ff8a80; font-weight: bold;">● ${n.fecha}</small>
            <p style="margin: 5px 0 0; color: #333;">${n.texto}</p>
        </div>
    `).join('');
}