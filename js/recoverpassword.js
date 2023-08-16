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
