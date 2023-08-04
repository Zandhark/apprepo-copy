const mainContent = document.getElementById("main-content");
let notifications;

const svgBell = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
        style="height: 30px; width: 30px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
`;

const svgCheck = `

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6 pulsate-bell"
    style="height: 30px; width: 30px"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
    />
  </svg>

`;

function handleNotificationRead(e) {
  // Controla cambio de status de notificaciones entre leido y no leido
  const notificationIndex = e.target.id.split("-")[2];
  const svgContainer = document.getElementById(e.target.id);
  const parentContainer = document.getElementById(e.target.parentElement.id);

  if (notifications[notificationIndex].read) {
    // Si la notificacion esta leida entonces la marca como no leida y canbia el icono a uncheck
    notifications[notificationIndex].read = false;
    svgContainer.innerHTML = svgCheck;
    parentContainer.classList.add("unread-notification");
  } else if (!notifications[notificationIndex].read) {
    // Si la notificacion no esta leida entonces la marca como leida y canbia el icono a una campana
    notifications[notificationIndex].read = true;
    svgContainer.innerHTML = svgBell;
    parentContainer.classList.remove("unread-notification");
  }
}

function getNotifications(userId) {
  notifications = [
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: false,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: false,
    },
    {
      id: 0,
      userId: 0,
      title: "Ha sido invitado al puesto de: Desarrollador Web",
      description: "Estado de la aplicacion: En Revision.",
      date: "2021-05-01",
      read: false,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: false,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
    {
      id: 0,
      userId: 0,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "2021-05-01",
      read: true,
    },
  ];
}

function renderNotifications() {
  getNotifications(0);

  notifications.forEach((notification, index) => {
    const notificationDiv = document.createElement("div");
    notificationDiv.classList =
      "padding-box flex flex-align-center flex-gap-20 notification";
    notificationDiv.id = `notification-${index}`;

    if (notification.read) {
      notificationDiv.innerHTML = `
      <div id="notification-svg-${index}" onclick="handleNotificationRead(event)">
      ${svgBell}
      </div>
    <div>
      <h2>${notification.title}</h2>
      <div class="flex flex-align-center flex-gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          style="height: 20px; width: 20px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
    
        <p>${notification.date}</p>
      </div>
      <p class="notification-description">${notification.description}</p>
    </div>
    
    `;
    } else if (!notification.read) {
      notificationDiv.classList.add("unread-notification");
      notificationDiv.innerHTML = `
    <div id="notification-svg-${index}" onclick="handleNotificationRead(event)">
      ${svgCheck}
    </div>
    <div>
      <h2>${notification.title}</h2>
      <div class="flex flex-align-center flex-gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          style="height: 20px; width: 20px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
        <p>${notification.date}</p>
      </div>
      <p class="notification-description">${notification.description}</p>
    </div>

      `;
    }

    mainContent.appendChild(notificationDiv);
  });
}

function markAllAsRead() {
  notifications.forEach((notification, index) => {
    const notificationDiv = document.getElementById(`notification-${index}`);
    const svgContainer = document.getElementById(`notification-svg-${index}`);
    notification.read = true;
    svgContainer.innerHTML = svgBell;
    notificationDiv.classList.remove("unread-notification");
  });
}

renderNotifications();
