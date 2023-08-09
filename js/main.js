const nav = document.getElementById("menu-nav");
let userType;

if (document.cookie.includes("userType")) {
  userType = document.cookie.split(";").find((item) => item.includes("userType")).split("=")[1];
}


async function handleCloseSession() { // Maneja cierre de sesion, borra las cookies, borra la sesion del DB y redirige a la pagina de inicio
  const sessionId = document.cookie.split(";").find((item) => item.includes("sessionId")).split("=")[1];
  const response = await fetch(`http://localhost:3000/api/session/delete/${sessionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const session = await response.json();

  document.cookie = "userId=; path=/; max-age=0";
  document.cookie = "userType=; path=/; max-age=0";
  document.cookie = "sessionId=; path=/; max-age=0";
  alert("Sesion cerrada")
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
      <a href="javascript:handleCloseSession();">Cerrar Sesión</a>
    `;
  } else if (userType === "reclutador") {
    userNav = `
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/empresas/">Empresas</a>
      <a href="/candidatos/">Candidatos</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesión</a>
    `;
  } else if (userType === "manager") {
    userNav = `
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/puestos/nuevo/">Nuevo puesto</a>
      <a href="/empresas/">Empresas</a>
      <a href="/candidatos/">Candidatos</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/perfil/">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesión</a>
    `;
  } else if (userType === "administrador") {
    userNav = `
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/empresas/">Empresas</a>
      <a href="/notificaciones/">Notificaciones</a>
      <a href="/empresas/perfil.html">Perfil Empresa</a>
      <a href="javascript:handleCloseSession();">Cerrar sesión</a>
    `;
  } else if (userType === undefined) {
    userNav = `
      <a href="/">Inicio</a>
      <a href="/registro/">Registro</a>
      <a href="/puestos/">Puestos de Trabajo</a>
      <a href="/empresas/">Empresas</a>
      <a href="/login/">Iniciar sesión</a>
  `;
  }
  nav.innerHTML = userNav;
}

renderMenu();
