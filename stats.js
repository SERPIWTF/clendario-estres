function actualizarEstadisticas() {
    const datos = JSON.parse(localStorage.getItem('estresCalendario')) || {};
    let conteo = { bajo: 0, medio: 0, alto: 0, critico: 0 };

    // Contar cada registro guardado
    Object.values(datos).forEach(item => {
        if (conteo[item.nivel] !== undefined) {
            conteo[item.nivel]++;
        }
    });

    // Actualizar los números en la pantalla
    document.getElementById("count-bajo").textContent = conteo.bajo;
    document.getElementById("count-medio").textContent = conteo.medio;
    document.getElementById("count-alto").textContent = conteo.alto;
    document.getElementById("count-critico").textContent = conteo.critico;
}

// Escuchar cuando se guarda algo para actualizar las stats
const originalGuardarEstado = window.guardarEstado;
window.guardarEstado = function() {
    originalGuardarEstado(); // Ejecuta el código original
    actualizarEstadisticas(); // Ejecuta la actualización de stats
};

// Cargar al inicio
actualizarEstadisticas();