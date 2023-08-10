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
    renderEmpresas(empresas);
  } else {
    renderEmpresas(empresasFiltradas);
  }
}

async function renderEmpresas(empresasToShow) {
  mainContent.innerHTML = "";

  if (!empresas) {
    empresas = await getCompanies();
  }

  empresasToShow.forEach((empresa, index) => {
    const empresaDiv = document.createElement("div");
    empresaDiv.id = `div-empresa-${empresa._id}`;
    empresaDiv.className =
      "padding-box flex flex-align-center flex-gap-10 notification border flex-space-between";
    empresaDiv.innerHTML = `
      <div class="flex flex-gap-20">
        <div class="flex flex-gap-20" style="width: 400px">
          <div>
            <img src="${empresa.logo}" alt="${empresa.nombre}" class="logo-empresa" />
          </div>
          <div>
            <h2>${empresa.nombre}</h2>
            <div>
              <p>${empresa.shortDescription ? empresa.shortDescription : ""}</p>
            </div>
          </div>
        </div>
      </div>
      <a href="/empresas/empresa.html?id=${empresa._id}">
        <button class="main-button">Ver empresa</button>
      </a>
    `;

    mainContent.appendChild(empresaDiv);
  });
}

(async function () {
  empresas = await getCompanies();
  renderEmpresas(empresas);
})();
