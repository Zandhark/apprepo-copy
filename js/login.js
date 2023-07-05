const usuario = document.getElementById("username");
const password = document.getElementById("password");

function handleLogin(login){
  document.cookie = `usuario=${login.usuario}; path=/; max-age=3600`;
  console.log(login);
  return true;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const usuarioValue = usuario.value;
  const passwordValue = password.value;
  const login = {
    usuario: usuarioValue,
    password: passwordValue,
  };

  try{
    const session = handleLogin(login);
    if (session && document.cookie.includes("usuario")){
      location.href = "/cuenta/perfil.html";
    }

  } catch (error){
    console.log(error);
  }
}