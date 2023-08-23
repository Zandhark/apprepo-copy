const formUsuarios = document.getElementById("form-usuarios");
const formEmpresas = document.getElementById("form-empresas");

const divUsuarios = document.getElementById("div-usuarios");
const divEmpresas = document.getElementById("div-empresas");
const divExperiencia = document.getElementById("div-experiencia");

const formExp = document.getElementById("form-experiencia");
const selectUsuario = document.getElementById("select-usuario");
const title = document.getElementById("title-register");
selectUsuario.addEventListener("change", handleTipoUsuarioChange);
let tipoUsuario;
let password, password2, passwordEmpresa, password2Empresa;

let experienciaCounter = 0; // contador de lista de experiencia laboral

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

function handleLoading(elementId) {
  const loader = document.createElement("div");
  loader.classList.add("loading");
  loader.id = "loader";
  document.getElementById(`${elementId}`).appendChild(loader);
}

function handleTipoUsuarioChange(e) {
  tipoUsuario = e.target.value;
  if (tipoUsuario === "usuario-final") {
    title.innerText = "Registro de usuario final";
    divEmpresas.style.display = "none";
    divUsuarios.style.display = "flex";
    password = document.getElementById("password");
    password2 = document.getElementById("password2");
    password2.addEventListener("input", handlePasswordInput);
  } else if (tipoUsuario === "administrador") {
    title.innerText = "Registro de empresa";
    divUsuarios.style.display = "none";
    divEmpresas.style.display = "flex";
    passwordEmpresa = document.getElementById("password-empresa");
    password2Empresa = document.getElementById("password2-empresa");
    password2Empresa.addEventListener("input", handlePasswordInput);
  }
}

function handlePasswordInput(e) {
  let passwordValue, password2Value, passwordInput;

  if (tipoUsuario === "usuario-final") {
    passwordValue = password.value;
    password2Value = password2.value;
    passwordInput = password2;
  } else if (tipoUsuario === "administrador") {
    passwordValue = passwordEmpresa.value;
    password2Value = password2Empresa.value;
    passwordInput = password2Empresa;
  }

  if (passwordValue.length <= password2Value.length) {
    if (passwordValue !== password2Value) {
      passwordInput.setCustomValidity("Las contraseñas no coinciden");
    } else {
      passwordInput.setCustomValidity("");
    }
    passwordInput.reportValidity();
    passwordInput.classList.toggle(
      "input-validation-error",
      passwordValue !== password2Value
    );
  }
  passwordInput.addEventListener("change", handlePasswordBlur);
}

function handlePasswordBlur() {
  let passwordValue, password2Value, passwordInput;

  if (tipoUsuario === "usuario-final") {
    passwordValue = password.value;
    password2Value = password2.value;
    passwordInput = password2;
  } else if (tipoUsuario === "administrador") {
    passwordValue = passwordEmpresa.value;
    password2Value = password2Empresa.value;
    passwordInput = password2Empresa;
  }

  if (passwordValue.length > 0) {
    if (passwordValue !== password2Value) {
      passwordInput.setCustomValidity("Las contraseñas no coinciden");
    } else {
      passwordInput.setCustomValidity("");
    }
    passwordInput.reportValidity();
    passwordInput.classList.toggle(
      "input-validation-error",
      passwordValue !== password2Value
    );
  }
}

async function handleNewUser(usuario) {
  if (usuario.tipoUsuario === "endUser") {
    try {
      handleLoading("div-select-usuario");
      const response = await fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      const session = await fetch("http://localhost:3000/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: data._id }),
      });
      const sessionData = await session.json();

      document.cookie = `userId=${data._id}; path=/; max-age=3600`;
      document.cookie = `sessionId=${sessionData._id}; path=/; max-age=3600`;
      document.cookie = `userType=${data.type}; path=/; max-age=3600`;
      document.getElementById("loader").remove();
      return data;
    } catch (e) {
      if (e.message.includes("E11000")) {
        alert(`El correo ${usuario.email} ya se encuentra registrado.`);
        document.getElementById("loader").remove();
        return false;
      } else {
        alert(e.message);
        document.getElementById("loader").remove();
        return false;
      }
    }
  } else if (usuario.tipoUsuario === "administrador") {
    try {
      handleLoading("div-select-usuario");
      const response = await fetch("http://localhost:3000/api/empresas/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      const session = await fetch("http://localhost:3000/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: data._id }),
      });
      const sessionData = await session.json();

      document.cookie = `userId=${data._id}; path=/; max-age=3600`;
      document.cookie = `sessionId=${sessionData._id}; path=/; max-age=3600`;
      document.cookie = `userType=${data.type}; path=/; max-age=3600`;
      document.getElementById("loader").remove();
      return data;
    } catch (e) {
      if (e.message.includes("E11000")) {
        alert(`El correo ${usuario.email} ya se encuentra registrado.`);
        document.getElementById("loader").remove();
        return false;
      } else {
        alert(e.message);
        document.getElementById("loader").remove();
        return false;
      }
    }
  } else {
    console.log("nothing 🤷");
  }
}

