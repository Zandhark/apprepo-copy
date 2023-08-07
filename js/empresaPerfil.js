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
}

renderEmpresa();