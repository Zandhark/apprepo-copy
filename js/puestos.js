function agregarFormato(moneda) {
  return moneda.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const minsalario = document.getElementById("minsalario");
const slider2 = document.getElementById("maxsalario");
const value1 = document.getElementById("minsalario-value");
const value2 = document.getElementById("maxsalario-value");
const searchInput = document.getElementById("busqueda");

minsalario.addEventListener("input", function () {
  value1.textContent = agregarFormato(minsalario.value);
  if (parseInt(minsalario.value) > parseInt(maxsalario.value)) {
    maxsalario.value = minsalario.value;
    value2.textContent = agregarFormato(minsalario.value);
  }
  updateFilteredPositions();
});

maxsalario.addEventListener("input", function () {
  value2.textContent = agregarFormato(maxsalario.value);
  if (parseInt(maxsalario.value) < parseInt(minsalario.value)) {
    minsalario.value = maxsalario.value;
    value1.textContent = agregarFormato(maxsalario.value);
  }
  updateFilteredPositions();
});

searchInput.addEventListener("input", function () {
  updateFilteredPositions();
});

async function updateFilteredPositions() {
  const puestos = await getJobs();

  const minSalaryFilter = parseInt(minsalario.value);
  const maxSalaryFilter = parseInt(maxsalario.value);
  const searchQuery = searchInput.value.toLowerCase();

  const filteredPuestos = puestos.filter((puesto) => {
    const salarioMin = puesto.rangoSalario[0];
    const salarioMax = puesto.rangoSalario[1];
    const puestoNombre = puesto.nombre.toLowerCase();

    return (
      salarioMin >= minSalaryFilter &&
      salarioMax <= maxSalaryFilter &&
      (puestoNombre.includes(searchQuery) ||
        puesto.descripcion.toLowerCase().includes(searchQuery))
    );
  });

  const puestosContainer = document.getElementById("main-content");
  puestosContainer.innerHTML = "";

  if (filteredPuestos.length === 0) {
    const noPuestos = document.createElement("div");
    noPuestos.className =
      "flex flex-column flex-align-center flex-space-center height-100";
    noPuestos.innerHTML = `
          <h2>No se encontraron puestos</h2>
          <p>Intenta con otros filtros</p>
        `;
    puestosContainer.appendChild(noPuestos);
  }

  filteredPuestos.forEach((puesto) => {
    const parsedDate = new Date(puesto.createdAt);
    const timeDifference = Date.now() - parsedDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const days = Math.abs(Math.floor(daysDifference));

    const puestosContainer = document.getElementById("main-content");
    const puestoElement = document.createElement("div");

    puestoElement.className =
      "border flex flex-gap-20 puestos flex-align-center";
    puestoElement.id = `puesto-${puesto._id}`;

    puestoElement.innerHTML = `
      <div class="flex flex-column flex-gap-10 info-puestos">
        <h2 id="titulo-puesto-${puesto._id}">${puesto.nombre}</h2>
        <h3 id="nombre-empresa-${puesto._id}">${puesto.empresa.nombre}</h3>
        <p id="desc-puesto">
          ${puesto.descripcion}
        </p>
        ${
          days < 1
            ? `<p id="fecha-publicacion">Publicado hace menos de un día.</p>`
            : `<p id="fecha-publicacion">Publicado hace ${days} días.</p>`
        }
        <p id="rango-salario">Rango Salarial: ₡${puesto.rangoSalario[0]}~ ₡${
      puesto.rangoSalario[1]
    }</p>
      </div>
      <div class="flex flex-grow1 flex-align-center flex-space-center">
        <a href="/puestos/puesto.html?id=${puesto._id}">
          <button class="main-button">Ver más</button>
        </a>
      </div>
    `;

    puestosContainer.appendChild(puestoElement);
  });
}

async function getJobs() {
  try {
    const response = await fetch("http://localhost:3000/api/puestos");
    const puestos = await response.json();
    return puestos;
  } catch (e) {
    alert("Error al obtener los puestos");
  }
}

async function renderPuestos() {
  const puestos = await getJobs();
  console.log(puestos);
  const puestosContainer = document.getElementById("main-content");

  puestos.reverse().forEach((puesto) => {
    // if (puesto.visibilidad === "Privado") return; // solo lista puestos publicos
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
      <div class="flex flex-grow1 flex-align-center flex-space-center">
        <a href="/puestos/puesto.html?id=${puesto._id}">
          <button class="main-button">Ver mas</button>
        </a>
      </div>
    </div>
  `;
  });
}

renderPuestos();
updateFilteredPositions();
