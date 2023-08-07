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

function handleShortDescription() {
  console.log(`shortDescription.innerText: ${shortDescription.innerText}`)
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
  const empresa = await getEmpresa(empresaId);
  
  logo.src = empresa.logo;
  empresaName.innerHTML = empresa.nombre;
  if (empresa.shortDesc) {
    shortDescription.innerText = empresa.shortDesc;
    currentShortDescription = empresa.shortDesc;
  } else {
    shortDescription.innerText = "Agregar descripción corta";
    currentShortDescription = "Agregar descripción corta";
  }
  empresaDescripcion.innerText = empresa.descripcion;
}

renderEmpresa();