const mainContent = document.getElementById("main-content");
const searchInput = document.getElementById("busqueda");

searchInput.addEventListener("input", function () {
  updateFilteredCandidatos();
});

async function updateFilteredCandidatos() {
  const candidatos = await getCandidatos();

  const searchQuery = searchInput.value.toLowerCase();

  const filteredCandidatos = candidatos.filter((candidato) => {
    const candidatoNombre = candidato.name.toLowerCase();

    return candidatoNombre.includes(searchQuery);
  });

  mainContent.innerHTML = "";

  if (filteredCandidatos.length === 0) {
    const noResultsDiv = document.createElement("div");
    noResultsDiv.classList.add(
      "flex",
      "flex-column",
      "flex-align-center",
      "flex-space-center",
      "height-100"
    );
    noResultsDiv.innerHTML = `
      <h2>No hay candidatos que coincidan con tu búsqueda</h2>
    `;
    mainContent.appendChild(noResultsDiv);
  }

  filteredCandidatos.forEach((candidato) => {
    const candidatoDiv = document.createElement("div");
    candidatoDiv.id = candidato._id;
    candidatoDiv.classList.add(
      "padding-box",
      "flex",
      "flex-align-center",
      "flex-gap-10",
      "notification",
      "border",
      "flex-space-between"
    );

    const userSkillsHTML =
      candidato.skills.length === 0
        ? `<li>No ha ingresado habilidades</li>`
        : candidato.skills
            .slice(0, 3)
            .map((skill) => `<li>${skill}</li>`)
            .join("");

    const userExperienceHTML =
      candidato.experience.length === 0
        ? `<li>No ha ingresado experiencia</li>`
        : candidato.experience
            .slice(0, 3)
            .map(
              (experience) =>
                `<li>${experience.jobTitle} @ ${experience.companyName}</li>`
            )
            .join("");

    candidatoDiv.innerHTML = `
      <div class="flex flex-gap-20">
        <div class="flex flex-column flex-gap-5 flex-wrap" style="width: 300px;">
          <h2>${candidato.name}</h2>
          <h3>${candidato.title}</h3>
          <div>
            <p>${candidato.userDescription}</p>
          </div>
        </div>
        <div style="margin: 0 20px ">
          <h2>Habilidades</h2>
          <ul id="user-skills-${candidato._id}">
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
      <a href="/candidatos/perfil.html?id=${candidato._id}">
        <button class="main-button">Ver candidato</button>
      </a>
    `;

    mainContent.appendChild(candidatoDiv);
  });
}

async function getCandidatos() {
  const response = await fetch(`http://localhost:3000/api/usuarios/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const usuarios = await response.json();
  const candidatos = usuarios.filter((usuario) => {
    return !usuario.empresa;
  });
  return candidatos;
}

async function renderCandidatos() {
  const candidatosFilter = await getCandidatos();
  const candidatos = candidatosFilter.filter((candidato) => {
    return candidato.type !== "administrador";
  });

  const candidatosHTML = candidatos.map((candidato, index) => {
    let userSkillsHTML = "";
    let userExperienceHTML = "";

    if (candidato.skills.length === 0) {
      userSkillsHTML = `<li>No ha ingresado habilidades</li>`;
    } else {
      userSkillsHTML = candidato.skills
        .slice(0, 3)
        .map((skill) => {
          return `<li>${skill}</li>`;
        })
        .join("");
    }

    if (candidato.experience.length === 0) {
      userExperienceHTML = `<li>No ha ingresado experiencia</li>`;
    } else {
      userExperienceHTML = candidato.experience
        .slice(0, 3)
        .map((experience) => {
          return `<li>${experience.jobTitle} @ ${experience.companyName}</li>`;
        })
        .join("");
    }

    return `
    <div
      id="${candidato._id}"
      class="padding-box flex flex-align-center flex-gap-10 notification border flex-space-between"
    >
      <div class="flex flex-gap-20">
        <div class="flex flex-column flex-gap-5 flex-wrap" style="width: 300px;">
          <h2>${candidato.name}</h2>
          <h3>${candidato.title}</h3>
          <div>
            <p>${candidato.userDescription}</p>
          </div>
        </div>
        <div style="margin: 0 20px ">
          <h2>Habilidades</h2>
          <ul id="user-skills-${candidato._id}">
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
      <a href="/candidatos/perfil.html?id=${candidato._id}">
        <button class="main-button">Ver candidato</button>
      </a>
    </div>
    `;
  });

  mainContent.innerHTML = candidatosHTML.join("");
}

renderCandidatos();
