
const profileImg = document.getElementById("profile-img");
const userDescription = document.getElementById("user-description");
const userName = document.getElementById("user-name");
const title = document.getElementById("title");
const userAbout = document.getElementById("user-about");
const experienceSection = document.getElementById("experiencia");
const educationSection = document.getElementById("educacion");
const skillsSection = document.getElementById("skills");

const urlParams = new URLSearchParams(window.location.search);
let candidateId = urlParams.get("id");

function handleInvitacion() {
    alert("Invitación enviada");
}

function getUserDetails(userId) {
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
  return candidatos[userId - 1];
}

function renderProfile() {
  const userDetails = getUserDetails(candidateId);
  profileImg.src = userDetails.profileImg;
  userDescription.innerText = userDetails.userDescription;
  userName.innerText = userDetails.name;
  userAbout.innerText = userDetails.about;
  userDetails.experience.forEach((experience) => {
    const experienceDiv = document.createElement("div");
    experienceDiv.classList.add("experience-box");
    experienceDiv.innerHTML = `
    <h3>${experience.title}</h3>
    <div class="flex">
      <svg
        style="height: 20px; width: 20px"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
        />
      </svg>
      <p style="margin-left: 10px">${experience.company}</p>
    </div>
    <div class="flex">
      <svg
        style="height: 20px; width: 20px"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
      <p style="margin-left: 10px">
        Desde ${experience.startDate} Hasta ${experience.endDate}
      </p>
    </div>
    <p>${experience.description}</p>
    `;
    experienceSection.appendChild(experienceDiv);
  });

  userDetails.education.forEach((education) => {
    const educationDiv = document.createElement("div");
    educationDiv.classList.add("experience-box");
    educationDiv.innerHTML = `
    <h3>${education.title}</h3>
    <div class="flex">
      <svg
        style="height: 20px; width: 20px"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
        />
      </svg>
      <p style="margin-left: 10px">${education.institution}</p>
    </div>
    <div class="flex">
      <svg
        style="height: 20px; width: 20px"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
      <p style="margin-left: 10px">
        Desde ${education.startDate} Hasta ${education.endDate}
      </p>
    </div>
    <p>${education.description}</p> 
    `;
    educationSection.appendChild(educationDiv);
  });

  userDetails.skills.forEach((skills) => {
    const skillsDiv = document.createElement("div");
    skillsDiv.classList.add("skills-box");
    skillsDiv.innerHTML = `
    <h4>${skills.name}</h3>
    `;
    skillsSection.appendChild(skillsDiv);
  });
}

renderProfile();
