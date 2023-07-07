const siteCookie = document.cookie;
const userCookie = siteCookie.split(";")[1]; // Returns the value of the cookie
const userId = userCookie.split("=")[1]; // Returns the value of the cookie

console.log(userId)
// Verificar si el usuario inició sesión
// if (userId){
//   alert(`Bienvenido ${userId}`)
// } else {
//   alert("No se ha iniciado sesión")
//   location.href = "/login/";
// }

const profileImg = document.getElementById("profile-img");
const userDescription = document.getElementById("user-description");
const userName = document.getElementById("user-name");
const title = document.getElementById("title");
const userAbout = document.getElementById("user-about");

function getUserDetails(userId){
  const userDetails = {
    id: userId,
    name: "John Doe",
    email: "test@mail.nope",
    title: "UI/UX Developer",
    userDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
    profileImg: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
    curriculum: `http://${window.location.host}/assets/perfildeusuario-defaultprofileimg.jpeg`,
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
    experience: [
      {
        title: "UI/UX Developer",
        company: "Google",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Rust Developer",
        company: "Linux foundation",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Kotlin Developer",
        company: "NVIDIA",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Linux Systems administrator",
        company: "Valve",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      }
    ],
    education: [
      {
        title: "Bachillerato",
        institution: "Colegio de wizzards",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      },
      {
        title: "Educacion Media",
        institution: "Escuela de wizzards",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum ultricies nunc, vitae aliquam nisl nunc eu nisi.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
      }
    ],
    skills: [
      {
        name: "HTML",
      },
      {
        name: "Rust",
      },
      {
        name: "Linux",
      },
      {
        name: "ZFS",
      }
    ],
    languages: [
      {
        name: "English",
        level: "B2",
      },
      {
        name: "Español",
        level: "Nativo",
      },
    ],
  }
  return userDetails;
}


function renderProfile(){
  const userDetails = getUserDetails(userId);
  profileImg.src = userDetails.profileImg;
  userDescription.innerText = userDetails.userDescription;
  userName.innerText = userDetails.name;
  userAbout.innerText = userDetails.about;
}

renderProfile();