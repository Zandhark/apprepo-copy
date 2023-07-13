const mainContent = document.getElementById("main-content");
const estadoSeleccionado = document.getElementById("select-estado");
estadoSeleccionado.addEventListener("change", filtrarAplicaciones);

let aplicaciones = [];

function getJobApplications(userId) {
  aplicaciones = [
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "Enviada",
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "Aceptada",
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "En Revisión",
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "Denegada",
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "Enviada",
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "Enviada",
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "Enviada",
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "Enviada",
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      companyImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
      status: "Enviada",
    },
  ];
}

function filtrarAplicaciones() {

  mainContent.innerHTML = "<h1>Mis aplicaciones</h1>";

  function filtrarEstado(item) {
    return item.status === String(estadoSeleccionado.value);
  }

  const aplicacionesFiltradas = aplicaciones.filter(filtrarEstado);

  aplicacionesFiltradas.forEach((puesto, index) => {
    const aplicacionDiv = document.createElement("div");
    aplicacionDiv.classList = "padding-box flex flex-align-center flex-gap-10";
    aplicacionDiv.id = `puesto-${index}`;

    aplicacionDiv.innerHTML = `
      <div id="puesto-svg-${index}">
      <img class="img-style" src="${puesto.companyImg}" alt="imagen-empresa">
      </div>
    <div style="width:75%">
      <h2>${puesto.title}</h2>
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
    
        <p>${puesto.date}</p>
      </div>
      <p class="notification-description">${puesto.description}</p>
    </div>
    <h3 class="flex" style="align-items: center; text-align: right">${puesto.status}</h3>
    
    `;

    mainContent.appendChild(aplicacionDiv);
  });
}

function renderApplications() {
  getJobApplications(0);

  aplicaciones.forEach((aplicacion, index) => {
    const aplicacionDiv = document.createElement("div");
    aplicacionDiv.classList = "padding-box flex flex-align-center flex-gap-10";
    aplicacionDiv.id = `puesto-${index}`;

    aplicacionDiv.innerHTML = `
      <div id="puesto-svg-${index}">
      <img class="img-style" src="${aplicacion.companyImg}" alt="imagen-empresa">
      </div>
    <div style="width:75%">
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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 
0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
    
        <p>${aplicacion.date}</p>
      </div>
      <p class="notification-description">${aplicacion.description}</p>
    </div>
    <h3 class="flex" style="align-items: center; text-align: right">${aplicacion.status}</h3>
    
    `;

    mainContent.appendChild(aplicacionDiv);
  });
}

renderApplications();