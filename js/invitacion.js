const invitationTitle = document.getElementById("titulo-invitacion");
const invitationStatus = document.getElementById("estado-invitacion");
const invitationDescription = document.getElementById("desc-invitacion");
const invitationDate = document.getElementById("fecha-invitacion");
const invitationEmpresa = document.getElementById("empresa-invitacion");

const urlParams = new URLSearchParams(window.location.search);
let invitationId = urlParams.get("id");

if (invitationId === null) {
  location.href = "/invitaciones/";
}

function getInvitation(invitationId) {
  const invitations = [
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      empresa: "Valve",
      date: "2021-05-01",
      status: "Enviada",
    },
    {
      id: 1,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      empresa: "Valve",
      date: "2021-05-01",
      status: "En Revision",
    },
    {
      id: 2,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      empresa: "Valve",
      date: "2021-05-01",
      status: "Denegada",
    },
    {
      id: 3,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      empresa: "Valve",
      date: "2021-05-01",
      status: "Denegada",
    },
    {
      id: 4,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      empresa: "Valve",
      date: "2021-05-01",
      status: "Denegada",
    },
    {
      id: 5,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      empresa: "Valve",
      date: "2021-05-01",
      status: "Denegada",
    },
  ];
  return invitations[invitationId];
}

function renderInvitation() {
  const invitation = getInvitation(invitationId);
  invitationTitle.innerText = invitation.title;
  invitationStatus.innerText = invitation.status;
  invitationDescription.innerText = invitation.description;
  invitationDate.innerText = invitation.date;
  invitationEmpresa.innerText = invitation.empresa;
}

renderInvitation();