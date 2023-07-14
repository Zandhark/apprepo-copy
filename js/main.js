const nav = document.getElementById("menu-nav");
let userType;

if (document.cookie.includes("userType")) {
  userType = document.cookie.split(";").find((item) => item.includes("userType")).split("=")[1];
}


function handleCloseSession() { // Maneja cierre de sesion, borra las cookies y redirige a la pagina de inicio
  document.cookie = "usuario=; path=/; max-age=0";
  document.cookie = "userId=; path=/; max-age=0";
  document.cookie = "userType=; path=/; max-age=0";
  document.cookie = "sessionId=; path=/; max-age=0";
  location.href = "/";
}

function renderMenu() {
  let userNav;
  if (userType == "endUser") { // Verifica el tipo de usuario y renderiza el menu correspondiente
    userNav = `
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/empresas/">Empresas</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesion</a>
    `;
  } else if (userType === "reclutador") {
    userNav = `
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/empresas/">Empresas</a>
      <a href="/candidatos/">Candidatos</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesion</a>
    `;
  } else if (userType === "manager") {
    userNav = `
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/puestos/nuevo/">Nuevo puesto</a>
      <a href="/empresas/">Empresas</a>
      <a href="/candidatos/">Candidatos</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesion</a>
    `;
  } else if (userType === "administrador") {
    userNav = `
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/empresas/">Empresas</a>
      <a href="/candidatos/">Candidatos</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesion</a>
    `;
  } else if (userType === undefined) {
    userNav = `
      <a href="/">Inicio</a>
      <a href="/registro/">Registro</a>
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/empresas/">Empresas</a>
      <a href="/login/">Login</a>
  `;
  }
  nav.innerHTML = userNav;
}

renderMenu();
