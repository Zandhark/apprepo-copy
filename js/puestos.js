const nombrePuesto = document.getElementById("nombre-puesto");
const visibilidad = document.getElementById("visibilidad");
const infoEmpresa = document.getElementById("info-empresa");
const descripcionPuesto = document.getElementById("descripcion-puesto");
const requisitos = document.getElementById("requisitos-list");

const puesto = {
  id: 0,
  nombre: "Senior Developer",
  descripcion:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
  salario: 100000,
  requisitos: [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  ],
  visibilidad: "Privado",
  empresa: {
    id: 0,
    nombre: "Empresa 1",
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    logo: "https://via.placeholder.com/100",
  },
};

function renderPuesto() {
  nombrePuesto.innerText = puesto.nombre;
  visibilidad.innerText = puesto.visibilidad;
  infoEmpresa.innerHTML = `
    <img src="${puesto.empresa.logo}" alt="${puesto.empresa.nombre}" />
    <p>
      <strong>${puesto.empresa.nombre}</strong>
      <br />
      ${puesto.empresa.descripcion}
    </p>
  `;
  descripcionPuesto.innerText = puesto.descripcion;
  puesto.requisitos.forEach((requisito) => {
    const li = document.createElement("li");
    li.innerText = requisito;
    requisitos.appendChild(li);
  });
}

renderPuesto();
