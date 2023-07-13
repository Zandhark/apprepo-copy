const form = document.getElementById("form-usuarios");
const selectUsuario = document.getElementById("select-usuario");
const title = document.getElementById("title-register");
selectUsuario.addEventListener("change", handleTipoUsuarioChange);
let tipoUsuario;
let password, password2;

const formUsuariosFinales = `
<div class="input-container">
              <label for="name">Nombre: </label>
              <input
                type="text"
                name="name"
                required
                id="nombre"
                placeholder="Nombre"
              />
            </div>
            <div class="input-container">
              <label for="lastname">Primer Apellido: </label>
              <input
                type="text"
                name="lastname"
                required
                id="apellidos"
                placeholder="Apellidos"
              />
            </div>

            <div class="input-container">
              <label for="email">Correo: </label>
              <input
                type="email"
                name="email"
                required
                id="email"
                placeholder="email@domain.tld"
              />
            </div>
            <div class="input-container">
              <label for="password">Contraseña: </label>
              <input
                type="password"
                name="password"
                required
                id="password"
                style="flex: 1"
              />
            </div>
            <div class="input-container">
              <label for="password2">Confirmar contraseña: </label>
              <input
                type="password"
                name="password2"
                required
                id="password2"
                style="flex: 1"
              />
            </div>
            <div class="input-container">
              <label for="genero">Género:</label>
              <select name="genero" required name="genero" id="genero">
                <option value="" disabled selected hidden>
                  Seleccione una opción
                </option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="femenino">Prefiero no especificar</option>
              </select>
            </div>
            <div class="input-container">
              <label for="cv">Seleccionar curriculum: </label>
              <input type="file" id="cv" accept=".pdf" />
            </div>
            <div class="input-container">
              <label for="fotografia">Seleccionar fotografia: </label>
              <input
                id="fotografia"
                type="file"
                id="fotografia"
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            <input class="main-button" type="submit" value="Registrar" />
`;

const formEmpresa = `
<div class="input-container">
              <label for="nombre-empresa">Nombre de la empresa: </label>
              <input
                type="text"
                name="nombre-empresa"
                required
                id="nombre-empresa"
                placeholder="Nombre de la empresa"
              />
            </div>
            <div class="input-container">
              <label for="email">Correo: </label>
              <input
                type="email"
                name="email"
                required
                id="email"
                placeholder="email@domain.tld"
              />
            </div>
            <div class="input-container">
              <label for="password">Contraseña: </label>
              <input
                type="password"
                name="password"
                required
                id="password"
                style="flex: 1"
              />
            </div>
            <div class="input-container">
              <label for="password2">Confirmar contraseña: </label>
              <input
                type="password"
                name="password2"
                required
                id="password2"
                style="flex: 1"
              />
            </div>
            <div class="input-container">
              <label for="logo">Seleccionar logo de la empresa: </label>
              <input
                id="logo"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                required
              />
            </div>
            <div class="input-container">
              <label for="descripcion">Descripción de la empresa: </label>
              <textarea
                name="descripcion"
                id="descripcion"
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>
            <input class="main-button" type="submit" value="Registrar" />

`;

function handleTipoUsuarioChange(e) {
  tipoUsuario = e.target.value;
  if (tipoUsuario === "usuario-final") {
    title.innerText = "Registro de usuario final";
    form.innerHTML = formUsuariosFinales;
  } else if (tipoUsuario === "empresa") {
    title.innerText = "Registro de empresa";
    form.innerHTML = formEmpresa;
  }
  password = document.getElementById("password");
  password2 = document.getElementById("password2");

  password2.addEventListener("input", handlePasswordInput);
}

function handlePasswordInput(e) {
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

function handleFormSubmit(e) {
  e.preventDefault();

  const passwordValue = password.value;

  const email = document.getElementById("email").value;
  let session;
  if (tipoUsuario === "usuario-final") {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const genero = document.getElementById("genero").value;
    const cv = document.getElementById("cv").value;
    const fotografia = document.getElementById("fotografia").value;
    const usuarioFinal = {
      nombre,
      apellidos,
      email,
      passwordValue,
      genero,
      cv,
      fotografia,
    };
    session = handleNewUser(usuarioFinal);
    console.log(usuarioFinal);
  } else if (tipoUsuario === "empresa") {
    console.log(e);
    const nombreEmpresa = document.getElementById("nombre-empresa").value;
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
  }
  if (session) {
    console.log(session);
    location.href = "/perfil/";
  }
}
