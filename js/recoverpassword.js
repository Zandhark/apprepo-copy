const correo = document.getElementById("email");

function handleFormSubmit(e) {
  e.preventDefault();
  const correoValue = correo.value;
  alert("Se ha enviado un correo a " + correoValue + " para recuperar su contraseña");
}