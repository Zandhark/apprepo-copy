const nombrePuesto = document.getElementById("nombre-puesto");
const visibilidad = document.getElementById("visibilidad");
const infoEmpresa = document.getElementById("info-empresa");
const descripcionPuesto = document.getElementById("descripcion-puesto");
const requisitos = document.getElementById("requisitos-list");
const urlParams = new URLSearchParams(window.location.search);
let jobId = urlParams.get("id");
let sessionId;

try {
  sessionId = document.cookie
    .split(";")
    .find((item) => item.includes("sessionId"))
    .split("=")[1];
} catch (error) {}

async function getJob(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/puestos/${id}`);
    const puestoResult = await response.json();
    if (puestoResult.error) {
      throw new Error(puestoResult.error);
      
    }
    return puestoResult;
  } catch (e) {
    alert("Error al obtener el puesto, " + e);
    location.href = "/puestos/";
  }
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

async function renderPuesto() {
  const puesto = await getJob(jobId);
  nombrePuesto.innerText = puesto.nombre;
  visibilidad.innerText = puesto.visibilidad;
  infoEmpresa.innerHTML = `
  <img src="${puesto.empresa.logo}" alt="${puesto.empresa.nombre}" />
  <p>
    <a href="/empresas/perfil.html?id=${puesto.empresa._id}"
      ><strong>${puesto.empresa.nombre}</strong></a>
    <br />
    ${puesto.empresa.shortDesc}
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

renderPuesto();
