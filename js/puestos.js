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
  const puestosContainer = document.getElementById("main-content");
  puestos.forEach((puesto, index) => {
    puestosContainer.innerHTML += `
    <div
      class="border flex flex-gap-20 puestos flex-align-center"
      id="puesto-${puesto.id}"
    >
      <div class="flex flex-column flex-gap-10 info-puestos">
        <h2 id="titulo-puesto-${index}">${puesto.nombre}</h2>
        <h3 id="nombre-empresa-${index}">${puesto.empresa.nombre}</h3>
        <p id="desc-puesto">
          ${puesto.descripcion}
        </p>
        <p id="fecha">Fecha: ${puesto.fecha}</p>
        <p id="rango-salario">Rango Salarial: ${puesto.rangoSalario[0]}~${puesto.rangoSalario[1]}</p>
      </div>
      <div class="flex flex-grow1 flex-align-center flex-space-center">
        <a href="/puestos/puesto.html?id=${puesto.id}">
          <button class="main-button">Ver mas</button>
        </a>
      </div>
    </div>
  `;
  });
}

renderPuestos();
