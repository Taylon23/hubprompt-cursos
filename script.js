// =========================
// Utilidades
// =========================
document.getElementById("year").textContent = new Date().getFullYear();

function cityLabel(city){
  const map = { saoluis:"São Luís", teresina:"Teresina", fortaleza:"Fortaleza" };
  return map[city] || city;
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
// ✅ ÁREA PRINCIPAL: FOTOS + LINKS (9 links)
// Substitua os links e imagens pelos seus.
// =========================
const DATA = {
  saoluis: {
    hero: "./assets/sl/hero.jpg",
    covers: {
      ia: "./assets/sl/capa-ia.jpg",
      app: "./assets/sl/capa-app.jpg",
      wa: "./assets/sl/capa-wa.jpg",
    },
    turmas: [
      "./assets/sl/turma-01.jpg",
      "./assets/sl/turma-02.jpg",
      "./assets/sl/turma-03.jpg",
    ],
    links: {
      ia: "https://pay.hotmart.com/J102529429C?off=u1dn6lqr%22&bid=1770738742261",
      app: "https://SEU-LINK-AQUI/sl/curso-app",
      wa: "https://SEU-LINK-AQUI/sl/automacao-whatsapp",
    }
  },

  teresina: {
    hero: "./assets/the/hero.jpg",
    covers: {
      ia: "./assets/the/capa-ia.jpg",
      app: "./assets/the/capa-app.jpg",
      wa: "./assets/the/capa-wa.jpg",
    },
    turmas: [
      "./assets/the/turma-01.jpg",
      "./assets/the/turma-02.jpg",
    ],
    links: {
      ia: "https://pay.hotmart.com/H103769547I?off=sjlxt6zu",
      app: "https://SEU-LINK-AQUI/teresina/curso-app",
      wa: "https://SEU-LINK-AQUI/teresina/automacao-whatsapp",
    }
  },

  fortaleza: {
    hero: "./assets/for/hero.jpg",
    covers: {
      ia: "./assets/for/capa-ia.jpg",
      app: "./assets/for/capa-app.jpg",
      wa: "./assets/for/capa-wa.jpg",
    },
    turmas: [
      "./assets/for/turma-01.jpg",
      "./assets/for/turma-02.jpg",
      "./assets/for/turma-03.jpg",
      "./assets/for/turma-04.jpg",
    ],
    links: {
      ia: "https://pay.hotmart.com/D104266233X?off=jk5niv0b%22&bid=1770738852362",
      app: "https://SEU-LINK-AQUI/fortaleza/curso-app",
      wa: "https://SEU-LINK-AQUI/fortaleza/automacao-whatsapp",
    }
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

// Covers
const coversEls = {
  ia: { img: document.getElementById("img-ia"), ph: document.getElementById("ph-ia") },
  app:{ img: document.getElementById("img-app"), ph: document.getElementById("ph-app") },
  wa: { img: document.getElementById("img-wa"), ph: document.getElementById("ph-wa") },
};

// Textos "Na cidade de {cidade}"
const cityLines = {
  ia: document.querySelector('[data-course-cityline="ia"]'),
  app: document.querySelector('[data-course-cityline="app"]'),
  wa: document.querySelector('[data-course-cityline="wa"]'),
};

// ✅ Links “Ver mais” (3 botões no HTML)
const linkEls = {
  ia: document.getElementById("link-ia"),
  app: document.getElementById("link-app"),
  wa: document.getElementById("link-wa"),
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
function setImage(imgEl, placeholderEl, src, altText){
  if (!imgEl || !placeholderEl) return;

  if (!src) {
    imgEl.classList.add("is-hidden");
    placeholderEl.classList.remove("is-hidden");
    return;
  }

  imgEl.onload = () => {
    imgEl.classList.remove("is-hidden");
    placeholderEl.classList.add("is-hidden");
  };

  imgEl.onerror = () => {
    imgEl.classList.add("is-hidden");
    placeholderEl.classList.remove("is-hidden");
  };

  imgEl.src = src;
  if (altText) imgEl.alt = altText;
}

// =========================
// ✅ Troca de links por cidade (9 links)
// =========================
function applyLinks(cityData){
  if (!cityData?.links) return;

  // IA
  if (linkEls.ia) {
    linkEls.ia.href = cityData.links.ia || "#";
    linkEls.ia.setAttribute("aria-label", "Ver mais sobre IA na Prática");
  }

  // App
  if (linkEls.app) {
    linkEls.app.href = cityData.links.app || "#";
    linkEls.app.setAttribute("aria-label", "Ver mais sobre Curso de App com IA");
  }

  // WhatsApp
  if (linkEls.wa) {
    linkEls.wa.href = cityData.links.wa || "#";
    linkEls.wa.setAttribute("aria-label", "Ver mais sobre Automação de WhatsApp");
  }
}

// =========================
// Carousel
// =========================
let carouselIndex = 0;

function buildCarousel(images, cityName){
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
    ph.innerHTML = `<span>Foto da turma (${cityName}) ${String(i+1).padStart(2,"0")}</span>`;

    const img = document.createElement("img");
    img.className = "img-real is-hidden";
    img.alt = `Turma ${cityName} ${i+1}`;

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

function updateCarousel(){
  if (!track) return;
  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("is-active", i === carouselIndex));
}

function goTo(i){
  const total = track ? track.children.length : 0;
  if (!total) return;
  carouselIndex = (i + total) % total;
  updateCarousel();
}

if (btnPrev) btnPrev.addEventListener("click", () => goTo(carouselIndex - 1));
if (btnNext) btnNext.addEventListener("click", () => goTo(carouselIndex + 1));

// =========================
// Aplicar cidade (muda textos + imagens + links + carrossel)
// =========================
function applyCity(city){
  const cityData = DATA[city];
  if (!cityData) return;

  selectedCity = city;
  localStorage.setItem("selectedCity", city);

  // UI seletor
  cityBtns.forEach(btn => {
    const active = btn.dataset.citySelect === city;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
  });

  // Nome da cidade
  const cName = cityLabel(city);
  if (cityNameEl) cityNameEl.textContent = cName;

  // Textos dos cursos (mesma descrição, muda só cidade)
  if (cityLines.ia) cityLines.ia.textContent = `Na cidade de ${cName}, esta turma acontece presencialmente com foco em aplicação real.`;
  if (cityLines.app) cityLines.app.textContent = `Na cidade de ${cName}, esta turma acontece presencialmente com foco em estrutura e escala.`;
  if (cityLines.wa) cityLines.wa.textContent = `Na cidade de ${cName}, esta turma acontece presencialmente com foco em atendimento e conversão.`;

  // Hero (opcional por cidade)
  setImage(heroImg, heroPlaceholder, cityData.hero, `Turma HubPrompt em ${cName}`);

  // Capas dos cursos
  setImage(coversEls.ia.img, coversEls.ia.ph, cityData.covers?.ia, `Capa IA na Prática - ${cName}`);
  setImage(coversEls.app.img, coversEls.app.ph, cityData.covers?.app, `Capa Curso de App - ${cName}`);
  setImage(coversEls.wa.img, coversEls.wa.ph, cityData.covers?.wa, `Capa Automação WhatsApp - ${cName}`);

  // ✅ Links dos cursos (9 links)
  applyLinks(cityData);

  // Carrossel
  buildCarousel(cityData.turmas || [], cName);
}

// Bind
cityBtns.forEach(btn => {
  btn.addEventListener("click", () => applyCity(btn.dataset.citySelect));
});

// Init
applyCity(selectedCity);
