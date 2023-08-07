const empresaId = document.cookie
  .split(";")
  .find((item) => item.includes("userId"))
  .split("=")[1];
const logo = document.getElementById("logo");
const shortDescription = document.getElementById("short-description");
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
  shortAboutSave.style.display = "block";
  shortAboutEdit.style.display = "none";
  shortDescription.contentEditable = true;
  shortDescription.classList.add("editable-content");
  shortDescription.focus();
}

async function handleShortDescriptionSave() {
  const newShortDescription = shortDescription.innerText;
  if (!shortDescription.innerText === newShortDescription) {
    // try {
    //   const response = await fetch(
    //     `http://localhost:3000/api/usuarios/${userId}`,
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ userDescription: newShortDescription }),
    //     }
    //   );
    //   const updatedUser = await response.json();
    //   userDescription.classList.remove("editable-content");
    //   shortAboutSave.style.display = "none";
    //   shortAboutEdit.style.display = "block";
    //   userDescription.contentEditable = false;
    // } catch (e) {
    //   alert("Error al actualizar el perfil");
    //   userDescription.classList.remove("editable-content");
    //   shortAboutSave.style.display = "none";
    //   shortAboutEdit.style.display = "block";
    //   userDescription.contentEditable = false;
    // }
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
    shortDescription.innerHTML = empresa.shortDesc;
  } else {
    shortDescription.innerHTML = "Agregar descripción corta";
  }
}

renderEmpresa();