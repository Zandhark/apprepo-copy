const mainContent = document.getElementById("main-content");
const searchInput = document.getElementById("busqueda");
searchInput.addEventListener("keyup", searchCompanies);
let empresas;

async function getCompanies() {
  const response = await fetch("http://localhost:3000/api/empresas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const companies = await response.json();
  return companies;
}

function searchCompanies() {
  const searchValue = searchInput.value;
  const empresasFiltradas = empresas.filter((empresa) => {
    return empresa.nombre.toLowerCase().includes(searchValue.toLowerCase());
  });
  if (searchValue === "") {
    renderEmpresas();
    return;
  }
  renderEmpresas(empresasFiltradas);
}

async function renderEmpresas(empresasFiltradas) {
  if (empresasFiltradas) {
    const empresasHTML = empresasFiltradas.map((empresa, index) => {
      return `
      <div
      id="div-empresa-${empresa._id}"
      class="padding-box flex flex-align-center flex-gap-10 notification border flex-space-between"
    >
      <div class="flex flex-gap-20">
        <div class="flex flex-gap-20" style="width: 400px">
          <div>
            <img src="/assets/empresas-${index}.png" alt="logo de empresa" class="logo-empresa" />
          </div>
          <div>
            <h2>${empresa.nombre}</h2>
            <div>
              <p>${empresa.shortDesc}</p>
            </div>
          </div>
        </div>
      </div>
      <a href="/empresas/perfil.html?id=${empresa._id}">
        <button class="main-button">Ver empresa</button>
      </a>
      `;
    });
    mainContent.innerHTML = empresasHTML.join("");
    return;
  } else {
    empresas = await getCompanies();
    const empresasHTML = empresas.map((empresa, index) => {
      return `
    <div
      id="div-empresa-${empresa._id}"
      class="padding-box flex flex-align-center flex-gap-10 notification border flex-space-between"
    >
      <div class="flex flex-gap-20">
        <div class="flex flex-gap-20" style="width: 400px">
          <div>
            <img src="/assets/empresas-${index}.png" alt="logo de empresa" class="logo-empresa" />
          </div>
          <div>
            <h2>${empresa.nombre}</h2>
            <div>
              <p>${empresa.shortDesc}</p>
            </div>
          </div>
        </div>
      </div>
      <a href="/empresas/perfil.html?id=${empresa._id}">
        <button class="main-button">Ver empresa</button>
      </a>
    </div>

    `;
    });
    mainContent.innerHTML = empresasHTML.join("");
  }
}

renderEmpresas();
