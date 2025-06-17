/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/
export async function loadSectionComponents() {
    loadProjectsSection()
    loadToolsSection()
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
        <div class="card ${project.layout}">
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
        { section: "dev", title: "Linux", icon_id: "linux_full_color_icon" },
        { section: "dev", title: "Debian", icon_id: "debian_icon" },
        { section: "dev", title: "Bash", icon_id: "bash_icon" },
        { section: "dev", title: "Git", icon_id: "git_icon" },
        { section: "dev", title: "Github", icon_id: "github_icon" },
        { section: "dev", title: "Gradle", icon_id: "gradle_icon" },
        { section: "dev", title: "Jetpack", icon_id: "jetpack_icon" },
        { section: "dev", title: "Google Cloud", icon_id: "gcp_icon" },
        { section: "dev", title: "Firebase", icon_id: "firebase_icon" },
        { section: "dev", title: "Android Studio", icon_id: "android_studio_icon" },
        { section: "dev", title: "Intellij", icon_id: "intellij_icon" },
        { section: "dev", title: "VS Code", icon_id: "vs_code_icon" },
        { section: "dev", title: "Chat GPT", icon_id: "chatgpt_icon" },
        { section: "dev", title: "Copilot", icon_id: "copilot_icon" },
        { section: "dev", title: "LibGDX", icon_id: "libgdx_icon", custom_size: true, width: "48", height: "24" },
        { section: "graphics", title: "Aseprite", icon_id: "aseprite_icon" },
        { section: "graphics", title: "Tiled", icon_id: "tiled_icon" },
        { section: "graphics", title: "Krita", icon_id: "krita_icon" },
        { section: "graphics", title: "Gimp", icon_id: "gimp_icon" },
        { section: "graphics", title: "Inkscape", icon_id: "inkscape_icon" }
    ]
    const devToolsContainer = document.getElementById('dev-tools-container')
    const graphicsToolsContainer = document.getElementById('graphics-tools-container')
    data.forEach(i => {
        const container = i.section === "dev" ? devToolsContainer : graphicsToolsContainer;
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
