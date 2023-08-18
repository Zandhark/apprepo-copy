const userId = document.cookie
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
const editAboutBtn = document.getElementById("edit-about");
const modalAbout = document.getElementById("about-modal");
const aboutInput = document.getElementById("about-modal-text");
const shortAboutSave = document.getElementById("save-shortAbout");
const shortAboutEdit = document.getElementById("edit-shortAbout");
const expModal = document.getElementById("exp-modal");
const expForm = document.getElementById("exp-form");
const eduModal = document.getElementById("edu-modal");
const skillsModal = document.getElementById("skills-modal");
const titleEdit = document.getElementById("title-edit");
const titleSave = document.getElementById("title-save");
const userTitle = document.getElementById("user-title");
let userDetails = {};
let currentUserDescription;
let currentUserTitle;

function handleLoading(elementId) {
  const loader = document.createElement("div");
  loader.classList.add("loading");
  loader.id = "loader";
  document.getElementById(`${elementId}`).appendChild(loader);
}

function datesValidation(startId, endId) {
  const today = new Date().toISOString().split("T")[0];
  const startDate = document.getElementById(startId);
  const endDate = document.getElementById(endId);
  startDate.setAttribute("max", today);
  endDate.setAttribute("max", today);
  startDate.addEventListener("change", () => {
    endDate.setAttribute("min", startDate.value);
  });
}

function handleModalAbout() {
  aboutInput.value = userAbout.innerText;
  modalAbout.style.display = "block";
}

async function handleAboutSubmit(e) {
  e.preventDefault();
  const newAbout = aboutInput.value;
  try {
    handleLoading("about-modal-content")
    const response = await fetch(
      `http://localhost:3000/api/usuarios/update/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ about: newAbout }),
      }
    );
    const updatedUser = await response.json();
    document.getElementById("loader").remove();
    console.log(updatedUser);
    userAbout.innerText = updatedUser.about;
    modalAbout.style.display = "none";
  } catch (e) {
    alert("Error al actualizar el perfil");
    document.getElementById("loader").remove();
    modalAbout.style.display = "none";
  }
}

function handleExpModal(e) {
  e.preventDefault();
  if (e.target.innerText === "Cancelar") {
    expModal.style.display = "none";
    return;
  }
  datesValidation("expStartDate", "expEndDate");
  expModal.style.display = "block";
}

async function handleExpModalSubmit(e) {

  const form = document.getElementById("exp-form");
  form.checkValidity();
  if (!form.reportValidity()){
    alert("Por favor, completa todos los campos")
    return;
  }
  const jobTitle = document.getElementById("jobTitle").value;
  const companyName = document.getElementById("companyName").value;
  const startDate = document.getElementById("expStartDate").value;
  const endDate = document.getElementById("expEndDate").value;
  const jobDescription = document.getElementById("jobDescription").value;
  const newExperience = {
    jobTitle,
    companyName,
    startDate,
    endDate,
    jobDescription,
  };
  try {
    handleLoading("exp-modal-content")
    const response = await fetch(
      `http://localhost:3000/api/usuarios/experiencia/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExperience),
      }
    );
    const updatedUser = await response.json();
    document.getElementById("loader").remove();
    console.log(updatedUser);
    expModal.style.display = "none";
    location.reload();
  } catch (e) {
    alert("Error al actualizar el perfil");
    document.getElementById("loader").remove();
    expModal.style.display = "none";
  }
}

