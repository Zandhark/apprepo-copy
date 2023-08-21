const mainContent = document.getElementById("main-content");
const estadoSeleccionado = document.getElementById("select-estado");
estadoSeleccionado.addEventListener("change", filtrarAplicaciones);
const userId = document.cookie
  .split(";")
  .find((item) => item.includes("userId"))
  .split("=")[1];

async function getJobApplications() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/aplicaciones/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const aplications = await response.json();
    console.log(aplications)
    return aplications;

  } catch (e) {
    console.log(e);
    // alert("Error al obtener la aplicación");
  }
}

function filtrarAplicaciones() {
  mainContent.innerHTML = "<h1>Mis aplicaciones</h1>";

  function filtrarEstado(item) {
    if (estadoSeleccionado.value === "Todas") return true;
    return item.status === String(estadoSeleccionado.value);
  }

  const aplicacionesFiltradas = aplicaciones.filter(filtrarEstado);

  aplicacionesFiltradas.forEach((aplicacion, index) => {
    const aplicacionDiv = document.createElement("div");
    aplicacionDiv.classList =
      "border padding-box flex flex-align-center flex-gap-10";
    aplicacionDiv.id = `aplicacion-${index}`;

    aplicacionDiv.innerHTML = `
    <div id="aplicacion-svg-${index}">
      <img class="img-style" src="${aplicacion.companyImg}" alt="imagen-empresa" />
      </div>
    <div style="width: 75%">
      <h2>${aplicacion.title}</h2>
      <div class="flex flex-align-center flex-gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          style="height: 20px; width: 20px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
    
        <p>${aplicacion.date}</p>
      </div>
      <p class="notification-description">${aplicacion.description}</p>
    </div>
    <h3 class="flex" style="align-items: center; text-align: right">
      ${aplicacion.status}
    </h3> 
    `;

    mainContent.appendChild(aplicacionDiv);
  });
}

async function renderApplications() {
  const aplicaciones = await getJobApplications();

  aplicaciones.forEach((aplicacion, index) => {
    const aplicacionDiv = document.createElement("div");
    aplicacionDiv.classList =
      "border padding-box flex flex-align-center flex-gap-10";
    aplicacionDiv.id = `puesto-${index}`;

    aplicacionDiv.innerHTML = `
    <div id="puesto-svg-${index}">
      <img class="img-style" src="${aplicacion.companyImg}" alt="imagen-empresa" />
    </div>
    <div style="width: 75%">
      <h2>${aplicacion.title}</h2>
    <div class="flex flex-align-center flex-gap-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
        style="height: 20px; width: 20px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18  0A2.25 2.25 
0   005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>

      <p>${aplicacion.date}</p>
    </div>
    <p class="notification-description">${aplicacion.description}</p>
  </div>
  <h3 class="flex" style="align-items: center; text-align: right">
  ${aplicacion.status}
  </h3>

  `;

    mainContent.appendChild(aplicacionDiv);
  });
}

renderApplications();
