/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

export async function loadSectionComponents() {
  /* Variables fot the slide elemetns */
  let slideCount
  let slideWidth
  let sliderSpeed
  document.querySelectorAll('.slider-pane').forEach(slider => {
    slideCount = slider.getAttribute('data-slide-count') || 3;
    slider.style.setProperty('--slideCount', slideCount);
    slideWidth = slider.getAttribute('data-slide-width') || "150px";
    slider.style.setProperty('--slideWidth', slideWidth);
    sliderSpeed = slider.getAttribute('data-slider-speed') || "12s";
    slider.style.setProperty('--sliderSpeed', sliderSpeed);
  });

  loadSkillSlideShows(slideCount)
  loadProjectsSection()
  loadToolsSection()
}

function loadSkillSlideShows(slideCount) {
  const data = [
    { title: "Java", icon: "java_icon" },
    { title: "Android", icon: "android_icon" },
    // Somehow this kotlin_icon won't render in chrome browser on android, I don't know why.
    // { title: "Kotlin", icon: "kotlin_icon" },
    { title: "Kotlin", icon: "kotlin_icon2" },
    { title: "HTML", icon: "html_icon" },
    { title: "CSS", icon: "css_icon" },
    { title: "Javascript", icon: "js_icon" },
    { title: "Libgdx", icon: "libgdx_icon" },
    { title: "Firebase", icon: "firebase_icon" },
    { title: "Admob", icon: "admob_icon" },
    { title: "Github", icon: "github_icon" },
  ]
  const container = document.getElementById("skills-slideshow-container")
  if (slideCount != data.length) {
    console.warn(`Slide count (${slideCount}) doesn't match data count (${data.length})`);
    slideCount = data.length;
  }

  // Should I include title here?
  let slides = [];
  for (let i = 0; i < 3; i++) {
    data.forEach(item => {
      slides.push(`
      <div class="slide">
        <svg class="icon animate-icon">
          <use href="#${item.icon}"></use>
        </svg>
      </div>`);
    });
  }
  container.innerHTML = slides.join('');

}

function loadProjectsSection() {
  const projects = [
    {
      id: "apps",
      title: "Apps that solve real problems",
      layout: "align-right",
      imgSrc: "assets/images/mockups/rentfinder_m3.png",
      imgAlt: "Rent Finder App Mockup",
      content: [
        "Rent Finder is a mobile app designed to solve the real-world challenge of finding rental spaces.",
        "With a user-centered design and direct landlord-renter communication, it showcases how purposeful design and development can turn everyday problems into practical digital solutions."
      ],
      links: [
        {
          label: "Visit Site",
          href: "https://sites.google.com/view/rentfinder/home",
          icon: "open_in_new_icon"
        }
      ]
    },
    {
      id: "games",
      title: "Chill with casual games",
      layout: "align-left",
      imgSrc: "assets/images/mockups/st-sm_m1.png",
      imgAlt: "Shooting Marbles and Spidee Tap Mockup",
      content: [
        "Spidee Tap and Shooting Marbles are casual mobile games developed for android, designed for quick, addictive play.<br>Both are crafted with clean visuals, responsive controls, and a focus on instant fun."
      ],
      links: [
        {
          label: "Spidee Tap on Google Play",
          href: "https://play.google.com/store/apps/details?id=com.datsgud.speederTap",
          icon: "play_icon"
        },
        {
          label: "Shooting Marbles on Google Play",
          href: "https://play.google.com/store/apps/details?id=com.datsgud.shootingMarbles",
          icon: "play_icon"
        }
      ]
    },
    {
      id: "rpg",
      title: "RPG adventures!",
      layout: "align-right",
      imgSrc: "assets/images/mockups/sal_m1.png",
      imgAlt: "Swords and Legends Mockup",
      content: [
        "Swords and Legends is a pixel RPG adventure game in active development, designed to immerse players in a vibrant, handcrafted world brimming with eccentric characters, meaningful choices, and memorable quests.",
        "This project is not just a game—it's a living proof of what passion-driven, solo indie development can achieve."
      ],
      links: [
        {
          label: "Be part of the development!",
          href: "mailto:sal@datsforge.com",
          icon: "mail_icon"
        }
      ]
    },
    {
      id: "tools",
      title: "Useful tools",
      layout: "align-left",
      imgSrc: "assets/images/mockups/datsync_m1.png",
      imgAlt: "datsync Mockup",
      content: [
        "datsync is a streamlined Bash tool designed to simplify file synchronization between Linux systems and external devices such as Android phones and USB drives.",
        "The script supports pushing and pulling files, precise mirroring, and flexible storage options, enabling efficient backup and transfer workflows."
      ],
      links: [
        {
          label: "Check it out on Github",
          href: "https://github.com/datsforge/datsync",
          icon: "github_icon"
        }
      ]
    }
  ];

  const container = document.getElementById("projects-container");

  projects.forEach(project => {
    container.innerHTML += `
      <section class="layout-column" aria-labelledby="section-${project.id}">
        <h3 id="section-${project.id}">${project.title}</h3>
        <div class="card ${project.layout} track-hover">
          ${project.layout === "align-left" ? `
            <div class="card-content">
              ${project.content.map(p => `<p>${p}</p>`).join('')}
              <div class="layout-column">
                ${project.links.map(link => `
                  <a href="${link.href}" class="button-text-icon" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
                    ${link.label}
                    <svg class="icon"><use href="#${link.icon}"></use></svg>
                  </a>
                `).join('')}
              </div>
            </div>
            <img class="card-media" src="${project.imgSrc}" alt="${project.imgAlt}" loading="lazy" />
          ` : `
            <img class="card-media" src="${project.imgSrc}" alt="${project.imgAlt}" loading="lazy" />
            <div class="card-content">
              ${project.content.map(p => `<p>${p}</p>`).join('')}
              <div class="layout-column">
                ${project.links.map(link => `
                  <a href="${link.href}" class="button-text-icon" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
                    ${link.label}
                    <svg class="icon"><use href="#${link.icon}"></use></svg>
                  </a>
                `).join('')}
              </div>
            </div>
          `}
        </div>
      </section>
    `;
  });
}

