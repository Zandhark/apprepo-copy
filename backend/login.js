

function fetchUser(email) {
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

  return users.find((user) => user.email === email);
}

function login(email) {
  try {
    const user = fetchUser(email);
    return user;
  } catch (e) {
    return e;
  }

}

module.exports = login;