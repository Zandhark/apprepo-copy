const formUsuarios = document.getElementById("form-usuarios");
const formEmpresas = document.getElementById("form-empresas");
const selectUsuario = document.getElementById("select-usuario");
selectUsuario.addEventListener("change", handleTipoUsuarioChange);
let tipoUsuario;
let password, password2, passwordEmpresa, password2Empresa;

function handleTipoUsuarioChange(e) {
  tipoUsuario = e.target.value;
  if (tipoUsuario === "usuario-final") {
    formEmpresas.style.display = "none";
    formUsuarios.style.display = "flex";
    password = document.getElementById("password");
    password2 = document.getElementById("password2");
    password2.addEventListener("input", handlePasswordInput);
  } else if (tipoUsuario === "empresa") {
    formUsuarios.style.display = "none";
    formEmpresas.style.display = "flex";
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
