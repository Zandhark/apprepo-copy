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


async function getAplications() {
  const response = await fetch(`http://localhost:3000/api/aplicaciones/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const aplications = await response.json();
  return aplications;
};