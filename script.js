// =========================
// Utilidades
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

// Nome, endereço e datas por cidade
function cityLabel(city) {
  const map = {
    saoluis: {
      name: "São Luís",
      address: "Hotel PraiaBella, Av. Litorânea, 46 – Calhau",
      date_ia: "28/03/2026",
      date_prof: null, // NÃO TEM
    },
    teresina: {
      name: "Teresina",
      address:
        "Auditório Diamond, Ed. Diamond Center (Sala Bronze), Av. Universitária, 750 – Bairro de Fátima",
      date_ia: "05/03/2026",
      date_prof: "06/03/2026",
    },
    fortaleza: {
      name: "Fortaleza",
      address: "Ninna Hub, Av. Dom Manuel, 1020 - Centro, Fortaleza - CE",
      date_ia: "20/03/2026",
      date_prof: "21/03/2026",
    },
  };

  return map[city] || { name: city, address: "Endereço a definir" };
}

// =========================
// MENU MOBILE
// =========================
const burger = document.querySelector(".nav__burger");
const nav = document.querySelector(".nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// =========================
// ✅ DADOS: imagens + links (sem App/WhatsApp)
// =========================
const DATA = {
  saoluis: {
    onlyIA: true, // 👈 regra: São Luís só tem IA na prática
    hero: "./assets/WhatsApp Image 2026-02-10 at 12.48.58.jpeg",
    covers: {
      ia: "./assets/WhatsApp Image 2026-02-10 at 12.49.24 (1).jpeg",
      prof: null, // não usa
    },
    turmas: [
      "./assets/turma_img1.jpeg",
      "./assets/WhatsApp Image 2026-02-10 at 12.48.55.jpeg",
      "./assets/WhatsApp Image 2026-02-10 at 12.48.56.jpeg",
      "./assets/turma_img2.jpeg", 
    ],
    links: {
      ia: "https://pay.hotmart.com/J102529429C?off=u1dn6lqr",
      prof: null, // não usa
    },
  },

  teresina: {
    onlyIA: false,
    hero: "./assets/WhatsApp Image 2026-02-10 at 12.48.58.jpeg",
    covers: {
      ia: "./assets/WhatsApp Image 2026-02-10 at 12.48.56.jpeg",
      prof: "./assets/WhatsApp Image 2026-02-10 at 12.48.58.jpeg",
    },
    turmas: [
      "./assets/WhatsApp Image 2026-02-10 at 12.48.55.jpeg",
      "./assets/WhatsApp Image 2026-02-10 at 12.48.56.jpeg",
      "./assets/turma_img2.jpeg",
      "./assets/turma_img1.jpeg",
    ],
    links: {
      ia: "https://pay.hotmart.com/H103769547I?off=sjlxt6zu",
      prof: "https://pay.hotmart.com/K104372250V?off=toi7e8hi",
    },
  },

  fortaleza: {
    onlyIA: false,
    hero: "./assets/WhatsApp Image 2026-02-10 at 12.48.58.jpeg",
    covers: {
      ia: "./assets/WhatsApp Image 2026-02-10 at 12.48.58.jpeg",
      prof: "./assets/WhatsApp Image 2026-02-10 at 12.49.24 (1).jpeg",
    },
    turmas: [
      "./assets/WhatsApp Image 2026-02-10 at 12.48.55.jpeg",
      "./assets/WhatsApp Image 2026-02-10 at 12.48.56.jpeg",
      "./assets/turma_img2.jpeg",
      "./assets/turma_img1.jpeg",
    ],
    
    links: {
      ia: "https://pay.hotmart.com/D104266233X?off=jk5niv0b",
      prof: "https://pay.hotmart.com/K104372250V?off=g3x038b1",
    },
  },
};

// =========================
// Elementos
// =========================
const cityNameEl = document.querySelector("[data-city-name]");
const cityBtns = document.querySelectorAll("[data-city-select]");

// Hero
const heroImg = document.getElementById("heroImg");
const heroPlaceholder = document.getElementById("heroPlaceholder");

// Cursos
const cursoIA = document.getElementById("curso-ia");
const cursoProfessor = document.getElementById("curso-professor");

// Menu link do Professor (pra não ficar clicável em São Luís)
const navProf = document.getElementById("nav-prof");

// Covers
const coversEls = {
  ia: {
    img: document.getElementById("img-ia"),
    ph: document.getElementById("ph-ia"),
  },
  prof: {
    img: document.getElementById("img-prof"),
    ph: document.getElementById("ph-prof"),
  },
};

// Textos "Na cidade de {cidade}"
const cityLines = {
  ia: document.querySelector('[data-course-cityline="ia"]'),
  prof: document.querySelector('[data-course-cityline="prof"]'),
};

// Links
const linkEls = {
  ia: document.getElementById("link-ia"),
  prof: document.getElementById("link-prof"),
};

// Carousel
const track = document.querySelector("[data-track]");
const btnPrev = document.querySelector("[data-prev]");
const btnNext = document.querySelector("[data-next]");
const dotsWrap = document.querySelector("[data-dots]");
const emptyTurmasEl = document.querySelector("[data-empty-turmas]");

let selectedCity = localStorage.getItem("selectedCity") || "saoluis";

// =========================
// Helpers de imagem
// =========================
function setImage(imgEl, placeholderEl, src, altText) {
  if (!imgEl || !placeholderEl) return;

  if (!src) {
    imgEl.classList.add("is-hidden");
    placeholderEl.classList.remove("is-hidden");
    return;
  }

  imgEl.onload = () => {
    imgEl.classList.remove("is-hidden");
  };

  imgEl.onerror = () => {
    imgEl.classList.add("is-hidden");
    placeholderEl.classList.remove("is-hidden");
  };

  imgEl.src = src;
  if (altText) imgEl.alt = altText;
}

// =========================
// Troca de links por cidade
// =========================
function applyLinks(cityData) {
  if (!cityData?.links) return;

  if (linkEls.ia) {
    linkEls.ia.href = cityData.links.ia || "#";
    linkEls.ia.setAttribute("aria-label", "Inscrever-se em IA na Prática");
  }

  if (linkEls.prof) {
    linkEls.prof.href = cityData.links.prof || "#";
    linkEls.prof.setAttribute(
      "aria-label",
      "Inscrever-se em Professor IA na Prática"
    );
  }
}

// =========================
// Carousel
// =========================
let carouselIndex = 0;

function buildCarousel(images, cityName) {
  if (!track || !dotsWrap) return;

  track.innerHTML = "";
  dotsWrap.innerHTML = "";
  carouselIndex = 0;

  if (!images || !images.length) {
    if (emptyTurmasEl) emptyTurmasEl.style.display = "block";
    return;
  }
  if (emptyTurmasEl) emptyTurmasEl.style.display = "none";

  images.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel__slide";

    const ph = document.createElement("div");
    ph.className = "img-placeholder img-placeholder--slide";
    ph.innerHTML = `<span>Foto da turma (${cityName}) ${String(i + 1).padStart(
      2,
      "0"
    )}</span>`;

    const img = document.createElement("img");
    img.className = "img-real is-hidden";
    img.alt = `Turma ${cityName} ${i + 1}`;

    slide.appendChild(ph);
    slide.appendChild(img);
    track.appendChild(slide);

    setImage(img, ph, src, img.alt);

    // dot
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " is-active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para imagem ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  updateCarousel();
}

function updateCarousel() {
  if (!track) return;
  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("is-active", i === carouselIndex));
}

