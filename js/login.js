const usuario = document.getElementById("username");
const password = document.getElementById("password");

function generateRandomId(){
  return (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}

function handleLogin(login){
  let randomId = generateRandomId();
  try {
    const session = {...login, id:randomId};
    document.cookie = `usuario=${session.usuario}; path=/; max-age=3600`;
    document.cookie = `userId=${session.id}; path=/; max-age=3600`;
    document.cookie = `userType=endUser; path=/; max-age=3600`
    return session;
  } catch(e) {
    alert("Se produjo un error al iniciar sesión, intente nuevamente.");
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
      location.href = `${document.referrer}`;
    }

  } catch (error){
    console.log(error);
  }
}