const calendario = document.getElementById("calendario");
const nombreMesElemento = document.getElementById("mes-nombre");
const modal = document.getElementById("modal");

let fechaActual = new Date();
let idSeleccionado = null;
let elementoSeleccionado = null;

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function renderizarCalendario() {
    calendario.innerHTML = "";
    const mes = fechaActual.getMonth();
    const año = fechaActual.getFullYear();
    nombreMesElemento.textContent = `${meses[mes]} ${año}`;

    const primerDia = new Date(año, mes, 1).getDay();
    const totalDias = new Date(año, mes + 1, 0).getDate();

    for (let i = 0; i < primerDia; i++) {
        const vacio = document.createElement("div");
        vacio.classList.add("dia");
        vacio.style.visibility = "hidden";
        calendario.appendChild(vacio);
    }

    const datos = JSON.parse(localStorage.getItem('estresCalendario')) || {};

    for (let i = 1; i <= totalDias; i++) {
        const dia = document.createElement("div");
        dia.classList.add("dia");
        const idFecha = `${i}-${mes}-${año}`;
        dia.innerHTML = `<span>${i}</span><span class="emoji-dia"></span>`;

        if (datos[idFecha]) {
            dia.classList.add(`estres-${datos[idFecha].nivel}`);
            dia.querySelector(".emoji-dia").textContent = datos[idFecha].emoji;
        }

        dia.onclick = () => {
            idSeleccionado = idFecha;
            elementoSeleccionado = dia;
            document.getElementById("fecha-label").textContent = `${i} de ${meses[mes]}`;
            modal.style.display = "block";
        };
        calendario.appendChild(dia);
    }
}

function guardarEstado() {
    const nivel = document.getElementById("nivel-estres").value;
    const emojis = { bajo: "😊", medio: "😐", alto: "😟", critico: "😫" };
    const emoji = emojis[nivel];

    const datos = JSON.parse(localStorage.getItem('estresCalendario')) || {};
    datos[idSeleccionado] = { nivel, emoji };
    localStorage.setItem('estresCalendario', JSON.stringify(datos));

    elementoSeleccionado.className = `dia estres-${nivel}`;
    elementoSeleccionado.querySelector(".emoji-dia").textContent = emoji;
    cerrarModal();
}

function cambiarMes(dir) {
    fechaActual.setMonth(fechaActual.getMonth() + dir);
    renderizarCalendario();
}

function cerrarModal() { modal.style.display = "none"; }

function crearSakura() {
    const container = document.getElementById('sakura-container');
    for (let i = 0; i < 25; i++) {
        const petalo = document.createElement('div');
        petalo.className = 'sakura';
        petalo.style.left = Math.random() * 100 + 'vw';
        petalo.style.width = (Math.random() * 8 + 6) + 'px';
        petalo.style.height = petalo.style.width;
        petalo.style.animationDuration = (Math.random() * 6 + 4) + 's';
        petalo.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(petalo);
    }
}

renderizarCalendario();
crearSakura();