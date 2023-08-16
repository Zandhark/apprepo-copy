const correo = document.getElementById("email");
const searchParams = new URLSearchParams(window.location.search);

async function handleFormSubmit(e) {
  e.preventDefault();
  const correoValue = correo.value;
  try {
    const response = await fetch("http://localhost:3000/api/recover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: correoValue,
      }),
    });
    if (response.status !== 200) {
      throw new Error("Error al enviar el correo");
    }
    alert(
      "Se ha enviado un correo a " +
        correoValue +
        " para recuperar su contraseña"
    );
    
  } catch (e) {
    alert("Se ha enviado un correo a " + correoValue);
  }
  
}

async function handleResetPassword(e) {
  e.preventDefault();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }
  try {
    const response = await fetch(`http://localhost:3000/api/recover/${userId}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });
    const data = await response.json();
    if (response.status === 401) {
      throw new Error(data.message);
    }
    alert("Se ha cambiado la contraseña");
    window.location.href = "http://localhost:3000/login";
  } catch (e) {
    alert("El link ha expirado")
  }
}

function render() {
  const recoverForm = document.getElementById("recover-form");
  const resetForm = document.getElementById("reset-form");
  if (searchParams.get("token")) {
    recoverForm.style.display = "none";
    resetForm.style.display = "block";
  }
}

render();