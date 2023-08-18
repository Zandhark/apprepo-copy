const usuario = document.getElementById("username");
const password = document.getElementById("password");



async function handleLogin(user) {
  const loader = document.createElement("div");
  try {
    loader.classList.add("loading");
    loader.id = "loader";
    document.getElementById("login-img-div").appendChild(loader);
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const login = await response.json();
    console.log(login)
    if (login.error) {
      console.log(login.error)
      throw new Error(login.error);
    }
    
    document.cookie = `userId=${login.login._id}; path=/; max-age=3600`;
    document.cookie = `sessionId=${login.session._id}; path=/; max-age=3600`;
    document.cookie = `userType=${login.login.type}; path=/; max-age=3600`;
    document.getElementById("loader").remove();
    return login;
  } catch (e) {
    alert(e)
    document.getElementById("loader").remove();
    return false;
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const usuarioValue = usuario.value;
  const passwordValue = password.value;
  const user = {
    email: usuarioValue,
    password: passwordValue,
  };

  try {
    const session = await handleLogin(user);

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