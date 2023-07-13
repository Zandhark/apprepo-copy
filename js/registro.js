const formUsuarios = document.getElementById("form-usuarios");
const formEmpresas = document.getElementById("form-empresas");

const divUsuarios = document.getElementById("div-usuarios");
const divEmpresas = document.getElementById("div-empresas");
const divExperiencia = document.getElementById("div-experiencia");

const formExp = document.getElementById("form-experiencia");
const selectUsuario = document.getElementById("select-usuario");
selectUsuario.addEventListener("change", handleTipoUsuarioChange);
let tipoUsuario;
let password, password2, passwordEmpresa, password2Empresa;

let experienciaCounter = 0; // contador de lista de experiencia laboral

function handleTipoUsuarioChange(e) {
  tipoUsuario = e.target.value;
  if (tipoUsuario === "usuario-final") {
    divEmpresas.style.display = "none";
    divUsuarios.style.display = "flex";
    password = document.getElementById("password");
    password2 = document.getElementById("password2");
    password2.addEventListener("input", handlePasswordInput);
  } else if (tipoUsuario === "empresa") {
    divUsuarios.style.display = "none";
    divEmpresas.style.display = "flex";
    passwordEmpresa = document.getElementById("password-empresa");
    password2Empresa = document.getElementById("password2-empresa");
    password2Empresa.addEventListener("input", handlePasswordInput);
  }
}

function handlePasswordInput(e) {
  if (tipoUsuario === "usuario-final") {
    const passwordValue = password.value;
    const password2Value = password2.value;
    if (passwordValue !== password2Value) {
      password2.setCustomValidity("Las contraseñas no coinciden");
      password2.reportValidity();
      password2.classList.add("input-validation-error");
    } else {
      password2.setCustomValidity("");
      password2.reportValidity();
      password2.classList.remove("input-validation-error");
    }
  } else if (tipoUsuario === "empresa") {
    const passwordValue = passwordEmpresa.value;
    const password2Value = password2Empresa.value;
    if (passwordValue !== password2Value) {
      password2Empresa.setCustomValidity("Las contraseñas no coinciden");
      password2Empresa.reportValidity();
      password2Empresa.classList.add("input-validation-error");
    } else {
      password2Empresa.setCustomValidity("");
      password2Empresa.reportValidity();
      password2Empresa.classList.remove("input-validation-error");
    }
  }
}