function goTo(i) {
  const total = track ? track.children.length : 0;
  if (!total) return;
  carouselIndex = (i + total) % total;
  updateCarousel();
}

if (btnPrev) btnPrev.addEventListener("click", () => goTo(carouselIndex - 1));
if (btnNext) btnNext.addEventListener("click", () => goTo(carouselIndex + 1));

// =========================
// Aplicar cidade
// =========================
function applyCity(city) {
  const cityData = DATA[city];
  if (!cityData) return;

  selectedCity = city;
  localStorage.setItem("selectedCity", city);

  // UI seletor
  cityBtns.forEach((btn) => {
    const active = btn.dataset.citySelect === city;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
  });

  const cidade = cityLabel(city);

  if (cityNameEl) cityNameEl.textContent = cidade.name;

  // Mostrar/ocultar curso Professor conforme cidade
  if (cityData.onlyIA) {
    if (cursoProfessor) cursoProfessor.style.display = "none";
    if (navProf) navProf.style.display = "none";
  } else {
    if (cursoProfessor) cursoProfessor.style.display = "";
    if (navProf) navProf.style.display = "";
  }

  // Textos (cidade + endereço + datas)
  if (cityLines.ia) {
    const d = cidade.date_ia ? ` no dia ${cidade.date_ia}` : "";
    cityLines.ia.textContent = `Na cidade de ${cidade.name}, esta turma acontece presencialmente em ${cidade.address}${d}.`;
  }

  if (cityLines.prof && !cityData.onlyIA) {
    cityLines.prof.textContent = `Na cidade de ${cidade.name}, esta turma acontece presencialmente em ${cidade.address}, no dia ${cidade.date_prof}.`;
  }

  // Hero
  setImage(
    heroImg,
    heroPlaceholder,
    cityData.hero,
    `Turma HubPrompt em ${cidade.name}`
  );

  // Capas dos cursos
  setImage(
    coversEls.ia.img,
    coversEls.ia.ph,
    cityData.covers?.ia,
    `Capa IA na Prática - ${cidade.name}`
  );

  // Professor só se existir para cidade
  if (!cityData.onlyIA) {
    setImage(
      coversEls.prof.img,
      coversEls.prof.ph,
      cityData.covers?.prof,
      `Capa Professor IA na Prática - ${cidade.name}`
    );
  }

  // Links
  applyLinks(cityData);

  // Carrossel
  buildCarousel(cityData.turmas || [], cidade.name);
}

// Bind
cityBtns.forEach((btn) => {
  btn.addEventListener("click", () => applyCity(btn.dataset.citySelect));
});

// Init
applyCity(selectedCity);
