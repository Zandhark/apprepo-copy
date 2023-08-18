const nav = document.getElementById("menu-nav");
let userType;

if (document.cookie.includes("userType")) {
  userType = document.cookie
    .split(";")
    .find((item) => item.includes("userType"))
    .split("=")[1];
}

async function handleCloseSession() {
  // Maneja cierre de sesion, borra las cookies, borra la sesion del DB y redirige a la pagina de inicio
  try {
    const sessionId = document.cookie
      .split(";")
      .find((item) => item.includes("sessionId"))
      .split("=")[1];
    if (sessionId === undefined) {
      alert("Sesion cerrada");
      location.href = "/";
    }
    const response = await fetch(
      `http://localhost:3000/api/session/delete/${sessionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const session = await response.json();

    document.cookie = "userId=; path=/; max-age=0";
    document.cookie = "userType=; path=/; max-age=0";
    document.cookie = "sessionId=; path=/; max-age=0";
    alert("Sesion cerrada");
    location.href = "/";
  } catch (e) {
    alert("Sesion cerrada");
    location.href = "/";
  }
}

function renderMenu() {
  let userNav;
  if (userType == "endUser") {
    // Verifica el tipo de usuario y renderiza el menu correspondiente
    userNav = `
      <a href="/puestos/" id="nav-puestos">Puestos de Trabajo</a>
      <a href="/empresas/" id="nav-empresas">Empresas</a>
      <a href="/notificaciones/" id="nav-notif">Notificaciones</a>
      <a href="/perfil/" id="nav-perfil">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar Sesión</a>
    `;
  } else if (userType === "reclutador") {
    userNav = `
      <a href="/puestos/" id="nav-puestos">Puestos de Trabajo</a>
      <a href="/empresas/" id="nav-empresas">Empresas</a>
      <a href="/candidatos/" id="nav-candidatos">Candidatos</a>
      <a href="/notificaciones/" id="nav-notif">Notificaciones</a>
      <a href="/perfil/" id="nav-perfil">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesión</a>
    `;
  } else if (userType === "manager") {
    userNav = `
      <a href="/puestos/" id="nav-puestos">Puestos de Trabajo</a>
      <a href="/puestos/nuevo/" id="nav-puestos-nuevo">Nuevo puesto</a>
      <a href="/puestos/mispuestos/" id="nav-puestos-mispuestos">Mis puestos</a>
      <a href="/empresas/" id="nav-empresas">Empresas</a>
      <a href="/candidatos/" id="nav-candidatos">Candidatos</a>
      <a href="/notificaciones/" id="nav-notif">Notificaciones</a>
      <a href="/perfil/" id="nav-perfil">Mi Perfil</a>
      <a href="javascript:handleCloseSession();">Cerrar sesión</a>
    `;
  } else if (userType === "administrador") {
    userNav = `
      <a href="/puestos/" id="nav-puestos">Puestos de Trabajo</a>
      <a href="/candidatos/" id="nav-candidatos">Usuarios</a>
      <a href="/empresas/" id="nav-empresas">Empresas</a>
      <a href="/notificaciones/" id="nav-notif">Notificaciones</a>
      <a href="/empresas/perfil.html" id="nav-perfil-empresa">Perfil Empresa</a>
      <a href="javascript:handleCloseSession();">Cerrar sesión</a>
    `;
  } else if (userType === undefined) {
    userNav = `
      <a href="/" id="nav-inicio">Inicio</a>
      <a href="/registro/" id="nav-registro">Registro</a>
      <a href="/puestos/" id="nav-puestos">Puestos de Trabajo</a>
      <a href="/empresas/" id="nav-empresas">Empresas</a>
      <a href="/login/">Iniciar sesión</a>
  `;
  }
  nav.innerHTML = userNav;
  switch (location.pathname) {
    case "/":
      document.getElementById("nav-inicio").classList.add("current-nav-border");
      break;
    case "/puestos/":
      document.getElementById("nav-puestos").classList.add("current-nav-border");
      break;
    case "/empresas/":
      document.getElementById("nav-empresas").classList.add("current-nav-border");
      break;
    case "/notificaciones/":
      document.getElementById("nav-notif").classList.add("current-nav-border");
      break;
    case "/registro/":
      document.getElementById("nav-registro").classList.add("current-nav-border");
      break;
    case "/candidatos/":
      document.getElementById("nav-candidatos").classList.add("current-nav-border");
      break;
    case "/perfil/":
      document.getElementById("nav-perfil").classList.add("current-nav-border");
      break;
    case "/empresas/perfil.html":
      document.getElementById("nav-perfil-empresa").classList.add("current-nav-border");
      break;
    case "/puestos/nuevo/":
      document.getElementById("nav-puestos-nuevo").classList.add("current-nav-border");
      break;
    case "/puestos/mispuestos/":
      document.getElementById("nav-puestos-mispuestos").classList.add("current-nav-border");
      break;
      

  }

}

renderMenu();
