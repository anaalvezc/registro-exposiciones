let animales = {};

function mostrarFormulario() {
  document.getElementById("formulario-container").classList.remove("hidden");
}

function ocultarFormulario() {
  document.getElementById("formulario-container").classList.add("hidden");
}

function agregarAnimal(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const raza = document.getElementById("raza").value.trim();
  const año = document.getElementById("año").value.trim();
  const foto = document.getElementById("foto").value.trim();

  if (!nombre) return alert("Debe tener nombre");

  animales[nombre] = {
    nombre,
    raza,
    año,
    foto,
    exposiciones: []
  };

  const selector = document.getElementById("selectorAnimal");
  const opcion = document.createElement("option");
  opcion.value = nombre;
  opcion.textContent = nombre;
  selector.appendChild(opcion);

  ocultarFormulario();
  document.getElementById("formularioAnimal").reset();
}

function mostrarAnimalSeleccionado() {
  const nombre = document.getElementById("selectorAnimal").value;
  const animal = animales[nombre];
  const contenedor = document.getElementById("main-content");
  if (!animal) {
    contenedor.innerHTML = "";
    return;
  }

  let html = `<h2>${animal.nombre}</h2>
    <p><strong>Raza:</strong> ${animal.raza || "-"}</p>
    <p><strong>Año:</strong> ${animal.año || "-"}</p>`;

  if (animal.foto) {
    html += `<img src="${animal.foto}" width="200" /><br/>`;
  }

  html += `<button onclick="agregarExposicion('${nombre}')">➕ Agregar Exposición</button>`;
  html += "<table><thead><tr><th>Evento</th><th>Año</th><th>Premio</th></tr></thead><tbody>";

  animal.exposiciones.forEach(exp => {
    html += `<tr><td>${exp.evento}</td><td>${exp.año}</td><td>${exp.premio}</td></tr>`;
  });

  html += "</tbody></table>";
  contenedor.innerHTML = html;
}

function agregarExposicion(nombre) {
  const evento = prompt("Nombre del evento:");
  const año = prompt("Año de participación:");
  const premio = prompt("Premio recibido:");

  if (!evento || !año || !premio) return;

  animales[nombre].exposiciones.push({
    evento,
    año,
    premio
  });

  mostrarAnimalSeleccionado(); // refrescar
}
