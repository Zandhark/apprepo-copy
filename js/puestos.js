async function getJobs() {
  // const puestosTemp = [
  //   {
  //     id: 0,
  //     nombre: `Senior Developer 0`,
  //     descripcion:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
  //     rangoSalario: [1000, 10000],
  //     requisitos: [
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     ],
  //     fecha: "12/04/2023",
  //     visibilidad: "Privado",
  //     empresa: {
  //       id: 0,
  //       nombre: `Empresa 0`,
  //       descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       logo: "https://via.placeholder.com/100",
  //     },
  //   },
  //   {
  //     id: 1,
  //     nombre: `Senior Developer 1`,
  //     descripcion:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
  //     rangoSalario: [1000, 10000],
  //     requisitos: [
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     ],
  //     fecha: "12/04/2023",
  //     visibilidad: "Publico",
  //     empresa: {
  //       id: 0,
  //       nombre: `Empresa 1`,
  //       descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       logo: "https://via.placeholder.com/100",
  //     },
  //   },
  //   {
  //     id: 2,
  //     nombre: `Senior Developer 2`,
  //     descripcion:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
  //     rangoSalario: [1000, 10000],
  //     requisitos: [
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     ],
  //     fecha: "12/04/2023",
  //     visibilidad: "Publico",
  //     empresa: {
  //       id: 0,
  //       nombre: `Empresa 2`,
  //       descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //       logo: "https://via.placeholder.com/100",
  //     },
  //   },
  // ];
  const response = await fetch("http://localhost:3000/api/puestos");
  const puestos = await response.json();
  
  return puestos;
}

async function renderPuestos() {
  const puestos = await getJobs();
  const puestosContainer = document.getElementById("main-content");
  puestos.forEach((puesto, index) => {
    puestosContainer.innerHTML += `
    <div
      class="border flex flex-gap-20 puestos flex-align-center"
      id="puesto-${puesto.id}"
    >
      <div class="flex flex-column flex-gap-10 info-puestos">
        <h2 id="titulo-puesto-${index}">${puesto.nombre}</h2>
        <h3 id="nombre-empresa-${index}">${puesto.empresa.nombre}</h3>
        <p id="desc-puesto">
          ${puesto.descripcion}
        </p>
        <p id="fecha">Fecha: ${puesto.fecha}</p>
        <p id="rango-salario">Rango Salarial: ${puesto.rangoSalario[0]}~${puesto.rangoSalario[1]}</p>
      </div>
      <div class="flex flex-grow1 flex-align-center flex-space-center">
        <a href="/puestos/puesto.html?id=${puesto.id}">
          <button class="main-button">Ver mas</button>
        </a>
      </div>
    </div>
  `;
  });
}

renderPuestos();