async function handleDeleteExperience(e) {
  if (confirm("¿Está seguro de que desea eliminar esta entrada?")) {
    const expId = e.target.id;
    try {
      handleLoading("left-column")
      const response = await fetch(`http://localhost:3000/api/usuarios/experiencia/${userDetails._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ expId }),
        });
        const updatedUser = await response.json();
        if (updatedUser instanceof Error) {
          throw new Error(updatedUser);
        }
        location.reload();
    } catch (e) {
      console.log(e)
      alert("Error al actualizar el perfil");
      document.getElementById("loader").remove();
    }
  }
  
}

function handleShortDescription() {
  shortAboutSave.style.display = "block";
  shortAboutEdit.style.display = "none";
  userDescription.contentEditable = true;
  userDescription.classList.add("editable-content");
  userDescription.focus();
}

async function handleShortDescriptionSave() {
  const newShortDescription = userDescription.innerText;
  if (currentUserDescription !== newShortDescription) {
    try {
      handleLoading("left-column")

      const response = await fetch(
        `http://localhost:3000/api/usuarios/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userDescription: newShortDescription }),
        }
      );
      const updatedUser = await response.json();
      document.getElementById("loader").remove();
      userDescription.classList.remove("editable-content");
      shortAboutSave.style.display = "none";
      shortAboutEdit.style.display = "block";
      userDescription.contentEditable = false;
    } catch (e) {
      alert("Error al actualizar el perfil");
      document.getElementById("loader").remove();
      userDescription.classList.remove("editable-content");
      shortAboutSave.style.display = "none";
      shortAboutEdit.style.display = "block";
      userDescription.contentEditable = false;
    }
  } else {
    console.log("Nada🤷");
    userDescription.classList.remove("editable-content");
    shortAboutSave.style.display = "none";
    shortAboutEdit.style.display = "block";
    userDescription.contentEditable = false;
  }
}

function handleTitle() {
  titleSave.style.display = "block";
  titleEdit.style.display = "none";
  userTitle.contentEditable = true;
  userTitle.classList.add("editable-content");
  userTitle.focus();
}

async function handleTitleSave() {
  const newUserTitle = userTitle.innerText;
  if (currentUserTitle !== newUserTitle) {
    try {
      handleLoading("left-column")
      const response = await fetch(
        `http://localhost:3000/api/usuarios/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newUserTitle }),
        }
      );
      const updatedTitle = await response.json();
      document.getElementById("loader").remove();
      userTitle.classList.remove("editable-content");
      titleSave.style.display = "none";
      titleEdit.style.display = "block";
      userTitle.contentEditable = false;
    } catch (e) {
      alert("Error al actualizar el perfil");
      document.getElementById("loader").remove();
      userTitle.classList.remove("editable-content");
      titleSave.style.display = "none";
      titleEdit.style.display = "block";
      userTitle.contentEditable = false;
    }
  } else {
    console.log("Nada🤷");
    userTitle.classList.remove("editable-content");
    titleSave.style.display = "none";
    titleEdit.style.display = "block";
    userTitle.contentEditable = false;
  }
}

function handleEduModal(e) {
  e.preventDefault();
  if (e.target.innerText === "Cancelar") {
    eduModal.style.display = "none";
    return;
  }
  datesValidation("eduStartDate", "eduEndDate");
  eduModal.style.display = "block";
}

async function handleEduModalSubmit(e) {
  const eduTitle = document.getElementById("eduTitle").value;
  const institution = document.getElementById("institution").value;
  const eduStartDate = document.getElementById("eduStartDate").value;
  const eduEndDate = document.getElementById("eduEndDate").value;
  const eduDescription = document.getElementById("eduDescription").value;
  const newEducation = {
    title: eduTitle,
    institution,
    startDate: eduStartDate,
    endDate: eduEndDate,
    description: eduDescription,
  };
  try {
    const response = await fetch(
      `http://localhost:3000/api/usuarios/educacion/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEducation),
      }
    );
    const updatedUser = await response.json();
    console.log(updatedUser);
    eduModal.style.display = "none";
    renderProfile();
  } catch (e) {
    alert("Error al actualizar el perfil");
    eduModal.style.display = "none";
  }
}

