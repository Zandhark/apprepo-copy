const nombreEmpresa = document.getElementById("nombreEmpresa");
const empresaShortDesc = document.getElementById("empresaShortDesc");
const empresaDescripcion = document.getElementById("empresaDescripcion");
const puestosContainer = document.getElementById("puestos-disponibles");

const urlParams = new URLSearchParams(window.location.search);

async function fetchEmpresa(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/empresas/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la empresa");
    }
    const empresa = await response.json();
    return empresa;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

async function fetchPuestos(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/puestos/empresa/${id}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener los puestos");
    }
    const puestos = await response.json();
    return puestos;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

async function renderEmpresa() {
  const empresaId = urlParams.get("id");
  const empresa = await fetchEmpresa(empresaId);
  const puestos = await fetchPuestos(empresaId);
  document.title = `${empresa.nombre}`;
  console.log(empresa);
  nombreEmpresa.innerText = empresa.nombre;
  empresaShortDesc.innerText = empresa.shortDesc;
  empresaDescripcion.innerText = empresa.descripcion;
  puestos.forEach((puesto) => {
    const parsedDate = new Date(puesto.createdAt);
    const timeDifference = Date.now() - parsedDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const days = Math.abs(Math.floor(daysDifference));
    puestosContainer.innerHTML += `
    <div
      class="border flex flex-gap-20 puestos flex-align-center company-jobs"
      id="puesto-${puesto._id}"
    >
    <div class="flex flex-column">
      <div class="flex flex-column flex-gap-10 info-puestos">
        <h2 id="titulo-puesto-${puesto._id}">${puesto.nombre}</h2>
        <p id="desc-puesto">
          ${puesto.descripcion}
        </p>
        ${
          days < 1
            ? `<p id="fecha-publicacion">Publicado hace menos de un dia.</p>`
            : `<p id="fecha-publicacion">Publicado hace ${days} dias.</p>`
        }
        
        <p id="rango-salario">Rango Salarial: ₡${puesto.rangoSalario[0]} ~ ₡${
      puesto.rangoSalario[1]
    }</p>
      </div>
      <div class="flex flex-grow1 flex-align-center flex-space-center">
        <a href="/puestos/puesto.html?id=${puesto._id}">
          <button class="main-button">Ver mas</button>
        </a>
      </div>
      </div>
    </div>
  `;
  });
}

renderEmpresa();
