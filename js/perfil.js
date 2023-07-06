const siteCookie = document.cookie; // Returns true if it exists
const userCookie = siteCookie.split(";")[1]; // Returns the value of the cookie
const userId = userCookie.split("=")[1]; // Returns the value of the cookie

console.log(userId)
if (userId){
  alert(`Bienvenido ${userId}`)
} else {
  alert("No se ha iniciado sesión")
  location.href = "/login/";
}

function getUserDetails(userId){
  const userDetails = {
    "id": userId,
    "name": "John Doe",
    "email": "test@mail.nope",


  }
}