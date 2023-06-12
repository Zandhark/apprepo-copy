function handleFormSubmit(e) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const primerApellido = document.getElementById('primerApellido').value;
  const segundoApellido = document.getElementById('segundoApellido').value;
  const email = document.getElementById('email').value;
  const genero = document.getElementById('genero').value;
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;

  console.log("Nombre: " + nombre);
  console.log("Primer Apellido: " + primerApellido);
  console.log("Segundo Apellido: " + segundoApellido);
  console.log("Email: " + email);
  console.log("Genero: " + genero);
  console.log("Password: " + password);
  console.log("Password2: " + password2);
  console.log(e) // console.log del evento para ver que se genera en el evento

}