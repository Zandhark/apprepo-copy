const typeUser = document.cookie
  .split(";")
  .find((item) => item.includes("userType"))
  .split("=")[1];

const clientId = document.cookie
  .split(";")
  .find((item) => item.includes("userId"))
  .split("=")[1];

const profileImg = document.getElementById("profile-img");
const userDescription = document.getElementById("user-description");
const userName = document.getElementById("user-name");
const title = document.getElementById("title");
const userAbout = document.getElementById("user-about");
const experienceSection = document.getElementById("experiencia");
const educationSection = document.getElementById("educacion");
const skillsSection = document.getElementById("skills");
const candidatoCv = document.getElementById("candidato-cv");
const editarRol = document.getElementById("candidato-role");
const invitarCandidato = document.getElementById("candidato-invitar");
const invitarModal = document.getElementById("invitar-modal");
const puestosSelect = document.getElementById("puestos-select");

const urlParams = new URLSearchParams(window.location.search);
let candidateId = urlParams.get("id");

async function fetchJobs() {
  const responseClient = await fetch(
    `http://localhost:3000/api/usuarios/${clientId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const client = await responseClient.json();
  const empresaId = client.empresa;

  const response = await fetch(
    `http://localhost:3000/api/puestos/empresa/${empresaId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const jobs = await response.json();
  return jobs;
}

async function handleInvitarPuestoModal(e) {
  if (e.target.id === "cancelar") {
    invitarModal.style.display = "none";
    puestosSelect.innerHTML = "";
    return;
  }
  const jobs = await fetchJobs();

  jobs.forEach((job) => {
    const option = document.createElement("option");
    option.value = job._id;
    option.innerText = job.nombre;
    puestosSelect.appendChild(option);
  });
  invitarModal.style.display = "block";
}

async function handleInvitacionPuesto(e) {
  e.preventDefault();
  const jobId = puestosSelect.value;
  try {
    const response = await fetch(`http://localhost:3000/api/aplicaciones/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidato: candidateId,
        puesto: jobId,
        empresa: clientId,
        createdBy: clientId,
      }),
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    alert(`Invitación enviada al puesto seleccionado.`);
    invitarModal.style.display = "none";
  } catch (e) {
    console.log(e.message);
    if (e.message.includes("E11000")) {
      alert("Ya se ha enviado una invitación para este puesto.");
      invitarModal.style.display = "none";
    } else {
      alert("Error al enviar la invitación.");
      invitarModal.style.display = "none";
    }
  }
}

async function getUserDetails(userId) {
  const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const candidatos = await response.json();
  return candidatos;
}

async function renderProfile() {
  const userDetails = await getUserDetails(candidateId);
  profileImg.src = userDetails.profileImg;
  userDescription.innerText = userDetails.userDescription;
  userName.innerText = userDetails.name;
  userAbout.innerText = userDetails.about;
  candidatoCv.href = userDetails.curriculum;

  if (userDetails.experience.length === 0) {
    experienceSection.innerHTML = `<p>No hay experiencia registrada</p>`;
  } else {
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
  }
  if (userDetails.education.length === 0) {
    educationSection.innerHTML = `<p>No hay educacion registrada</p>`;
  } else {
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
  }
  userDetails.skills.forEach((skill) => {
    const skillsDiv = document.createElement("div");
    skillsDiv.classList.add("skills-box");
    skillsDiv.innerHTML = `
    <h4>${skill}</h3>
    `;
    skillsSection.appendChild(skillsDiv);
  });

  if (typeUser !== "administrador") {
    editarRol.style.display = "none";
    invitarCandidato.style.display = "none";
  }
}

renderProfile();