function loadToolsSection() {
  const data = [
    { section: "devLang", title: "Java", icon_id: "java_icon" },
    // Somehow this kotlin_icon won't render in chrome browser on android, I don't know why.
    // { section: "devLang", title: "Kotlin", icon_id: "kotlin_icon" },
    { section: "devLang", title: "Kotlin", icon_id: "kotlin_icon2" },
    { section: "devLang", title: "JavaScript", icon_id: "js_icon" },
    { section: "devLang", title: "HTML", icon_id: "html_icon" },
    { section: "devLang", title: "CSS", icon_id: "css_icon" },
    { section: "devTools", title: "Linux", icon_id: "linux_full_color_icon" },
    // { section: "devTools", title: "Debian", icon_id: "debian_icon" },
    // { section: "devTools", title: "Bash", icon_id: "bash_icon" },
    { section: "devTools", title: "Git", icon_id: "git_icon" },
    { section: "devTools", title: "Github", icon_id: "github_icon" },
    { section: "devTools", title: "Gradle", icon_id: "gradle_icon" },
    { section: "devTools", title: "Android", icon_id: "android_icon" },
    { section: "devTools", title: "Jetpack", icon_id: "jetpack_icon" },
    // { section: "devTools", title: "Google Cloud", icon_id: "gcp_icon" },
    { section: "devTools", title: "Firebase", icon_id: "firebase_icon" },
    { section: "devTools", title: "Admob", icon_id: "admob_icon" },
    { section: "devTools", title: "Android Studio", icon_id: "android_studio_icon" },
    { section: "devTools", title: "Intellij", icon_id: "intellij_icon" },
    { section: "devTools", title: "VS Code", icon_id: "vs_code_icon" },
    // { section: "devTools", title: "Chat GPT", icon_id: "chatgpt_icon" },
    // { section: "devTools", title: "Copilot", icon_id: "copilot_icon" },
    { section: "devTools", title: "LibGDX", icon_id: "libgdx_icon", custom_size: true, width: "48", height: "24" },
    { section: "graphics", title: "Aseprite", icon_id: "aseprite_icon" },
    { section: "graphics", title: "Tiled", icon_id: "tiled_icon" },
    { section: "graphics", title: "Krita", icon_id: "krita_icon" },
    { section: "graphics", title: "Gimp", icon_id: "gimp_icon" },
    { section: "graphics", title: "Inkscape", icon_id: "inkscape_icon" }
  ]
  const devLangContainer = document.getElementById('dev-lang-container')
  const devToolsContainer = document.getElementById('dev-tools-container')
  const graphicsToolsContainer = document.getElementById('graphics-tools-container')
  const sectionMap = {
    devTools: devToolsContainer,
    graphics: graphicsToolsContainer,
    devLang: devLangContainer,
  };

  data.forEach(i => {
    if (!sectionMap[i?.section]) {
      throw new Error(`Unknown section: "${i?.section}"`);
    }
    const container = sectionMap[i.section];
    if (i.custom_size) {
      container.innerHTML += `
                     <div class="icon-button unclickable animate-button">${i.title}
                            <svg class="icon animate-icon custom-size" width="${i.width}" height="${i.height}">
                                <use href="#${i.icon_id}"></use>
                            </svg>
                        </div>
                        `;

    } else {
      container.innerHTML += `
                <div class="icon-button unclickable animate-button">${i.title}
                            <svg class="icon animate-icon">
                                <use href="#${i.icon_id}"></use>
                            </svg>
                        </div>
                        `;
    }
  })
}
