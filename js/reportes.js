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
  console.log(userId);
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
    <div>
    <img style="width: 70px" src="${empleado.profileImg}" alt="${empleado.nombre}" class="logo-empresa" />
    </div>
      <div class="flex flex-column flex-gap-5 flex-wrap" 
style="width: 300px;">
        <h2>${empleado.name}</h2>
        <h3>${empleado.title}</h3>
        <div>
          <p>${empleado.about}</p>
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
};

async function getAplications() {
  const response = await fetch(`http://localhost:3000/api/aplicaciones`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const aplications = await response.json();
  return aplications;
};

async function renderAplications() {
  const empresaId = await getEmpresa();
  console.log(userId);
  const aplicationsFilter = await getAplications();
  const aplications = aplicationsFilter.filter((aplication) => {
    return aplication.empresa === empresaId;
  });

  const aplicationsHTML = aplications.map((aplication, index) => {
    
    //Status Upper Case
    const status = (aplication.status).charAt(0).toUpperCase() + (aplication.status).slice(1);


    return `
    <div
    id="${aplication._id}"
    class="padding-box flex flex-align-center flex-gap-10 
notification border flex-space-between"
  >
    <div class="flex flex-gap-20">
      <div class="flex flex-column flex-gap-5 flex-wrap" 
style="width: 300px;">
        <h2>${aplication.puesto.nombre}</h2>
        <h3>${aplication.candidato.name}</h3>
        <div class="flex">
          <p >Estado:</p>
          <p style="margin-left: 5px; color: var(--primary-color)" >${status}</p>
        </div>
      </div>
    </div>
    <p></p>
    <a href="/candidatos/perfil.html?id=${aplication.candidato._id}">
      <button class="main-button">Ver perfil del candidato</button>
    </a>
  </div>
  `;
  });

  mainContent.innerHTML = aplicationsHTML.join("");
}