const usuario = document.getElementById("username");
const password = document.getElementById("password");

function handleLogin(login){

  try{
    const session = {...login, id:1}
    document.cookie = `usuario=${session.usuario}; path=/; max-age=3600`;
    document.cookie = `userId=${session.id}; path=/; max-age=3600`;
    return session;
  } catch (e){
    console.log(e);
    return false;
  }
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
    console.log(session)
    if (session && document.cookie.includes("userId")){
      location.href = "/cuenta/perfil.html";
    }

  } catch (error){
    console.log(error);
  }
}