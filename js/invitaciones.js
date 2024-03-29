const mainContent = document.getElementById("main-content");

function getInvitations(userId) {
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
  return invitations;
}

function renderInvitations() {
  const invitations = getInvitations(0);
  const invitationsHTML = invitations.map((invitation, index) => {
    return `
    <div
      id="invitacion-${index}"
      class="border padding-box flex flex-align-center flex-gap-40 notification"
    >
      <div>
        <h2>${invitation.title}</h2>
        <h3>Estado de la aplicación: ${invitation.status}</h3>
        <div class="flex flex-align-center flex-gap-5">
          <p>${invitation.description}</p>
        </div>
      </div>
      <a href="/invitaciones/invitacion.html?id=${invitation.id}">
        <button class="main-button">Ver invitación</button>
      </a>
    </div>


    `;
  });
  mainContent.innerHTML = invitationsHTML.join("");
}

renderInvitations();