function handleAddExperience() {
  divExperiencia.classList.remove("hidden"); // remove hidden para visualizar el div padre "divExperiencia"
  const titleExperience = document.createElement("h4");
  titleExperience.innerText =
    `Datos experiencia laboral ` + (experienciaCounter + 1);

  const jobTitleInputLabel = document.createElement("label");
  jobTitleInputLabel.setAttribute("for", "jobTitle");
  jobTitleInputLabel.innerText = "Nombre del puesto";

  const div = document.createElement("div");
  div.classList.add("input-container");
  div.appendChild(jobTitleInputLabel);

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
  startDate.addEventListener("input", datesValidation);

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

  jobDiv.appendChild(titleExperience);

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

function datesValidation() {
  const experienciaCounter = parseInt(this.id.split("-")[1]);
  const startDateValue = new Date(this.value);
  const endDate = document.getElementById(`endDate-${experienciaCounter}`);
  endDate.value = "";

  if (!isNaN(startDateValue.getTime())) {
    endDate.setAttribute("min", this.value);
  }
}

function handleRemoveExperience(removeButton) {
  const jobDiv = removeButton.parentNode;
  divExperiencia.removeChild(jobDiv);
  jobDiv.classList.add("hidden"); //ocultar el div "jobDiv"
  experienciaCounter--;

  if (experienciaCounter == 0) {
    divExperiencia.classList.add("hidden"); //Si el contador es 0 no existen div "jobDiv" entonces se oculta el padre "divExperiencia"
  }

  //Para cambiar el número del titulo de la experiencia dependiendo de su index actual
  const divs = divExperiencia.querySelectorAll(".div-exp");
  divs.forEach((div, index) => {
    const title = div.querySelector("h4");
    title.innerText = `Datos experiencia laboral ${index + 1}`;
  });
}

function handleSubmit(e) {
  e.preventDefault();
  if (tipoUsuario === "usuario-final") {
    if (!formUsuarios.checkValidity() || !formExp.checkValidity()) {
      formUsuarios.reportValidity();
      formExp.reportValidity();
      return;
    }
  } else if (tipoUsuario === "administrador") {
    if (!formEmpresas.checkValidity()) {
      formEmpresas.reportValidity();
      return;
    }
  }
  handleFormSubmit();
}

async function handleUserForm() {
  let session = {};
  const expedrienciaLaboral = [];
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const email = document.getElementById("email").value;
  const passwordValue = password.value;
  const genero = document.getElementById("genero").value;
  const cv = document.getElementById("cv").files[0];
  const fotografia = document.getElementById("fotografia").files[0];
  const title = document.getElementById("titulo").value;
  const userDescription = document.getElementById("descripcion-usuario").value;
  for (let i = 0; i < experienciaCounter; i++) {
    const jobTitle = document.getElementById(`jobTitle-${i}`).value;
    const companyName = document.getElementById(`companyName-${i}`).value;
    const startDate = document.getElementById(`startDate-${i}`).value;
    const endDate = document.getElementById(`endDate-${i}`).value;
    const jobDescription = document.getElementById(`jobDescription-${i}`).value;
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
    nombre: nombre + " " + apellidos,
    apellidos,
    email,
    passwordValue,
    genero,
    cv: await convertBase64(cv),
    fotografia: await convertBase64(fotografia),
    title,
    userDescription,
    expedrienciaLaboral,
    tipoUsuario: "endUser",
  };

  session = await handleNewUser(usuarioFinal);
  return session;
}

async function handleEmpresaForm() {
  let session = {};
  const nombreEmpresa = document.getElementById("nombre-empresa").value;
  const email = document.getElementById("email-empresa").value;
  const passwordValue = passwordEmpresa.value;
  const logo = document.getElementById("logo").files[0];
  const descripcion = document.getElementById("descripcion").value;
  const empresa = {
    nombre: nombreEmpresa,
    email: email,
    password: passwordValue,
    logo: await convertBase64(logo),
    descripcion: descripcion,
    tipoUsuario: "administrador",
  };
  session = await handleNewUser(empresa);
  return session;
}

async function handleFormSubmit() {
  let sessionUser;
  let sessionEmpresa;
  if (tipoUsuario === "usuario-final") {
    sessionUser = await handleUserForm();
  } else if (tipoUsuario === "administrador") {
    sessionEmpresa = await handleEmpresaForm();
  }
  if (sessionUser) {
    location.href = "/perfil/";
  } else if (sessionEmpresa) {
    location.href = "/empresas/perfil.html";
  }
}

function fileValidation() {
  const inputsFile = document.querySelectorAll('input[type="file"]');

  inputsFile.forEach((input) => {
    input.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      input.classList.remove("input-validation-error");

      if (selectedFile) {
        const acceptValue = input.accept;
        const allowedExtensions = acceptValue
          .split(",")
          .map((ext) => ext.trim())
          .map((ext) => ext.replace(".", ""))
          .map((ext) => ext.replace("image/", ""));
        const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          alert(
            "Archivo con formato incorrecto.\nPor favor seleccione uno nuevamente."
          );
          input.classList.add("input-validation-error");
          input.value = "";
        }

        const fileSize = selectedFile.size;
        const maxSize = 3 * 1024 * 1024; // 3MB

        if (fileSize > maxSize) {
          alert(
            "El archivo seleccionado excede el tamaño máximo de 3 MB.\nPor favor seleccione uno nuevamente."
          );
          input.classList.add("input-validation-error");
          input.value = "";
        }
      }
    });
  });
}

fileValidation();
