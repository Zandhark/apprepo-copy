const mainContent = document.getElementById("main-content");

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
  return usuarios;
}

async function renderCandidatos() {
  const candidatos = await getCandidatos();
  console.log(candidatos);
  const candidatosHTML = candidatos.map((candidato, index) => {
    let userSkillsHTML = "";
    let userExperienceHTML = "";

    if (candidato.skills.length === 0) {
      userSkillsHTML = `<li>No ha ingresado habilidades</li>`;
    } else {
      userSkillsHTML = candidato.skills
        .slice(0, 4)
        .map((skill) => {
          return `<li>${skill.name}</li>`;
        })
        .join("");
    }

    if (candidato.experience.length === 0) {
      userExperienceHTML = `<li>No ha ingresado experiencia</li>`;
    } else {
      userExperienceHTML = candidato.experience
        .slice(0, 3)
        .map((experience) => {
          return `<li>${experience.title} @ ${experience.company}</li>`;
        })
        .join("");
    }

    return `
    <div
      id="${candidato._id}"
      class="padding-box flex flex-align-center flex-gap-10 notification border flex-space-between"
    >
      <div class="flex flex-gap-20">
        <div class="flex flex-column flex-gap-5 flex-wrap" style="width: 400px;">
          <h2>${candidato.name}</h2>
          <h3>${candidato.title}</h3>
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
      <a href="/candidatos/perfil.html?id=${candidato._id}">
        <button class="main-button">Ver candidato</button>
      </a>
    </div>
    `;
  });

  mainContent.innerHTML = candidatosHTML.join("");
}

renderCandidatos();
