const usuario = document.getElementById("username");
const password = document.getElementById("password");
const userSelect = document.getElementById("tipousuario");// temp code, remove


function generateRandomId() {
  return (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}

async function handleLogin(login) {
  
  try {

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });
    const user = await response.json();
    if (user.error) {
      throw new Error(user.error);
    }
    document.cookie = `userId=${user.id}; path=/; max-age=3600`;
    document.cookie = `sessionId=${generateRandomId()}; path=/; max-age=3600`;
    document.cookie = `userType=${user.type}; path=/; max-age=3600`;
    
    return session;
  } catch (e) {
    // alert("Se produjo un error al iniciar sesión, intente nuevamente.");
    alert(e)
    return false;
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const tipoUsuario = userSelect.value; // temp code, remove
  const usuarioValue = usuario.value;
  const passwordValue = password.value;
  const login = {
    email: usuarioValue,
    password: passwordValue,
    tipoUsuario: tipoUsuario,
  };

  try {
    const session = handleLogin(login);

    if (session && document.cookie.includes("userId")) {
      if (document.referrer === window.location.href || document.referrer === "") {
        location.href = "/";
      } else {
        location.href = `${document.referrer}`;
      }
    }
  } catch (error) {
    console.log(error);
  }
}