let animales = {};

function mostrarFormulario(nombre = "") {
  document.getElementById("formulario-container").classList.remove("hidden");
  document.getElementById("tituloFormulario").textContent = nombre ? "Editar Animal" : "Agregar Nuevo Animal";

  if (nombre && animales[nombre]) {
    const a = animales[nombre];
    document.getElementById("nombre").value = a.nombre;
    document.getElementById("raza").value = a.raza;
    document.getElementById("año").value = a.año;
    document.getElementById("sexo").value = a.sexo || "";
    document.getElementById("padre").value = a.padre || "";
    document.getElementById("madre").value = a.madre || "";
    document.getElementById("foto").value = a.foto || "";
    document.getElementById("editandoNombre").value = nombre;
  } else {
    document.getElementById("formularioAnimal").reset();
    document.getElementById("editandoNombre").value = "";
  }
}

function ocultarFormulario() {
  document.getElementById("formulario-container").classList.add("hidden");
}

function guardarAnimal(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const raza = document.getElementById("raza").value.trim();
  const año = parseInt(document.getElementById("año").value);
  const sexo = document.getElementById("sexo").value;
  const padre = document.getElementById("padre").value.trim();
  const madre = document.getElementById("madre").value.trim();
  const foto = document.getElementById("foto").value.trim();
  const editando = document.getElementById("editandoNombre").value;

  if (editando && editando !== nombre) delete animales[editando];

  animales[nombre] = {
    nombre,
    raza,
    año,
    sexo,
    padre,
    madre,
    hijos: animales[nombre]?.hijos || [],
    foto,
    exposiciones: animales[nombre]?.exposiciones || [],
    pesos: animales[nombre]?.pesos || []
  };

  actualizarSelector();
  ocultarFormulario();
  mostrarAnimal(nombre);
}

function actualizarSelector() {
  const selector = document.getElementById("selectorAnimal");
  selector.innerHTML = `<option value="">-- Seleccionar Animal --</option>`;
  Object.keys(animales).forEach(nombre => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    selector.appendChild(option);
  });
}

function mostrarAnimalSeleccionado() {
  const nombre = document.getElementById("selectorAnimal").value;
  if (nombre) mostrarAnimal(nombre);
  else document.getElementById("main-content").innerHTML = "";
}

function mostrarAnimal(nombre) {
  const a = animales[nombre];
  const div = document.getElementById("main-content");

  let html = `<h2>${a.nombre}</h2>
    <p><strong>Raza:</strong> ${a.raza || "-"}</p>
    <p><strong>Año:</strong> ${a.año || "-"}</p>
    <p><strong>Sexo:</strong> ${a.sexo || "-"}</p>
    <p><strong>Padre:</strong> ${a.padre || "-"}</p>
    <p><strong>Madre:</strong> ${a.madre || "-"}</p>
    ${a.sexo === "Hembra" && a.hijos.length ? `<p><strong>Hijos:</strong> ${a.hijos.join(", ")}</p>` : ""}
    ${a.foto ? `<img src="${a.foto}" width="200"/>` : ""}
    <br><br>
    <button onclick="mostrarFormulario('${a.nombre}')">✏️ Editar Datos</button>
    <button onclick="agregarExposicion('${a.nombre}')">➕ Agregar Exposición</button>
    <button onclick="agregarPeso('${a.nombre}')">➕ Registrar Peso</button>
    <h3>Exposiciones</h3>
    <table><thead><tr><th>Evento</th><th>Año</th><th>Premio</th></tr></thead><tbody>
    ${a.exposiciones.map(e => `<tr><td>${e.evento}</td><td>${e.año}</td><td>${e.premio}</td></tr>`).join("")}
    </tbody></table>
    <h3>Pesos Registrados</h3>
    <table><thead><tr><th>Fecha</th><th>Peso (kg)</th></tr></thead><tbody>
    ${a.pesos.map(p => `<tr><td>${p.fecha}</td><td>${p.kg}</td></tr>`).join("")}
    </tbody></table>
  `;

  div.innerHTML = html;
}

function agregarExposicion(nombre) {
  const evento = prompt("Nombre del evento:");
  const año = prompt("Año de participación:");
  const premio = prompt("Premio recibido:");
  if (!evento || !año || !premio) return;
  animales[nombre].exposiciones.push({ evento, año, premio });
  mostrarAnimal(nombre);
}

function agregarPeso(nombre) {
  const fecha = prompt("Fecha (ej: 2024-08-18):");
  const kg = prompt("Peso en kg:");
  if (!fecha || !kg) return;
  animales[nombre].pesos.push({ fecha, kg });
  mostrarAnimal(nombre);
}

function ordenarPorEdad() {
  const ordenado = Object.entries(animales).sort((a, b) => (a[1].año || 0) - (b[1].año || 0));
  animales = Object.fromEntries(ordenado);
  actualizarSelector();
}
function ordenarPorSexo() {
  const ordenado = Object.entries(animales).sort((a, b) => (a[1].sexo || "").localeCompare(b[1].sexo || ""));
  animales = Object.fromEntries(ordenado);
  actualizarSelector();
}
function ordenarPorRaza() {
  const ordenado = Object.entries(animales).sort((a, b) => (a[1].raza || "").localeCompare(b[1].raza || ""));
  animales = Object.fromEntries(ordenado);
  actualizarSelector();
}
