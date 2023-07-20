const users = [
  {
    id: 1,
    name: "John Doe",
    email: "test@mail.nope",
    password: "123456",
    type: "endUser",
    title: "UI/UX Developer",
    userDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
    profileImg: ``,
    curriculum: ``,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
    experience: [
      {
        title: "UI/UX Developer",
        company: "Google",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Rust Developer",
        company: "Linux foundation",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Kotlin Developer",
        company: "NVIDIA",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Linux Systems administrator",
        company: "Valve",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
    ],
    education: [
      {
        title: "Bachillerato",
        institution: "Colegio de wizzards",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Educación Media",
        institution: "Escuela de wizzards",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
    ],
    skills: [
      {
        name: "HTML",
      },
      {
        name: "Rust",
      },
      {
        name: "Linux",
      },
      {
        name: "ZFS",
      },
      {
        name: "Kotlin",
      },
      {
        name: "Flutter",
      },
      {
        name: "Dart",
      },
      {
        name: "C++",
      },
      {
        name: "C",
      },
    ],
    languages: [
      {
        name: "English",
        level: "B2",
      },
      {
        name: "Español",
        level: "Nativo",
      },
    ],
  },
  {
    id: 2,
    name: "Jannet Dae",
    email: "test@mail.yes",
    password: "123456",
    type: "manager",
    title: "Rust Dev",
    userDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
    profileImg: ``,
    curriculum: ``,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
    experience: [
      {
        title: "UI/UX Developer",
        company: "Google",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Rust Developer",
        company: "Linux foundation",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
    ],
    education: [
      {
        title: "Educación Media",
        institution: "Escuela de wizzards",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
    ],
    skills: [
      {
        name: "HTML",
      },
      {
        name: "Rust",
      },
      {
        name: "Linux",
      },
      {
        name: "ZFS",
      },
    ],
    languages: [
      {
        name: "English",
        level: "B2",
      },
      {
        name: "Español",
        level: "Nativo",
      },
    ],
  },
  {
    id: 3,
    name: "Manager Don",
    email: "best@manager.yes",
    password: "123456",
    type: "administrador",
    title: "Rust Dev",
    userDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
    profileImg: ``,
    curriculum: ``,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
    experience: [
      {
        title: "UI/UX Developer",
        company: "Google",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Rust Developer",
        company: "Linux foundation",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
    ],
    education: [
      {
        title: "Educación Media",
        institution: "Escuela de wizzards",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
    ],
    skills: [
      {
        name: "HTML",
      },
      {
        name: "Rust",
      },
      {
        name: "Linux",
      },
      {
        name: "ZFS",
      },
    ],
    languages: [
      {
        name: "English",
        level: "B2",
      },
      {
        name: "Español",
        level: "Nativo",
      },
    ],
  },
];

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

const notifications = [
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: false,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: false,
  },
  {
    id: 0,
    userId: 0,
    title: "Ha sido invitado al puesto de: Desarrollador Web",
    description: "Estado de la aplicacion: En Revision.",
    date: "2021-05-01",
    read: false,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: false,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
  {
    id: 0,
    userId: 0,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "2021-05-01",
    read: true,
  },
];

const aplicaciones = (aplicaciones = [
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
]);

module.exports = {
  users,
  puestos,
};
