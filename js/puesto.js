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
const botonAplicantes = document.getElementById("boton-aplicantes");
const editarModal = document.getElementById("editar-modal");
const aplicantesModal = document.getElementById("aplicantes-modal");
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

async function handleApply() {
  if (sessionId === undefined) {
    alert("Debe iniciar sesión para aplicar a un puesto");
    location.href = "/login/";
    return;
  } else if (sessionId) {
    if (usrType !== "endUser") {
      alert("Debe iniciar sesión como usuario para aplicar a un puesto");
      return;
    }
    try {
      const puesto = await getJob(jobId);
      console.log(puesto);
      const response = await fetch(
        `http://localhost:3000/api/aplicaciones/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            puesto: jobId,
            candidato: usrId,
            empresa: puesto.empresa._id,
          }),
        }
      );
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      alert(`Ha aplicado al puesto de ${nombrePuesto.innerText}`);
      location.href = "/perfil/";
    } catch (e) {
      console.log(e);
      alert("Error al aplicar al puesto");
    }
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
  const currentReq = document
    .getElementById("requisitos-list")
    .getElementsByTagName("li");
  let requerimientos = [];
  for (let i = 0; i < currentReq.length; i++) {
    requerimientos.push(currentReq[i].innerText);
  }
  const currentAtributos = document
    .getElementById("atributos-list")
    .getElementsByTagName("li");
  const atributos = document.getElementById("modal-atributos");
  let atributosText = [];
  for (let i = 0; i < currentAtributos.length; i++) {
    atributosText.push(currentAtributos[i].innerText);
  }

  const currentVisibilidad = document.getElementById("visibilidad").innerText;
  const visibilidad = document.getElementById("modal-visibilidad");

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
  requisitos.value = requerimientos.join(",");
  atributos.value = atributosText.join(",");
  visibilidad.value = currentVisibilidad;
}

async function handleEditSubmit(e) {
  const modalNombre = document.getElementById("modal-nombre");
  const descripcion = document.getElementById("modal-descripcion");
  const requisitos = document.getElementById("modal-requisitos");
  const atributos = document.getElementById("modal-atributos");
  const visibilidad = document.getElementById("modal-visibilidad");
  const slider1 = document.getElementById("slider1");
  const slider2 = document.getElementById("slider2");

  const data = {
    nombre: modalNombre.value,
    descripcion: descripcion.value,
    rangoSalario: [slider1.value, slider2.value],
    requisitos: requisitos.value.split(","),
    atributos: atributos.value.split(","),
    visibilidad: visibilidad.value,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/api/puestos/update/${jobId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    alert("Puesto actualizado");
    location.href = `/puestos/puesto.html?id=${jobId}`;
  } catch (e) {
    alert("Error al actualizar el puesto, " + e);
  }
}

function handleDelete(e) {
  if (confirm("¿Está seguro que desea eliminar este puesto?")) {
    alert("Puesto eliminado");
    location.href = "/puestos/";
  }
}

async function handleAplicantesModal(e) {
  const aplicantesList = document.getElementById("aplicantes-list");
  if (e.target.id === "cancel-modal") {
    aplicantesModal.style.display = "none";
    aplicantesList.innerHTML = "";
    return;
  }
  aplicantesModal.style.display = "block";
  const loader = document.createElement("div");
  loader.classList.add("loading");
  loader.id = "loader";
  document.getElementById("aplicantes-list").appendChild(loader);
  try {
    const response = await fetch(
      `http://localhost:3000/api/aplicaciones/${jobId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const aplicantes = await response.json();
    console.log(aplicantes);
    if (aplicantes.length === 0) {
      aplicantesList.innerHTML = `<h2>No hay aplicantes</h2>`;
    } else {
      aplicantes.forEach((aplicante) => {
        aplicantesList.innerHTML += `
        <div
          id="${aplicante.candidato._id}"
          class="padding-box flex flex-align-center flex-gap-10 notification border flex-space-between"
        >
          <div class="flex flex-gap-20">
            <div class="flex flex-column flex-gap-5 flex-wrap" style="width: 300px">
              <h2>${aplicante.candidato.name}</h2>
              <h3>${aplicante.candidato.title}</h3>
              <div>
                <p>${aplicante.candidato.userDescription}</p>
              </div>
            </div>
          </div>
          <div>
            <h3>Estado</h3>
            <p>${aplicante.status}</p>
          </div>
          <a href="/aplicaciones/aplicacion.html?id=${aplicante._id}">
            <button class="main-button">Ver aplicacion</button>
          </a>
        </div>

        `;
      });
    }
    document.getElementById("loader").remove();
  } catch (e) {
    console.log(e);
    alert("Error al cargar los aplicantes.");
  }
}

async function renderPuesto() {
  const puesto = await getJob(jobId);

  if (usrType !== "manager" || usrId !== puesto.createdBy) {
    botonEditar.style.display = "none";
    botonEliminar.style.display = "none";
    botonAplicantes.style.display = "none";
  }
  if (usrType === "manager" || usrType === "reclutador") {
    botonAplicar.style.display = "none";
  }

  if (userType === "manager") {
    botonAplicantes.style.display = "block";
  }

  rangoSalario = puesto.rangoSalario;
  nombrePuesto.innerText = puesto.nombre;
  if (puesto.visibilidad === "publico") {
    visibilidad.innerText = "Público";
  } else {
    visibilidad.innerText = "Privado";
  }

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
