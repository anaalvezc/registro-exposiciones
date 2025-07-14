const premios = [
  {
    nombre: "Cerrillense",
    evento: "Encuentro del Ovino y la Granja",
    año: 2023,
    premio: "Campeón Cordero DL / Gran Campeón Macho",
    raza: "Frisona Milchschaf",
    foto: ""
  },
  {
    nombre: "Aria",
    evento: "Expo Prado",
    año: 2024,
    premio: "Reservada Gran Campeona Hembra",
    raza: "Frisona Milchschaf",
    foto: ""
  }
];

const cuerpoTabla = document.getElementById("cuerpo-tabla");

premios.forEach((premio) => {
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td>${premio.nombre}</td>
    <td>${premio.evento}</td>
    <td>${premio.año}</td>
    <td>${premio.premio}</td>
    <td>${premio.raza}</td>
    <td>${premio.foto ? `<img src="${premio.foto}" width="60"/>` : "-"}</td>
  `;

  cuerpoTabla.appendChild(fila);
});
