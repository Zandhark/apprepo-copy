const form = document.getElementById("form-usuarios");
const selectUsuario = document.getElementById("select-usuario");
selectUsuario.addEventListener("change", handleTipoUsuarioChange);
let tipoUsuario;

const formUsuariosFinales = `
  <label for="firstname">Primer Nombre: </label>
  <input type="text" name="firstname" required id="nombre" />
  <br />
  <label for="lastname">Primer Apellido: </label>
  <input type="text" name="lastname" required id="primerApellido" />
  <br />
  <label for="lastname">Segundo Apellido: </label>
  <input type="text" name="lastname" required id="segundoApellido" />
  <br />
  <label for="email">Correo: </label>
  <input type="email" name="email" required id="email" />
  <br />
  <label for="password">Password: </label>
  <input type="password" name="password" required id="password" />
  <br />
  <label for="password2">Confirmar Password: </label>
  <input type="password" name="password2" required id="password2" />
  <br />
  <label for="genero">Genero:</label>
  <select name="genero" required name="genero" id="genero">
    <option value="" disabled selected hidden>Seleccione una opción</option>
    <option value="masculino">Masculino</option>
    <option value="femenino">Femenino</option>
    <option value="femenino">Prefiero no especificar</option>
  </select>
  <br />
  <label for="cv">Seleccionar CV: </label>
  <input type="file" id="cv" accept=".pdf" />
  <br />
  <label for="fotografia">Seleccionar fotografia: </label>
  <input type="file" id="fotografia" accept="image/png, image/jpeg, image/jpg" />
  <br />
  <input type="submit" value="Registrar" />

  <img
    src="/assets/job_hunt.svg"
    alt="busqueda de empleo"
    width="100px"
    height="100px"
  />
`;

const formEmpresa = `
  <label for="nombre-empresa">Nombre de la empresa: </label>
  <input type="text" name="nombre-empresa" required id="nombre-empresa" />
  <br />
  <label for="email">Correo: </label>
  <input type="email" name="email" required id="email" />
  <br />
  <label for="password">Password: </label>
  <input type="password" name="password" required id="password" />
  <br />
  <label for="password2">Confirmar Password: </label>
  <input type="password" name="password2" required id="password2" />
  <br />
  <label for="logo">Seleccionar logo de la empresa: </label>
  <input type="file" accept="image/png, image/jpeg, image/jpg" required />
  <br />
  <label for="descripcion">Descripción de la empresa: </label>
  <br />
  <textarea name="descripcion" id="descripcion" cols="30" rows="10" required></textarea>
  <input type="submit" value="Registrar" />
  <img
  src="/assets/briefcase.svg"
  alt="maletin"
  width="100px"
  height="100px"
  />
`;

function handleTipoUsuarioChange(e) {
  tipoUsuario = e.target.value;
  if (tipoUsuario === "usuario-final") {
    form.innerHTML = formUsuariosFinales;
  } else if (tipoUsuario === "empresa") {
    form.innerHTML = formEmpresa;
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (tipoUsuario === "usuario-final") {
    const nombre = document.getElementById("nombre").value;
    const primerApellido = document.getElementById("primerApellido").value;
    const segundoApellido = document.getElementById("segundoApellido").value;
    const email = document.getElementById("email").value;
    const genero = document.getElementById("genero").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    console.log("Nombre: " + nombre);
    console.log("Primer Apellido: " + primerApellido);
    console.log("Segundo Apellido: " + segundoApellido);
    console.log("Email: " + email);
    console.log("Genero: " + genero);
    console.log("Password: " + password);
    console.log("Password2: " + password2);
    console.log(e); // console.log del evento para ver que se genera en el evento
  } else if (tipoUsuario === "empresa") {
    console.log(tipoUsuario);
  }
}