function generateRandomId() {
  return (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}

function handleNewUser(usuario) {
  let randomId = generateRandomId();
  try {
    const session = { ...usuario, id: randomId };
    document.cookie = `usuario=${session.usuario}; path=/; max-age=3600`;
    document.cookie = `userId=${session.id}; path=/; max-age=3600`;
    return session;
  } catch (e) {
    alert("Se produjo un error al iniciar sesión, intente nuevamente");
    return false;
  }
}

function handleAddExperience() {
  const jobTitleInputLabel = document.createElement("label");
  jobTitleInputLabel.setAttribute("for", "jobTitle");
  jobTitleInputLabel.innerText = "Nombre del puesto";

  const jobTitleInput = document.createElement("input");
  jobTitleInput.setAttribute("type", "text");
  jobTitleInput.setAttribute("name", "jobTitle");
  jobTitleInput.setAttribute("placeholder", "Nombre del puesto");
  jobTitleInput.setAttribute("required", true);
  jobTitleInput.id = `jobTitle-${experienciaCounter}`;

  const companyNameInputLabel = document.createElement("label");
  companyNameInputLabel.setAttribute("for", "companyName");
  companyNameInputLabel.innerText = "Nombre de la empresa";

  const companyName = document.createElement("input");
  companyName.setAttribute("type", "text");
  companyName.setAttribute("name", "companyName");
  companyName.setAttribute("placeholder", "Nombre de la empresa");
  companyName.setAttribute("required", true);
  companyName.id = `companyName-${experienciaCounter}`;

  const startDateInputLabel = document.createElement("label");
  startDateInputLabel.setAttribute("for", "startDate");
  startDateInputLabel.innerText = "Fecha de inicio";

  const startDate = document.createElement("input");
  startDate.setAttribute("type", "date");
  startDate.setAttribute("name", "startDate");
  startDate.setAttribute("placeholder", "Fecha de inicio");
  startDate.setAttribute("required", true);
  startDate.setAttribute("max", new Date().toISOString().split("T")[0]);
  startDate.id = `startDate-${experienciaCounter}`;

  const endDateInputLabel = document.createElement("label");
  endDateInputLabel.setAttribute("for", "endDate");
  endDateInputLabel.innerText = "Fecha de fin";

  const endDate = document.createElement("input");
  endDate.setAttribute("type", "date");
  endDate.setAttribute("name", "endDate");
  endDate.setAttribute("placeholder", "Fecha de fin");
  endDate.setAttribute("required", true);
  endDate.setAttribute("max", new Date().toISOString().split("T")[0]);
  endDate.id = `endDate-${experienciaCounter}`;

  const jobDescriptionInputLabel = document.createElement("label");
  jobDescriptionInputLabel.setAttribute("for", "jobDescription");
  jobDescriptionInputLabel.innerText = "Descripción del puesto";

  const jobDescription = document.createElement("textarea");
  jobDescription.setAttribute("name", "jobDescription");
  jobDescription.setAttribute("placeholder", "Descripción del puesto");
  jobDescription.setAttribute("required", true);
  jobDescription.id = `jobDescription-${experienciaCounter}`;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.innerText = "Eliminar";
  removeButton.classList.add("main-button");
  removeButton.onclick = function () {
    handleRemoveExperience(removeButton);
  };

  const jobDiv = document.createElement("div");
  jobDiv.classList.add("flex", "flex-column", "flex-gap-5", "div-exp");

  jobDiv.appendChild(jobTitleInputLabel);
  jobDiv.appendChild(jobTitleInput);
  jobDiv.appendChild(companyNameInputLabel);
  jobDiv.appendChild(companyName);
  jobDiv.appendChild(startDateInputLabel);
  jobDiv.appendChild(startDate);
  jobDiv.appendChild(endDateInputLabel);
  jobDiv.appendChild(endDate);
  jobDiv.appendChild(jobDescriptionInputLabel);
  jobDiv.appendChild(jobDescription);
  jobDiv.appendChild(removeButton);

  divExperiencia.appendChild(jobDiv);
  experienciaCounter++;
}

function handleRemoveExperience(removeButton) {
  const jobDiv = removeButton.parentNode;
  divExperiencia.removeChild(jobDiv);
  experienciaCounter--;
}

function handleSubmit(e) {
  e.preventDefault();
  handleFormSubmit();
}

function handleUserForm() {
  let session = {};
  const expedrienciaLaboral = [];
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const email = document.getElementById("email").value;
  const passwordValue = password.value;
  const genero = document.getElementById("genero").value;
  const cv = document.getElementById("cv").value;
  const fotografia = document.getElementById("fotografia").value;
  for (let i = 0; i < experienciaCounter; i++) {
    const jobTitle = document.getElementById(`jobTitle-${i}`).value;
    const companyName = document.getElementById(`companyName-${i}`).value;
    const startDate = document.getElementById(`startDate-${i}`).value;
    const endDate = document.getElementById(`endDate-${i}`).value;
    const jobDescription = document.getElementById(`jobDescription-${i}`)
      .value;
    const experiencia = {
      jobTitle,
      companyName,
      startDate,
      endDate,
      jobDescription,
    };
    expedrienciaLaboral.push(experiencia);
  }

  const usuarioFinal = {
    nombre,
    apellidos,
    email,
    passwordValue,
    genero,
    cv,
    fotografia,
    expedrienciaLaboral,
  };

  session = handleNewUser(usuarioFinal);
  console.log(usuarioFinal);
  return session; 
}

function handleEmpresaForm() {
  let session = {};
  const nombreEmpresa = document.getElementById("nombre-empresa").value;
  const email = document.getElementById("email").value;
  const passwordValue = password.value;
  const logo = document.getElementById("logo").value;
  const descripcion = document.getElementById("descripcion").value;
  const empresa = {
    nombreEmpresa,
    email,
    passwordValue,
    logo,
    descripcion,
  };
  session = handleNewUser(empresa);
  console.log(empresa);
  return session;
}

function handleFormSubmit() {

  let session;


  if (tipoUsuario === "usuario-final") {
    handleUserForm();
  } else if (tipoUsuario === "empresa") {

  }
  if (session) {
    console.log(session);
    location.href = "/perfil/";
  }
}

