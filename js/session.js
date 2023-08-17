function verifyUserSession() {
  // Verificar si el usuario inició sesión
  let userId, sessionId, userType;
  try {
    userId = document.cookie
      .split(";")
      .find((item) => item.includes("userId"))
      .split("=")[1];
    sessionId = document.cookie
      .split(";")
      .find((item) => item.includes("sessionId"))
      .split("=")[1];
    userType = document.cookie
      .split(";")
      .find((item) => item.includes("userType"))
      .split("=")[1];
  } catch (e) {}

  if (!userId && !sessionId) {
    alert("No ha iniciado sesión");
    location.href = "/login/";
  }
  console.log(location.href)
  // Control de acceso
  if (location.href.includes("puestos/nuevo/") && userType !== "manager") {
    location.href = "/puestos/";
  } else if (location.href.includes("puestos/mispuestos/") && userType !== "manager") {
    location.href = "/puestos/";
  } else if (location.href.includes("candidatos/")&& userType == "endUser") {
    location.href = "/puestos/";
  }
  
}

verifyUserSession();
