const nombrePuesto = document.getElementById("nombre-puesto");
const visibilidad = document.getElementById("visibilidad");
const infoEmpresa = document.getElementById("info-empresa");
const descripcionPuesto = document.getElementById("descripcion-puesto");
const requisitos = document.getElementById("requisitos-list");
const urlParams = new URLSearchParams(window.location.search);
let jobId = urlParams.get("id");
let sessionId;

try{
  sessionId = document.cookie
    .split(";")
    .find((item) => item.includes("sessionId"))
    .split("=")[1];
} catch (error) {
  
}

if (jobId === null) {
  alert("No se encontró el puesto");
  location.href = "/puestos";
}

function renderPuesto() {
  const puesto = getJob(jobId);
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
  descripcionPuesto.innerHTML = `
    <p>${puesto.descripcion}</p>
    <p>
      <strong>Salario:</strong> ${puesto.rangoSalario[0]} - ${puesto.rangoSalario[1]}
    </p>
  `;

  puesto.requisitos.forEach((requisito) => {
    const li = document.createElement("li");
    li.innerText = requisito;
    requisitos.appendChild(li);
  });
}

function getJob(id) {
  // const puesto = fetch(`https://api.example.com/puestos/${id}`); esto es un ejemplo de como prodria funcionar la llamada al API
  const puestosTemp = [
    {
      id: 0,
      nombre: `Senior Developer 0`,
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
      rangoSalario: [1000, 10000],
      requisitos: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
      fecha: "12/04/2023",
      visibilidad: "Privado",
      empresa: {
        id: 0,
        nombre: `Empresa 0`,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        logo: "https://via.placeholder.com/100",
      },
    },
    {
      id: 1,
      nombre: `Senior Developer 1`,
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
      rangoSalario: [1000, 10000],
      requisitos: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
      fecha: "12/04/2023",
      visibilidad: "Publico",
      empresa: {
        id: 0,
        nombre: `Empresa 1`,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        logo: "https://via.placeholder.com/100",
      },
    },
    {
      id: 2,
      nombre: `Senior Developer 2`,
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
      rangoSalario: [1000, 10000],
      requisitos: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
      fecha: "12/04/2023",
      visibilidad: "Publico",
      empresa: {
        id: 0,
        nombre: `Empresa 2`,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        logo: "https://via.placeholder.com/100",
      },
    },
  ];
  const puestoResult = puestosTemp[id];

  return puestoResult;
}

function handleApply() {
  if (sessionId === undefined) {
    alert("Debe iniciar sesión para aplicar a un puesto");
    location.href = "/login/";
    return;
  } else if (sessionId) {

    alert(`Ha aplicado al puesto de ${nombrePuesto.innerText}`);
    location.href = "/perfil/";
  }
}

renderPuesto();
