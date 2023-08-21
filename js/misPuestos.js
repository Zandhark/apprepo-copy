const managerId = document.cookie
  .split(";")
  .find((item) => item.includes("userId"))
  .split("=")[1];

const aplicantesModal = document.getElementById("aplicantes-modal");

function agregarFormato(moneda) {
  return moneda.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function getJobs() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/puestos/manager/${managerId}`
    );
    const puestos = await response.json();
    return puestos;
  } catch (e) {
    alert("Error al obtener los puestos");
  }
}

async function handleAplicantesModal(e) {

  if (e.target.id === "cancel-modal") {
    aplicantesModal.style.display = "none";
    return;
  }
  
  const aplicantesList = document.getElementById("aplicantes-list");
  try {
    const jobId = e.target.id;
    console.log(e)
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
    aplicantesModal.style.display = "block";
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
        <a href="/aplicaciones/aplicacion.html?id=${aplicante._id}">
        <button class="main-button">Ver aplicacion</button>
        </a>
      </div>
  
        `;
      });
    }
  } catch (e) {
    console.log(e);
    alert("Error al cargar los aplicantes.");
    aplicantesModal.style.display = "block";
  }
}

async function renderPuestos() {
  const puestos = await getJobs();
  const puestosContainer = document.getElementById("main-content");
  puestos.reverse().forEach((puesto) => {
    const parsedDate = new Date(puesto.createdAt);
    const timeDifference = Date.now() - parsedDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const days = Math.abs(Math.floor(daysDifference));
    puestosContainer.innerHTML += `
    <div
      class="border flex flex-gap-20 puestos flex-align-center"
      id="puesto-${puesto._id}"
    >
      <div class="flex flex-column flex-gap-10 info-puestos">
        <h2 id="titulo-puesto-${puesto._id}">${puesto.nombre}</h2>
        <h3 id="nombre-empresa-${puesto._id}">${puesto.empresa.nombre}</h3>
        <p id="desc-puesto">
          ${puesto.descripcion}
        </p>
        ${
          days < 1
            ? `<p id="fecha-publicacion">Publicado hace menos de un dia.</p>`
            : `<p id="fecha-publicacion">Publicado hace ${days} dias.</p>`
        }
        
        <p id="rango-salario">Rango Salarial: ₡${puesto.rangoSalario[0]}~ ₡${
      puesto.rangoSalario[1]
    }</p>
      </div>
      <div class="flex flex-grow1 flex-align-center flex-space-center flex-gap-10">
        <a href="/puestos/puesto.html?id=${puesto._id}">
          <button class="main-button" style="width: 60px;">Ver</button>
        </a>
        <button class="main-button" style="width: 60px;" onclick="handleAplicantesModal(event)" id="${puesto._id}">Aplicantes</button>
      </div>
    </div>
  `;
  });
}

renderPuestos();
