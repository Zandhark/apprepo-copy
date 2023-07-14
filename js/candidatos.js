const mainContent = document.getElementById("main-content");

function getCandidatos() {
  const candidatos = [
    {
      id: 1,
      name: "Alice Smith",
      email: "alice.smith@example.com",
      title: "Frontend Developer",
      userDescription: "Passionate about creating intuitive user interfaces.",
      profileImg: "http://example.com/assets/profile-img1.jpeg",
      curriculum: "http://example.com/assets/curriculum1.pdf",
      about: "Experienced in building responsive web applications.",
      experience: [
        {
          title: "Frontend Developer",
          company: "Microsoft",
          description: "Developed user interfaces for web applications.",
          startDate: "2020-02-01",
          endDate: "2021-05-01",
        },
        {
          title: "UI Designer",
          company: "Adobe",
          description: "Designed engaging user interfaces and prototypes.",
          startDate: "2019-01-01",
          endDate: "2020-01-01",
        },
      ],
      education: [
        {
          title: "Bachelor of Computer Science",
          institution: "University of Example",
          description: "Studied computer science with a focus on user interface design.",
          startDate: "2015-09-01",
          endDate: "2019-06-01",
        },
      ],
      skills: [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" },
        { name: "React" },
        { name: "UI/UX Design" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Spanish", level: "Intermediate" },
      ],
    },
    {
      id: 2,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      title: "Backend Developer",
      userDescription: "Passionate about building scalable and efficient backend systems.",
      profileImg: "http://example.com/assets/profile-img2.jpeg",
      curriculum: "http://example.com/assets/curriculum2.pdf",
      about: "Experienced in designing and implementing RESTful APIs.",
      experience: [
        {
          title: "Backend Developer",
          company: "Amazon",
          description: "Developed and maintained backend systems for e-commerce applications.",
          startDate: "2018-06-01",
          endDate: "2022-01-01",
        },
        {
          title: "Software Engineer",
          company: "IBM",
          description: "Worked on enterprise-level software projects.",
          startDate: "2016-01-01",
          endDate: "2018-05-01",
        },
      ],
      education: [
        {
          title: "Master of Science in Computer Science",
          institution: "University of Example",
          description: "Specialized in distributed systems and cloud computing.",
          startDate: "2014-09-01",
          endDate: "2016-06-01",
        },
        {
          title: "Bachelor of Engineering in Computer Science",
          institution: "University of Example",
          description: "Studied computer science with a focus on software development.",
          startDate: "2010-09-01",
          endDate: "2014-06-01",
        },
      ],
      skills: [
        { name: "Java" },
        { name: "Python" },
        { name: "Node.js" },
        { name: "Databases" },
        { name: "RESTful APIs" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "French", level: "Intermediate" },
      ],
    },
    {
      id: 3,
      name: "Charlie Williams",
      email: "charlie.williams@example.com",
      title: "Full Stack Developer",
      userDescription: "Passionate about creating innovative web solutions.",
      profileImg: "http://example.com/assets/profile-img3.jpeg",
      curriculum: "http://example.com/assets/curriculum3.pdf",
      about: "Experienced in building end-to-end web applications.",
      experience: [
        {
          title: "Full Stack Developer",
          company: "Facebook",
          description: "Developed and maintained web applications for social networking.",
          startDate: "2017-03-01",
          endDate: "2022-08-01",
        },
        {
          title: "Software Developer",
          company: "StartUp Inc.",
          description: "Contributed to the development of a scalable SaaS platform.",
          startDate: "2015-01-01",
          endDate: "2017-02-01",
        },
      ],
      education: [
        {
          title: "Bachelor of Science in Computer Engineering",
          institution: "University of Example",
          description: "Studied computer engineering with a focus on software development.",
          startDate: "2013-09-01",
          endDate: "2017-06-01",
        },
      ],
      skills: [
        { name: "JavaScript" },
        { name: "React" },
        { name: "Node.js" },
        { name: "MongoDB" },
        { name: "RESTful APIs" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "German", level: "Intermediate" },
      ],
    },
    {
      id: 4,
      name: "Daniel Brown",
      email: "daniel.brown@example.com",
      title: "Data Scientist",
      userDescription: "Passionate about extracting insights from data.",
      profileImg: "http://example.com/assets/profile-img4.jpeg",
      curriculum: "http://example.com/assets/curriculum4.pdf",
      about: "Experienced in analyzing large datasets and building predictive models.",
      experience: [
        {
          title: "Data Scientist",
          company: "Google",
          description: "Developed machine learning models to improve search algorithms.",
          startDate: "2018-06-01",
          endDate: "2022-01-01",
        },
        {
          title: "Data Analyst",
          company: "Big Data Co.",
          description: "Performed data analysis and visualization for client projects.",
          startDate: "2016-01-01",
          endDate: "2018-05-01",
        },
      ],
      education: [
        {
          title: "Master of Science in Data Science",
          institution: "University of Example",
          description: "Specialized in machine learning and data mining.",
          startDate: "2014-09-01",
          endDate: "2016-06-01",
        },
        {
          title: "Bachelor of Science in Statistics",
          institution: "University of Example",
          description: "Studied statistics with a focus on data analysis.",
          startDate: "2010-09-01",
          endDate: "2014-06-01",
        },
      ],
      skills: [
        { name: "Python" },
        { name: "R" },
        { name: "Machine Learning" },
        { name: "Statistical Analysis" },
        { name: "Data Visualization" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Spanish", level: "Intermediate" },
      ],
    },
    {
      id: 5,
      name: "Eva Davis",
      email: "eva.davis@example.com",
      title: "DevOps Engineer",
      userDescription: "Passionate about automating and optimizing development processes.",
      profileImg: "http://example.com/assets/profile-img5.jpeg",
      curriculum: "http://example.com/assets/curriculum5.pdf",
      about: "Experienced in implementing continuous integration and deployment pipelines.",
      experience: [
        {
          title: "DevOps Engineer",
          company: "Netflix",
          description: "Implemented scalable infrastructure and deployment strategies.",
          startDate: "2017-03-01",
          endDate: "2022-08-01",
        },
        {
          title: "Systems Administrator",
          company: "Tech Solutions Inc.",
          description: "Managed and maintained server infrastructure.",
          startDate: "2015-01-01",
          endDate: "2017-02-01",
        },
      ],
      education: [
        {
          title: "Bachelor of Engineering in Computer Science",
          institution: "University of Example",
          description: "Studied computer science with a focus on system administration.",
          startDate: "2013-09-01",
          endDate: "2017-06-01",
        },
      ],
      skills: [
        { name: "Linux" },
        { name: "Docker" },
        { name: "AWS" },
        { name: "Kubernetes" },
        { name: "CI/CD" },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "French", level: "Intermediate" },
      ],
    },
  ]
  return candidatos;
}


function renderCandidatos() {
  const candidatos = getCandidatos();
  const candidatosHTML = candidatos.map((candidato, index) => {
    const userSkillsHTML = candidato.skills.slice(0,4).map((skill) => {
      return `<li>${skill.name}</li>`;
    }).join('');
    const userExperienceHTML = candidato.experience.slice(0,3).map((experience) => {
      return `<li>${experience.title} @ ${experience.company}</li>`;
    }).join('');

    return `
    <div
      id="div-candidato-${index}"
      class="padding-box flex flex-align-center flex-gap-10 notification border flex-space-between"
    >
      <div class="flex flex-gap-20">
        <div class="flex flex-column flex-gap-5 flex-wrap" style="width: 400px;">
          <h2>${candidato.name}</h2>
          <h3>${candidato.experience[0].title} @ ${candidato.experience[0].company}</h3>
          <div>
            <p>${candidato.userDescription}</p>
          </div>
        </div>
        <div style="margin: 0 20px ">
          <h2>Habilidades</h2>
          <ul id="user-skills-${index}">
            ${userSkillsHTML}
          </ul>
        </div>
        <div>
          <h2>Experiencia</h2>
          <ul>
            ${userExperienceHTML}
          </ul>
        </div>
      </div>
      <a href="/candidatos/perfil.html?id=${candidato.id}">
        <button class="main-button">Ver candidato</button>
      </a>
    </div>
    `;
  });

  mainContent.innerHTML = candidatosHTML.join("");

}

renderCandidatos();