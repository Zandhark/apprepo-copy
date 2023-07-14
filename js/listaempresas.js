const mainContent = document.getElementById("main-content");

function getCompanies() {
  const companies = [
    {
      id: 1,
      name: "Company A",
      shortDesc: "This is Company A's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyA_logo.png",
    },
    {
      id: 2,
      name: "Company B",
      shortDesc: "This is Company B's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyB_logo.png",
    },
    {
      id: 3,
      name: "Company C",
      shortDesc: "This is Company C's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyC_logo.png",
    },
    {
      id: 5,
      name: "Company E",
      shortDesc: "This is Company E's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyE_logo.png"
    },
    {
      id: 6,
      name: "Company F",
      shortDesc: "This is Company F's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyF_logo.png"
    },
    {
      id: 7,
      name: "Company G",
      shortDesc: "This is Company G's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyG_logo.png"
    },
    {
      id: 8,
      name: "Company H",
      shortDesc: "This is Company H's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyH_logo.png"
    },
    {
      id: 9,
      name: "Company I",
      shortDesc: "This is Company I's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyI_logo.png"
    },
    {
      id: 10,
      name: "Company J",
      shortDesc: "This is Company J's description.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem a blanditiis non, vero beatae porro quos vel minus soluta inventore quo laboriosam quibusdam voluptates architecto voluptate totam. Natus, blanditiis sapiente.",  
      logo: "https://example.com/companyJ_logo.png"
    }
  ];
  return companies;
}


function renderEmpresas() {
  const empresas = getCompanies();
  const empresasHTML = empresas.map((empresa, index) => {
    return `
    <div
      id="div-empresa-${index}"
      class="padding-box flex flex-align-center flex-gap-10 notification border flex-space-between"
    >
      <div class="flex flex-gap-20">
        <div class="flex flex-gap-20 flex-wrap" style="width: 400px">
          <div>
            <img src="/assets/empresas-${index}.png" alt="logo de empresa" class="logo-empresa" />
          </div>
          <div>
            <h2>${empresa.name}</h2>
            <div>
              <p>${empresa.shortDesc}</p>
            </div>
          </div>
        </div>
      </div>
      <a href="/empresas/perfil.html?id=${empresa.id}">
        <button class="main-button">Ver empresa</button>
      </a>
    </div>

    `;
  }
  );
  mainContent.innerHTML = empresasHTML.join("");
}

renderEmpresas();