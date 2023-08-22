const urlParams = new URLSearchParams(window.location.search);
const aplicationId = urlParams.get("id");
const applicationStatus = document.getElementById("application-status");
const detallesAplicante = document.getElementById("detalles-aplicante");

function handleLoading(elementId) {
  const loader = document.createElement("div");
  loader.classList.add("loading");
  loader.id = "loader";
  document.getElementById(`${elementId}`).appendChild(loader);
}

async function handleStatusChange(e) {
  e.preventDefault();
  const status = document.getElementById("application-status").value;
  try {
    handleLoading("application-select");
    applicationStatus.disabled = true;
    const response = await fetch(
      `http://localhost:3000/api/aplicaciones/update/${aplicationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    const data = await response.json();
    applicationStatus.disabled = false;
    document.getElementById("loader").remove();
  } catch (e) {
    console.log(e);
    alert("Error al actualizar el estado de la aplicación");
  }
}

async function getApplication() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/aplicacion/${aplicationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const aplication = await response.json();
    return aplication;
  } catch (e) {
    console.log(e);
    alert("Error al obtener la aplicación");
  }
}

async function renderAplicacion() {
  const aplication = await getApplication();
  applicationStatus.value = aplication.status;
  console.log(aplication);
  detallesAplicante.innerHTML = `
  <div>
    <h3>Nombre</h3>
    <p id="nombre-aplicante">${aplication.candidato.name}</p>
    <h3>Email</h3>
    <p id="email-aplicante">${aplication.candidato.email}</p>
    <h3>Titulo</h3>
    <p id="title-aplicante">${aplication.candidato.title}</p>
  </div>

  `;
}

renderAplicacion();
