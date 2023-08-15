const nombrePuesto = document.getElementById("nombre-puesto");
const visibilidad = document.getElementById("visibilidad");
const infoEmpresa = document.getElementById("info-empresa");
const descripcionPuesto = document.getElementById("descripcion-puesto");
const requisitos = document.getElementById("requisitos-list");
const atributos = document.getElementById("atributos-list");
const urlParams = new URLSearchParams(window.location.search);
const botonAplicar = document.getElementById("boton-aplicar");
const botonEditar = document.getElementById("boton-editar");
const botonEliminar = document.getElementById("boton-eliminar");
const editarModal = document.getElementById("editar-modal");
const jobId = urlParams.get("id");
let sessionId, usrType, usrId;
let rangoSalario = [];

try {
  sessionId = document.cookie
    .split(";")
    .find((item) => item.includes("sessionId"))
    .split("=")[1];
  usrType = document.cookie
  .split(";")
  .find((item) => item.includes("userType"))
  .split("=")[1];
  usrId = document.cookie
  .split(";")
  .find((item) => item.includes("userId"))
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

function agregarFormato(moneda) {
  return moneda.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function handleApply() {
  if (sessionId === undefined) {
    alert("Debe iniciar sesión para aplicar a un puesto");
    location.href = "/login/";
    return;
  } else if (sessionId) {
    if (usrType !== "endUser") {
      alert("Debe iniciar sesión como usuario para aplicar a un puesto");
      return;
    }
    alert(`Ha aplicado al puesto de ${nombrePuesto.innerText}`);
    location.href = "/perfil/";
  }
}

function handleEditModal(e) {
  if (e.target.id === "cancel-modal") {
    editarModal.style.display = "none";
    return;
  }
  const modalNombre = document.getElementById("modal-nombre");
  const descripcion = document.getElementById("modal-descripcion");
  const descPuesto = document.getElementById("desc-puesto");
  const requisitos = document.getElementById("modal-requisitos");
  const currentReq = document.getElementById("requisitos-list");
  editarModal.style.display = "block";

  slider1.addEventListener("input", function () {
    value1.textContent = agregarFormato(slider1.value);
    if (parseInt(slider1.value) > parseInt(slider2.value)) {
      slider2.value = slider1.value;
      value2.textContent = agregarFormato(slider1.value);
    }
  });
  
  slider2.addEventListener("input", function () {
    value2.textContent = agregarFormato(slider2.value);
    if (parseInt(slider2.value) < parseInt(slider1.value)) {
      slider1.value = slider2.value;
      value1.textContent = agregarFormato(slider2.value);
    }
  });
  
  modalNombre.value = nombrePuesto.innerText;
  slider1.value = parseInt(rangoSalario[0]);
  slider2.value = parseInt(rangoSalario[1]);
  value1.textContent = agregarFormato(slider1.value);
  value2.textContent = agregarFormato(slider2.value);
  descripcion.value = descPuesto.innerText;
  requisitos.value = requisitos.innerText;
}

function handleDelete(e) {
  if (confirm("¿Está seguro que desea eliminar este puesto?")) {
    alert("Puesto eliminado");
    location.href = "/puestos/";
  }
}

async function renderPuesto() {
  const puesto = await getJob(jobId);

  if (usrType !== "manager" || usrId !== puesto.createdBy) {
    botonEditar.style.display = "none";
    botonEliminar.style.display = "none";
  } 
  if (usrType === "manager" || usrType === "reclutador") {
    botonAplicar.style.display = "none";
  }

  
  rangoSalario = puesto.rangoSalario;
  nombrePuesto.innerText = puesto.nombre;
  visibilidad.innerText = puesto.visibilidad;
  infoEmpresa.innerHTML = `
  <img src="${puesto.empresa.logo}" alt="${puesto.empresa.nombre}" style="height: 100px;" />
  <p>
    <a href="/empresas/perfil.html?id=${puesto.empresa._id}"
      ><strong style="font-size: 18px">${puesto.empresa.nombre}</strong></a>
    <br />
    ${puesto.empresa.shortDescription}
  </p>
  `;
  descripcionPuesto.innerHTML = `
    <p id="desc-puesto">${puesto.descripcion}</p>
    <p style="padding-top: 20px">
      <strong>Salario:</strong> ₡${puesto.rangoSalario[0]} - ₡${puesto.rangoSalario[1]}
    </p>
  `;

  puesto.requisitos.forEach((requisito) => {
    const li = document.createElement("li");
    li.innerText = requisito;
    requisitos.appendChild(li);
  });

  puesto.atributos.forEach((atributo) => {
    const li = document.createElement("li");
    li.innerText = atributo;
    atributos.appendChild(li);
  });
}

renderPuesto();
