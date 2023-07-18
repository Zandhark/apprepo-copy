function getJobs() {
  const puestos = [
    {
      id: 0,
      nombre: `Senior Developer 0`,
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
      rangoSalario: [1000, 10000],
      requisitos: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
      fecha: "12/04/2023",
      visibilidad: "Privado",
      empresa: {
        id: 0,
        nombre: `Empresa 0`,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        logo: "https://via.placeholder.com/100",
      },
    },
    {
      id: 1,
      nombre: `Senior Developer 1`,
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
      rangoSalario: [1000, 10000],
      requisitos: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
      fecha: "12/04/2023",
      visibilidad: "Publico",
      empresa: {
        id: 0,
        nombre: `Empresa 1`,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        logo: "https://via.placeholder.com/100",
      },
    },
    {
      id: 2,
      nombre: `Senior Developer 2`,
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae suscipit, nam perspiciatis commodi eaque quia sint odit a ullam iure, exercitationem autem rerum cumque laborum similique dolor deserunt optio?",
      rangoSalario: [1000, 10000],
      requisitos: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      ],
      fecha: "12/04/2023",
      visibilidad: "Publico",
      empresa: {
        id: 0,
        nombre: `Empresa 2`,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        logo: "https://via.placeholder.com/100",
      },
    },
  ];

  return puestos;
}

module.exports = getJobs;
