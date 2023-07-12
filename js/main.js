const nav = document.getElementById("menu-nav");
let userType;

if (document.cookie.includes("userType")) {
  userType = document.cookie.split(";").find((item) => item.includes("userType")).split("=")[1];
}

console.log(userType)

function handleCloseSession() {
  document.cookie = "usuario=; path=/; max-age=0";
  document.cookie = "userId=; path=/; max-age=0";
  document.cookie = "userType=; path=/; max-age=0";
  location.href = "/";
}

function renderMenu() {
  let userNav;
  if (userType == "endUser") { // Verifica el tipo de usuario y renderiza el menu correspondiente
    userNav = `
      <a href="/">Inicio</a>
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesion</a>
    `;
  } else if (userType === "manager" || userType === "reclutador") {
    userNav = `
      <a href="/">Inicio</a>
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesion</a>
    `;
  } else if (userType === "administrador") {
    userNav = `
      <a href="/">Inicio</a>
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesion</a>
    `;
  } else if (userType === undefined) {
    userNav = `
      <a href="/">Inicio</a>
      <a href="/registro/">Registro</a>
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/login/">Login</a>
  `;
  }
  nav.innerHTML = userNav;
}

renderMenu();
