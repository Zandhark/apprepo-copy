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
const empleadosContainer = document.getElementById("empeleados-container");
const invitarModal = document.getElementById("invitar-modal");
const usuariosSelect = document.getElementById("usuarios-select");

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

function handleProfileImangeModal(e) {
  e.preventDefault();
  const profileImageModal = document.getElementById("profile-image-modal");
  profileImageModal.style.display = "block";
}

function handleProfileImangeModalClose(e) {
  e.preventDefault();
  const profileImageModal = document.getElementById("profile-image-modal");
  profileImageModal.style.display = "none";
}

async function handleProfileImangeChange(e) {
  e.preventDefault();
  const file = document.getElementById("imagen-perfil").files[0];
  if (file.size > 3000000) {
    alert("El no debe superar los 3MB");
    return;
  }
  const imgBase64 = await convertBase64(file);
  try {
    const response = await fetch(
      `http://localhost:3000/api/empresas/logo/${empresaId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileImg: imgBase64 }),
      });
    const updatedUser = await response.json();
    console.log(updatedUser);
    location.reload();
  } catch (e) {
    console.log(e)
    alert("Error al actualizar el perfil");
    handleProfileImangeModalClose(e);
  }

}
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

async function handleInvitarEmpleadoModal(e) {
  e.preventDefault();
  if (e.target.id === "cancelar") {
    invitarModal.style.display = "none";
    usuariosSelect.innerHTML = "";
    return;
  }
  invitarModal.style.display = "block";
  const response = await fetch(`http://localhost:3000/api/usuarios/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const usuarios = await response.json();
  const usuariosFilter = usuarios.filter((usuario) => {
    return !usuario.empresa;
  });
  usuariosFilter.forEach((usuario) => {
    usuariosSelect.innerHTML += `
    <option value="${usuario._id}">${usuario.name} (${usuario.email})</option>
    `;
  });
}

async function handleInvitarEmpleado(e) {
  e.preventDefault();
  const userId = usuariosSelect.value;
  console.log(userId);
  try {
    const response = await fetch(
      `http://localhost:3000/api/empresas/usuarios/${empresaId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );
    const empresa = await response.json();

    const responseUser = await fetch(
      `http://localhost:3000/api/usuarios/update/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ empresa: empresaId }),
      }
    );
    const user = await responseUser.json();
    window.location.reload();
    invitarModal.style.display = "none";
  } catch (e) {
    console.log(e);
    alert("Error al invitar usuario.");
    invitarModal.style.display = "none";
  }
}

async function handleRemoveUser(e) {
  if (confirm("¿Está seguro de que desea eliminar este usuario de la empresa?")){
    try {
      const response = await fetch(`http://localhost:3000/api/empresas/usuarios/delete/${empresaId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: e.target.id }),
        }
      );
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
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
        ${
          days < 1
            ? `
        <p id="fecha-publicacion">Publicado hace menos de un dia.</p>
        `
            : `
        <p id="fecha-publicacion">Publicado hace ${days} dias.</p>
        `
        }

        <p id="rango-salario">
          Rango Salarial: ₡${puesto.rangoSalario[0]}~ ₡${puesto.rangoSalario[1]}
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

  empresa.empleados.forEach((empleado) => {
    let tipoEmpleado = "";

    if (empleado.type === "manager") {
      tipoEmpleado = "Manager";
    } else if (empleado.type === "endUser") {
      tipoEmpleado = "Usuario Final";
    } else if (empleado.type === "reclutador") {
      tipoEmpleado = "Reclutador";
    }
    empleadosContainer.innerHTML += `
    <div
      class="border flex flex-gap-10 puestos flex-align-center"
      id="${empleado._id}"
      style="margin-top: 5px; margin-bottom: 10px; width: 100%"
    >
      <div>
        <img
          src="${empleado.profileImg}"
          alt="Imagen de perfil de ${empleado.name}"
          style="width: 100px; height: 100px; border-radius: 50%; margin-left: 10px"
        />
      </div>
      <div
        class="flex flex-column flex-gap-10 info-puestos"
        style="width: 65%; padding: 10px"
      >
        <h2 id="${empleado._id}">${empleado.name}</h2>
        <p id="desc-${empleado._id}">${empleado.about}</p>
        <p id="tipo-usuario">Tipo de usuario: ${tipoEmpleado}</p>
      </div>
      <div class="flex flex-grow1 flex-align-center flex-space-center flex-gap-10">
        <a href="/candidatos/perfil.html?id=${empleado._id}">
          <button class="main-button">Ver usuario</button>
        </a>
        <button class="main-button" style="margin-right: 10px;" id="${empleado._id}" onclick="handleRemoveUser(event)">Remover usuario</button>
      </div>
    </div>

  `;
  });
}

renderEmpresa();
