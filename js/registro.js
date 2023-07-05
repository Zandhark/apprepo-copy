const form = document.getElementById("form-usuarios");
const selectUsuario = document.getElementById("select-usuario");
selectUsuario.addEventListener("change", handleTipoUsuarioChange);
let tipoUsuario;
let password, password2;

const formUsuariosFinales = `
<label for="name">Nombre: </label>
<input type="text" name="name" required id="nombre" placeholder="Nombre" />
<label for="lastname">Primer Apellido: </label>
<input type="text" name="lastname" required id="apellidos" placeholder="Apellidos" />
<label for="email">Correo: </label>
<input type="email" name="email" required id="email" placeholder="email@domain.tld" />
<label for="password">Password: </label>
<input type="password" name="password" required id="password" />
<label for="password2">Confirmar Password: </label>
<input type="password" name="password2" required id="password2" />
<label for="genero">Genero:</label>
<select name="genero" required name="genero" id="genero">
  <option value="" disabled selected hidden>Seleccione una opción</option>
  <option value="masculino">Masculino</option>
  <option value="femenino">Femenino</option>
  <option value="femenino">Prefiero no especificar</option>
</select>
<label for="cv">Seleccionar CV: </label>
<input type="file" id="cv" accept=".pdf" />
<label for="fotografia">Seleccionar fotografia: </label>
<input
  id="fotografia"
  type="file"
  id="fotografia"
  accept="image/png, image/jpeg, image/jpg"
/>
<input class="main-button" type="submit" value="Registrar" />
`;

const formEmpresa = `
<label for="nombre-empresa">Nombre de la empresa: </label>
<input
  type="text"
  name="nombre-empresa"
  required
  id="nombre-empresa"
  placeholder="Nombre de la empresa"
/>
<label for="email">Correo: </label>
<input
  type="email"
  name="email"
  required
  id="email"
  placeholder="email@domain.tld"
/>
<label for="password">Password: </label>
<input type="password" name="password" required id="password" />
<label for="password2">Confirmar Password: </label>
<input type="password" name="password2" required id="password2" />
<label for="logo">Seleccionar logo de la empresa: </label>
<input
  id="logo"
  type="file"
  accept="image/png, image/jpeg, image/jpg"
  required
/>
<label for="descripcion">Descripción de la empresa: </label>
<textarea
  name="descripcion"
  id="descripcion"
  cols="30"
  rows="10"
  required
></textarea>
<input class="main-button" type="submit" value="Registrar" />
`;

function handleTipoUsuarioChange(e) {
  tipoUsuario = e.target.value;
  if (tipoUsuario === "usuario-final") {
    form.innerHTML = formUsuariosFinales;
  } else if (tipoUsuario === "empresa") {
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

function handleFormSubmit(e) {
  e.preventDefault();

  const passwordValue = password.value;

  const email = document.getElementById("email").value;
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

    console.log(usuarioFinal)
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
    console.log(empresa)
  }
}