async function handleDeleteEducation(e) {
  if (confirm("¿Está seguro de que desea eliminar esta entrada?")) {
    const eduId = e.target.id;
    try {
      handleLoading("left-column")
      const response = await fetch(`http://localhost:3000/api/usuarios/educacion/${userDetails._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ eduId }),
        });
        const updatedUser = await response.json();
        if (updatedUser instanceof Error) {
          throw new Error(updatedUser);
        }
        location.reload();
    } catch (e) {
      console.log(e)
      alert("Error al actualizar el perfil");
      document.getElementById("loader").remove();
    }
  }
}


function handleSkillsModal(e) {
  e.preventDefault();
  if (e.target.innerText === "Cancelar") {
    skillsModal.style.display = "none";
    return;
  }
  const skillList = document.getElementById("skill-list");
  const userSkills = [...userDetails.skills];
  skillList.value = String(userSkills);
  skillsModal.style.display = "block";
}

async function handleSkillsModalSubmit(e) {
  const skillList = document.getElementById("skill-list").value;
  const newSkills = skillList.split(",");

  try {
    const response = await fetch(
      `http://localhost:3000/api/usuarios/skills/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSkills),
      }
    );
    const updatedUser = await response.json();
    skillsModal.style.display = "none";
    skillList.value = "";
    renderProfile();
  } catch (e) {
    alert("Error al actualizar el perfil");
    skillList.value = "";
    skillsModal.style.display = "none";
  }
}

async function getUserDetails(userId) {
  const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userDetails = await response.json();
  return userDetails;
}

async function renderProfile() {
  userDetails = await getUserDetails(userId);
  profileImg.src = userDetails.profileImg;
  userTitle.innerText = userDetails.title;
  currentUserTitle = userDetails.title;
  if (userDetails.userDescription === "") {
    userDescription.innerText = "Agrega una descripción";
    currentUserDescription = "Agrega una descripción";
  } else {
    userDescription.innerText = userDetails.userDescription;
    currentUserDescription = userDetails.userDescription;
  }

  userName.innerText = userDetails.name;
  userAbout.innerText = userDetails.about;
  if (userDetails.experience.length === 0) {
    experienceSection.innerHTML = `
    <h3>No hay experiencia registrada</h3>
    `;
  } else {
    experienceSection.innerHTML = "";
    userDetails.experience.forEach((experience) => {
      const experienceDiv = document.createElement("div");
      experienceDiv.classList.add("experience-box");
      experienceDiv.id = experience._id;
      const startDate = new Date(experience.startDate)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(experience.endDate).toISOString().split("T")[0];
      const months = Math.floor(
        (new Date(endDate) - new Date(startDate)) / 2629800000
      );
      experienceDiv.innerHTML = `
      <div class="flex flex-space-between flex-align-center">
        <h3>${experience.jobTitle}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 edit-icon"
          style="height: 20px; width: 20px"
          onclick="handleDeleteExperience(event)"
          id="${experience._id}"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
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
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
          />
        </svg>
        <p style="margin-left: 10px">${experience.companyName}</p>
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
          Desde ${startDate} Hasta ${endDate} (${months} meses)
        </p>
      </div>
      <p>${experience.jobDescription}</p>


    `;
      experienceSection.appendChild(experienceDiv);
    });
  }
  if (userDetails.education.length > 0) {
    educationSection.innerHTML = "";
    userDetails.education.forEach((education) => {
      const educationDiv = document.createElement("div");
      const startDate = new Date(education.startDate)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(education.endDate).toISOString().split("T")[0];

      educationDiv.classList.add("experience-box");
      educationDiv.innerHTML = `
      <div class="flex flex-space-between flex-align-center">
        <h3>${education.title}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 edit-icon"
          style="height: 20px; width: 20px"
          onclick="handleDeleteEducation(event)"
          id="${education._id}"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
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
        <p style="margin-left: 10px">Desde ${startDate} Hasta ${endDate}</p>
      </div>
      <p>${education.description}</p>

      `;
      educationSection.appendChild(educationDiv);
    });
  } else {
    educationSection.innerHTML = `
      <h3>No hay educación registrada</h3>
    `;
  }
  if (userDetails.skills.length > 0) {
    skillsSection.innerHTML = "";
    userDetails.skills.forEach((skill) => {
      const skillsDiv = document.createElement("div");
      skillsDiv.classList.add("skills-box");
      skillsDiv.innerHTML = `
      <h4>${skill}</h4>
      `;
      skillsSection.appendChild(skillsDiv);
    });
  } else {
    const skillsDiv = document.createElement("div");
    skillsDiv.innerHTML = `
    <h3>No hay habilidades registradas</h3>
    `;
    skillsSection.appendChild(skillsDiv);
  }
}

renderProfile();
