const empresaId = document.cookie
  .split(";")
  .find((item) => item.includes("userId"))
  .split("=")[1];
const logo = document.getElementById("logo");
const shortDescription = document.getElementById("short-description");
let currentShortDescription;
const empresaName = document.getElementById("empresa-name");
const shortAboutSave = document.getElementById("save-shortAbout");
const shortAboutEdit = document.getElementById("edit-shortAbout");
const empresaDescripcion = document.getElementById("empresa-descripcion");
const aboutInput = document.getElementById("empresa-descripcion-text");
const modalDesc = document.getElementById("empresa-descripcion-modal");
const puestosContainer = document.getElementById("puestos");

async function getEmpresa() {
  const response = await fetch(
    `http://localhost:3000/api/empresas/${empresaId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const empresa = await response.json();
  return empresa;
}

async function getPuestos() {
  const response = await fetch(
    `http://localhost:3000/api/puestos/empresa/${empresaId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const puestos = await response.json();
  return puestos;
}

function handleShortDescription() {

  shortAboutSave.style.display = "block";
  shortAboutEdit.style.display = "none";
  shortDescription.contentEditable = true;
  shortDescription.classList.add("editable-content");
  shortDescription.focus();
}

async function handleShortDescriptionSave() {
  const newShortDescription = shortDescription.innerText;
  if (currentShortDescription !== newShortDescription) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/empresas/update/${empresaId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shortDescription: newShortDescription }),
        }
      );
      const updatedEmpresa = await response.json();
      shortDescription.classList.remove("editable-content");
      shortAboutSave.style.display = "none";
      shortAboutEdit.style.display = "block";
      shortDescription.contentEditable = false;
    } catch (e) {
      alert("Error al actualizar el perfil");
      shortDescription.classList.remove("editable-content");
      shortAboutSave.style.display = "none";
      shortAboutEdit.style.display = "block";
      shortDescription.contentEditable = false;
    }
  } else {
    shortDescription.classList.remove("editable-content");
    shortAboutSave.style.display = "none";
    shortAboutEdit.style.display = "block";
    shortDescription.contentEditable = false;
  }
}

function handleModalAbout() {
  aboutInput.value = empresaDescripcion.innerText;
  modalDesc.style.display = "block";
}

async function handleAboutSubmit(e) {
  e.preventDefault();
  const newAbout = aboutInput.value;
  try {
    const response = await fetch(
      `http://localhost:3000/api/empresas/update/${empresaId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descripcion: newAbout }),
      }
    );
    const empresa = await response.json();
    console.log(empresa);
    empresaDescripcion.innerText = empresa.descripcion;
    modalDesc.style.display = "none";
  } catch (e) {
    console.log(e);
    alert("Error al actualizar el perfil");
    modalDesc.style.display = "none";
  }
}

async function renderEmpresa() {
  const empresa = await getEmpresa();
  const puestos = await getPuestos();
  logo.src = empresa.logo;
  empresaName.innerHTML = empresa.nombre;
  if (empresa.shortDescription) {
    shortDescription.innerText = empresa.shortDescription;
    currentShortDescription = empresa.shortDescription;
  } else if (!shortDescription) {
    shortDescription.innerText = "Agregar descripción corta";
    currentShortDescription = "Agregar descripción corta";
  }
  empresaDescripcion.innerText = empresa.descripcion;
  puestos.forEach((puesto) => {
    const parsedDate = new Date(puesto.createdAt);
    const timeDifference = Date.now() - parsedDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const days = Math.abs(Math.floor(daysDifference));
    puestosContainer.innerHTML += `
    <div
      class="border flex flex-gap-10 puestos flex-align-center"
      id="puesto-${puesto._id}"
      style="margin-top: 5px; margin-bottom: 5px;"
    >
      <div class="flex flex-column flex-gap-10 info-puestos" style="width: 65%; padding: 10px;">
        <h2 id="titulo-puesto-${puesto._id}">${puesto.nombre}</h2>
        <p id="desc-puesto">${puesto.descripcion}</p>
        ${ days < 1 ? `
        <p id="fecha-publicacion">Publicado hace menos de un dia.</p>
        ` : `
        <p id="fecha-publicacion">Publicado hace ${days} dias.</p>
        ` }

        <p id="rango-salario">
          Rango Salarial: ₡${puesto.rangoSalario[0]}~ ₡${ puesto.rangoSalario[1] }
        </p>
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

renderEmpresa();