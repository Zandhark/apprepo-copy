const mainContent = document.getElementById("main-content");

const userId = document.cookie
  .split(";")
  .find((item) => item.includes("userId"))
  .split("=")[1];

  async function getEmpresa() {
    const response = await fetch(
      `http://localhost:3000/api/usuarios/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  
    const user = await response.json();
    const empresaId = user.empresa;
    return empresaId;
  }

async function getEmpleados() {
  const response = await fetch(`http://localhost:3000/api/usuarios/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const usuarios = await response.json();
  return usuarios;
}

async function renderEmpleados() {
  const empresaId = await getEmpresa();
  console.log(empresaId);
  const empleadosFilter = await getEmpleados();
  const empleados = empleadosFilter.filter((empleado) => {
    return empleado.empresa === empresaId;
  });

  const empleadosHTML = empleados.map((empleado, index) => {
    
    return `
    <div
    id="${empleado._id}"
    class="padding-box flex flex-align-center flex-gap-10 
notification border flex-space-between"
  >
    <div class="flex flex-gap-20">
      <div class="flex flex-column flex-gap-5 flex-wrap" 
style="width: 300px;">
        <h2>${empleado.name}</h2>
        <h3>${empleado.title}</h3>
        <div>
          <p>${empleado.userDescription}</p>
        </div>
      </div>
    </div>
    <p></p>
    <a href="/candidatos/perfil.html?id=${empleado._id}">
      <button class="main-button">Ver perfil</button>
    </a>
  </div>
  `;
  });

  mainContent.innerHTML = empleadosHTML.join("");
}


async function getInvitations() {
  const response = await fetch(`http://
localhost:3000/api/invitations/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const invitations = await response.json();
  return invitations;
}

async function renderInvitations() {
  const invitations = 
getInvitations(0);
  const invitationsHTML = 
invitations.map((invitation, 
index) => {
    return `
    <div
      id="invitacion-${index}"
      class="border padding-box 
flex flex-align-center 
flex-gap-40 notification"
    >
      <div>
        <h2>${invitation.title}</
h2>
        <h3>Estado de la 
aplicación: ${invitation.
status}</h3>
        <div class="flex 
flex-align-center 
flex-gap-5">
          <p>${invitation.
description}</p>
        </div>
      </div>
      <a href="/invitaciones/
invitacion.html?id=$
{invitation.id}">
        <button 
class="main-button">Ver 
invitación</button>
      </a>
    </div>


    `;
  });
  mainContent.innerHTML = 
invitationsHTML.join("");
}
