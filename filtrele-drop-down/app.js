const settingsmenu = document.querySelector(".settings-menu");
const darkBtn = document.getElementById("dark-btn");
const nav_user_icon = document.querySelector(".nav-user-icon");

function settingsMenuToggle() {
    settingsmenu.classList.toggle("settings-menu-height");
}

// döküman üzerinde herhangi bi yere tıklanıldığında
document.addEventListener("click", (e) => {
    // tıklanan elementin dropdown içinde olup olmadığını kontrol et
    const isClickInsideDropdown = nav_user_icon.contains(e.target);
    const isClickInsideDropdownn = settingsmenu.contains(e.target);

    if (!isClickInsideDropdown) {
        settingsmenu.classList.remove("settings-menu-height");
    }
    if (isClickInsideDropdownn) {
        settingsmenu.classList.add("settings-menu-height");
    }
})

darkBtn.onclick = function () {
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if (localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "light");
    }
}

if (localStorage.getItem("theme") == "light") {
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if (localStorage.getItem("theme") == "dark") {
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
}
else {
    localStorage.setItem("theme", "light");
}



const allLinks = document.querySelectorAll(".tabs a");
const allTabs = document.querySelectorAll(".tab-content");

//tüm bağlantıları döngüye al
allLinks.forEach((element) => {
    element.addEventListener("click", () => {
        //tıklanan bağlantının id'sini ve href özelliğini al
        const linkId = element.id;
        const hrefLinkClick = element.href;

        //tüm bağlantıları döngü ile işle tıklanana işlem yap
        allLinks.forEach((link) => {
            if (link.href == hrefLinkClick)
                link.classList.add("active");
            else
                link.classList.remove("active");
        })

        //tüm sekme içeriğini döngü ile al
        allTabs.forEach((tab) => {
            //bağlantının idsini içeren sekme içeriği göster veya gizle
            if (tab.id.includes(linkId)) {
                tab.classList.add("tab-content-active");
                //sekme içeriği için içerik oluştur
                generateTabItems(element, tab);
            }
            else {
                tab.classList.remove("tab-content-active");
            }
        })
    })
})

//örnek için sahte kayıtlar
const tabRecords = [
    {
        src: "profil.jpg",
        name: "İbrahim Ethem Öztürk",
        description: "15dk önce katıldı",
        type: "user",
        status: "active",
    },
    {
        src: "profile2.jpg",
        name: "sdmergn",
        description: "2 saat önce katıldı",
        type: "user",
        status: "inactive",
    },
    {
        src: "profil1.jpg",
        name: "İEÖ",
        description: "1 saat önce katıldı",
        type: "user",
        status: "inactive",
    },
    {
        src: "logo.png",
        name: "Profil Foto",
        description: "10dk önce yüklendi",
        type: "file",
    },
    {
        src: "cv.avif",
        name: "DVD İçeriği",
        description: "2 gün önce oluşturuldu",
        type: "file",
    }
]

//önceden tanımlanmış filtre işlevleri
const filter = {
    ["all"]: () => true,
    ["user"]: (record) => record.type === "user",
    ["file"]: (record) => record.type === "file",
}

//sekme öğelerini oluştur içeriğini doldur
const generateTabItems = (element, tabContent) => {
    const filterName = element.name;
    const filterFunction = filter[filterName];

    const mappedRecords = tabRecords.filter(filterFunction).map((record) => {
        return `
            <div class="record">
               <div class="avatar__wrapper">
                  <img src="${record.src}" class="avatar avatar-${record.type}">
                  ${record.type === "user" && record.status ?
                `
                          <div class="status">
                              <div class="status__inner status__inner-${record.status}"></div>  
                          </div>
                      `
                : ""
            }
                  </div>
                  <div class="content">
                    <div class="title">${record.name}</div>
                    <div class="description">${record.description}</div>
                  </div>
            </div>
        `
    })
    tabContent.innerHTML = mappedRecords.join("");
}

// ilk yükleme için uygun seçimi ele al
const currentHash = window.location.hash;

let activeLink = document.querySelector(`.tabs a`);

if (currentHash) {
    const visibleHash = document.getElementById(`${currentHash}`);
    if (visibleHash)
        activeLink = visibleHash;
}

const activeTab = document.querySelector(`#${activeLink.id}-content`);

//aktif bağlantıyı ve sekme içeriğini göster-gizle
activeLink.classList.toggle("active");
activeTab.classList.toggle("tab-content-active");

generateTabItems(activeLink, activeTab);