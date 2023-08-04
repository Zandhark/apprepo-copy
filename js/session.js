function verifyUserSession() {
  // Verificar si el usuario inició sesión
  let userId, sessionId;
  try {
    userId = document.cookie
      .split(";")
      .find((item) => item.includes("userId"))
      .split("=")[1];
    sessionId = document.cookie
      .split(";")
      .find((item) => item.includes("sessionId"))
      .split("=")[1];
  } catch (e) {}

  if (!userId && !sessionId) {
    alert("No ha iniciado sesión");
    location.href = "/login/";
  }
}

verifyUserSession();
