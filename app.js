/* ============================================
   ÁLBUM MUNDIAL 2026 — APP LOGIC
   ============================================ */

// ============================================
// COUNTRY METADATA
// ============================================
const COUNTRY_META = {
    MX: { name: "México", flag: "🇲🇽", colors: ["#006847", "#CE1126"], bg: "#4CBBB9" },
    AR: { name: "Argentina", flag: "🇦🇷", colors: ["#74ACDF", "#F6B40E"], bg: "#74ACDF" },
    US: { name: "Estados Unidos", flag: "🇺🇸", colors: ["#B31942", "#0A3161"], bg: "#0A3161" },
    CL: { name: "Chile", flag: "🇨🇱", colors: ["#D52B1E", "#0039A6"], bg: "#D52B1E" },
    CO: { name: "Colombia", flag: "🇨🇴", colors: ["#FCD116", "#003893"], bg: "#FCD116" },
    ES: { name: "España", flag: "🇪🇸", colors: ["#AA151B", "#F1BF00"], bg: "#AA151B" },
    BO: { name: "Bolivia", flag: "🇧🇴", colors: ["#007934", "#D52B1E"], bg: "#007934" },
    VE: { name: "Venezuela", flag: "🇻🇪", colors: ["#CF142B", "#00247D"], bg: "#00247D" },
    PE: { name: "Perú", flag: "🇵🇪", colors: ["#D91023", "#FFFFFF"], bg: "#D91023" },
    EC: { name: "Ecuador", flag: "🇪🇨", colors: ["#FFD100", "#034EA2"], bg: "#034EA2" },
    GT: { name: "Guatemala", flag: "🇬🇹", colors: ["#4997D0", "#FFFFFF"], bg: "#4997D0" },
    PY: { name: "Paraguay", flag: "🇵🇾", colors: ["#D52B1E", "#0038A8"], bg: "#D52B1E" },
    NI: { name: "Nicaragua", flag: "🇳🇮", colors: ["#0067C6", "#FFFFFF"], bg: "#0067C6" },
    DO: { name: "Rep. Dominicana", flag: "🇩🇴", colors: ["#002D62", "#CE1126"], bg: "#002D62" },
    HN: { name: "Honduras", flag: "🇭🇳", colors: ["#0073CF", "#FFFFFF"], bg: "#0073CF" },
    PR: { name: "Puerto Rico", flag: "🇵🇷", colors: ["#ED0A3F", "#0050F0"], bg: "#0050F0" },
    CR: { name: "Costa Rica", flag: "🇨🇷", colors: ["#002B7F", "#CE1126"], bg: "#CE1126" },
    SV: { name: "El Salvador", flag: "🇸🇻", colors: ["#0F47AF", "#FFFFFF"], bg: "#0F47AF" },
    PA: { name: "Panamá", flag: "🇵🇦", colors: ["#DA121A", "#003DA5"], bg: "#003DA5" },
    UY: { name: "Uruguay", flag: "🇺🇾", colors: ["#001489", "#F7D917"], bg: "#001489" },
    BR: { name: "Brasil", flag: "🇧🇷", colors: ["#009739", "#FEDD00"], bg: "#009739" },
    IT: { name: "Italia", flag: "🇮🇹", colors: ["#008C45", "#CD212A"], bg: "#008C45" },
    BE: { name: "Bélgica", flag: "🇧🇪", colors: ["#000000", "#FDDA24"], bg: "#000000" },
    SA: { name: "Arabia Saudita", flag: "🇸🇦", colors: ["#006C35", "#FFFFFF"], bg: "#006C35" },
    DE: { name: "Alemania", flag: "🇩🇪", colors: ["#000000", "#DD0000"], bg: "#DD0000" },
    KR: { name: "Corea del Sur", flag: "🇰🇷", colors: ["#003478", "#C60C30"], bg: "#003478" },
    IN: { name: "India", flag: "🇮🇳", colors: ["#FF9933", "#138808"], bg: "#138808" },
    RO: { name: "Rumania", flag: "🇷🇴", colors: ["#002B7F", "#FCD116"], bg: "#002B7F" },
    SE: { name: "Suecia", flag: "🇸🇪", colors: ["#006AA7", "#FECC02"], bg: "#006AA7" },
    GR: { name: "Grecia", flag: "🇬🇷", colors: ["#0D5EAF", "#FFFFFF"], bg: "#0D5EAF" },
    PK: { name: "Pakistán", flag: "🇵🇰", colors: ["#01411C", "#FFFFFF"], bg: "#01411C" },
    UA: { name: "Ucrania", flag: "🇺🇦", colors: ["#005BBB", "#FFD500"], bg: "#005BBB" },
    ID: { name: "Indonesia", flag: "🇮🇩", colors: ["#CE1126", "#FFFFFF"], bg: "#CE1126" },
    VN: { name: "Vietnam", flag: "🇻🇳", colors: ["#DA251D", "#FFFF00"], bg: "#DA251D" },
    AW: { name: "Aruba", flag: "🇦🇼", colors: ["#009BDE", "#F9D616"], bg: "#009BDE" },
    TT: { name: "Trinidad y Tobago", flag: "🇹🇹", colors: ["#CE1126", "#000000"], bg: "#CE1126" },
    ORG: { name: "La Organización", flag: "🏆", colors: ["#1A1A1A", "#D4AF37"], bg: "#1A1A1A" },
};

function getCountryMeta(code) {
    return COUNTRY_META[code] || { name: code, flag: "🏳️", colors: ["#555555", "#888888"], bg: "#555555" };
}

// ============================================
// CONSTANTS
// ============================================
const CARDS_PER_SPREAD = 21; // 10 izquierda + 11 derecha
const CARDS_LEFT = 10;
const CARDS_RIGHT = 11;
const AVATAR_BATCH_SIZE = 100;

// ============================================
// COUNTRY TEMPLATES (plantillas y fondos PNG)
// ============================================
const COUNTRY_TEMPLATES = {
    MX: { plantilla: 'img/PlantillaMéxico.png', fondo: 'img/fondo Mex.png' },
    AR: { plantilla: 'img/cromo_ARG.png', fondo: 'img/fondo_AR.png' },
    US: { plantilla: 'img/Plantilla_US.png', fondo: 'img/Fondo_US.png' },
    CL: { plantilla: 'img/Plantilla_Chile.png', fondo: 'img/Fondo Chile.png' },
    CO: { plantilla: 'img/Plantilla_col.png', fondo: 'img/Fondo_Col.png' },
    ES: { plantilla: 'img/Plantilla spain.png', fondo: 'img/Fondo Spain.png' },
    BO: { plantilla: 'img/Plantilla Bolivia.png', fondo: 'img/Fondo Bolivia.png' },
    VE: { plantilla: 'img/Plantilla Venezuela.png', fondo: 'img/Fondo Venezuela.png' },
    PE: { plantilla: 'img/Plantilla Peru.png', fondo: 'img/Fondo Peru.png' },
    EC: { plantilla: 'img/Plantilla_EC.png', fondo: 'img/fondo Ecuador.png' },
    GT: { plantilla: 'img/plantilla guatemala.png', fondo: 'img/fondo guatemala.png' },
    PY: { plantilla: 'img/Plantilla_PY.png', fondo: 'img/Fondo_PY.png' },
    NI: { plantilla: 'img/Plantilla_Nicaragua.png', fondo: 'img/Fondo_Nicaragua.png' },
    DO: { plantilla: 'img/Plantilla RD.png', fondo: 'img/Fondo RD.png' },
    HN: { plantilla: 'img/Plantilla honduras.png', fondo: 'img/fondo honduras.png' },
    PR: { plantilla: 'img/Plantilla PR.png', fondo: 'img/Fondo PR.png' },
    SV: { plantilla: 'img/Plantilla SV.png', fondo: 'img/Fondo SV.png' },
    PA: { plantilla: 'img/plantilla panama.png', fondo: 'img/fondo panama.png' },
};

// ============================================
// STATE
// ============================================
let allPages = [];
let currentPage = 0;
let totalPages = 0;
let currentFilter = null; // null = all countries
let avatarCache = {};

// ============================================
// DOM ELEMENTS
// ============================================
const gridLeft = document.getElementById('grid-left');
const gridRight = document.getElementById('grid-right');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageIndicator = document.getElementById('page-indicator');
const playerCount = document.getElementById('player-count');
const countryCountEl = document.getElementById('country-count');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const filterBtn = document.getElementById('filter-btn');
const filterMenu = document.getElementById('filter-menu');
const filterLabel = document.getElementById('filter-label');
const modalOverlay = document.getElementById('modal-overlay');
const modalCard = document.getElementById('modal-card');
const modalClose = document.getElementById('modal-close');
const loadingScreen = document.getElementById('loading-screen');
const pageLeft = document.getElementById('page-left');
const pageRight = document.getElementById('page-right');

// ============================================
// DATA PROCESSING
// ============================================
function buildPages(data, filterCountry) {
    const pages = [];
    const countries = filterCountry ? [filterCountry] : data.countries;

    for (const country of countries) {
        const players = data.players[country];
        if (!players || players.length === 0) continue;

        let i = 0;
        while (i < players.length) {
            const page = { country, cards: [] };
            for (let j = 0; j < CARDS_PER_SPREAD && i < players.length; j++, i++) {
                page.cards.push(players[i]);
            }
            pages.push(page);
        }
    }

    return pages;
}

// ============================================
// AVATAR LOADING
// ============================================
let avatarPromises = {};

async function fetchAvatars(userIds) {
    const uncached = userIds.filter(id => !avatarCache[id] && !avatarPromises[id]);
    if (uncached.length === 0) return;

    // Batch into groups of 100
    for (let i = 0; i < uncached.length; i += AVATAR_BATCH_SIZE) {
        const batch = uncached.slice(i, i + AVATAR_BATCH_SIZE);
        const idsParam = batch.join(',');

        const fetchPromise = (async () => {
            let success = false;
            let attempts = 0;
            let retries = 5;

            while (!success && attempts < retries) {
                try {
                    const proxyUrl = `/api/avatar?userIds=${idsParam}`;
                    const resp = await fetch(proxyUrl);

                    if (resp.ok) {
                        const json = await resp.json();
                        if (json.data) {
                            for (const item of json.data) {
                                if (item.state === 'Completed' && item.imageUrl) {
                                    avatarCache[item.targetId] = item.imageUrl;
                                }
                            }
                        }
                        success = true;
                    } else {
                        throw new Error(`HTTP ${resp.status}`);
                    }
                } catch (err) {
                    attempts++;
                    console.warn(`Error fetching batch (attempt ${attempts}/${retries}):`, err);
                    if (attempts < retries) {
                        await new Promise(res => setTimeout(res, 1500 * attempts));
                    }
                }
            }

            if (!success) {
                for (const id of batch) {
                    delete avatarPromises[id];
                }
            }
        })();

        for (const id of batch) {
            avatarPromises[id] = fetchPromise;
        }
    }
}

async function setAvatarImage(imgEl, userId) {
    if (avatarCache[userId]) {
        imgEl.src = avatarCache[userId];
        imgEl.classList.remove('loading');
        imgEl.classList.add('loaded');
        return;
    }

    imgEl.classList.add('loading');

    let localAttempts = 0;
    while (!avatarCache[userId] && localAttempts < 8) {
        if (!avatarPromises[userId]) {
            fetchAvatars([userId]);
        }

        try {
            await avatarPromises[userId];
        } catch (e) { }

        if (avatarCache[userId]) {
            imgEl.src = avatarCache[userId];
            imgEl.classList.remove('loading');
            imgEl.classList.add('loaded');
            return;
        }

        localAttempts++;
        await new Promise(res => setTimeout(res, 1000));
    }

    // Fallback: si despues de todos los intentos no cargó, mostrar avatar genérico
    imgEl.onerror = null;
    imgEl.src = 'https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/150/150/AvatarHeadshot/Png';
    imgEl.classList.remove('loading');
    imgEl.classList.add('loaded');
    imgEl.classList.add('is-fallback');
}

// ============================================
// CARD RENDERING
// ============================================
function createCardElement(player, country) {
    const meta = getCountryMeta(country);
    const [c1, c2] = meta.colors;
    const tpl = COUNTRY_TEMPLATES[country]; // null si no tiene plantilla

    const card = document.createElement('div');
    card.className = 'card-slot';
    if (tpl) card.classList.add('card-has-template');
    card.setAttribute('data-player-id', player.id);

    // Background gradient (oculto si hay plantilla via CSS)
    const bg = document.createElement('div');
    bg.className = 'card-bg';
    bg.style.background = `linear-gradient(145deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`;
    card.appendChild(bg);

    // FIFA 26 watermark (oculto si hay plantilla via CSS)
    const watermark = document.createElement('div');
    watermark.className = 'card-watermark';
    watermark.innerHTML = `<span class="wm-26">26</span><span class="wm-fifa">FIFA</span>`;
    card.appendChild(watermark);

    // Plantilla PNG (si existe para este pais)
    if (tpl) {
        const plantillaImg = document.createElement('img');
        plantillaImg.className = 'card-plantilla';
        plantillaImg.src = tpl.plantilla;
        plantillaImg.alt = '';
        plantillaImg.draggable = false;
        card.appendChild(plantillaImg);
    }

    // Avatar
    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'card-avatar';
    const img = document.createElement('img');
    img.alt = player.d || player.u || `Jugador ${player.id}`;
    img.classList.add('loading');

    // Auto-retry si la imagen falla al cargar por timeout o error de red
    img.onerror = function () {
        let retries = parseInt(img.getAttribute('data-retries') || '0');
        if (retries < 3) {
            img.setAttribute('data-retries', retries + 1);
            setTimeout(() => {
                if (!img.src) return;
                let url = img.src;
                url = url.replace(/([?&])retry=\d+/, '');
                url += (url.includes('?') ? '&' : '?') + 'retry=' + Date.now();
                img.src = url;
            }, 2000);
        } else {
            img.onerror = null;
            img.src = 'https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/150/150/AvatarHeadshot/Png';
            img.classList.remove('loading');
            img.classList.add('loaded');
            img.classList.add('is-fallback');
        }
    };

    avatarWrap.appendChild(img);
    card.appendChild(avatarWrap);

    // Load avatar
    setAvatarImage(img, player.id);

    // Flag emoji (oculto si hay plantilla via CSS, ya viene en la imagen)
    const flag = document.createElement('div');
    flag.className = 'card-flag';
    flag.textContent = meta.flag;
    card.appendChild(flag);

    // Name bar
    const nameBar = document.createElement('div');
    nameBar.className = 'card-name-bar';
    const nameText = document.createElement('div');
    nameText.className = 'card-name';
    const displayName = player.d || player.u || `Jugador_${player.id}`;
    nameText.textContent = displayName;
    nameBar.appendChild(nameText);
    card.appendChild(nameBar);

    // Click to enlarge
    card.addEventListener('click', () => openModal(player, country));

    return card;
}

function createEmptySlot() {
    const el = document.createElement('div');
    el.className = 'card-empty';
    return el;
}

function createCountryLabel(country) {
    const meta = getCountryMeta(country);
    const el = document.createElement('div');
    el.className = 'card-country-label';
    el.innerHTML = `
        <div class="country-label-flag">${meta.flag}</div>
        <div class="country-label-code">${country}</div>
        <div class="country-label-name">${meta.name}</div>
    `;
    return el;
}

// ============================================
// PAGE RENDERING
// ============================================
// PAGE RENDERING
// ============================================
async function renderPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= allPages.length) return;

    currentPage = pageIndex;
    const pageData = allPages[pageIndex];
    const meta = getCountryMeta(pageData.country);

    // Fondo de las paginas (solo gradiente de color del pais)
    pageLeft.style.background = `linear-gradient(135deg, #f5f0e8 0%, ${meta.bg}15 100%)`;
    pageRight.style.background = `linear-gradient(225deg, #f5f0e8 0%, ${meta.bg}15 100%)`;

    // Clear grids
    gridLeft.innerHTML = '';
    gridRight.innerHTML = '';

    // Add transition animation
    gridLeft.classList.remove('transitioning');
    gridRight.classList.remove('transitioning');
    void gridLeft.offsetWidth; // Force reflow
    gridLeft.classList.add('transitioning');
    gridRight.classList.add('transitioning');

    // Cargar avatares en batch para esta pagina
    const userIds = pageData.cards.map(p => p.id);
    fetchAvatars(userIds);

    // LEFT PAGE: 2 vacios + hasta 10 cartas = 12 celdas (mismo que antes)
    gridLeft.appendChild(createEmptySlot());
    gridLeft.appendChild(createEmptySlot());
    for (let i = 0; i < CARDS_LEFT; i++) {
        if (i < pageData.cards.length) {
            gridLeft.appendChild(createCardElement(pageData.cards[i], pageData.country));
        } else {
            gridLeft.appendChild(createEmptySlot());
        }
    }

    // RIGHT PAGE: hasta 11 cartas + etiqueta de pais
    for (let i = CARDS_LEFT; i < CARDS_PER_SPREAD; i++) {
        if (i < pageData.cards.length) {
            gridRight.appendChild(createCardElement(pageData.cards[i], pageData.country));
        } else {
            gridRight.appendChild(createEmptySlot());
        }
    }
    gridRight.appendChild(createCountryLabel(pageData.country));

    // Update nav buttons
    btnPrev.disabled = currentPage <= 0;
    btnNext.disabled = currentPage >= allPages.length - 1;

    // Update footer
    pageIndicator.textContent = `Página ${currentPage + 1} / ${allPages.length}`;

    // Segunda revisada: revisar imagenes rotas solo en la pagina actual
    if (window.brokenImagesTimeout) clearTimeout(window.brokenImagesTimeout);
    window.brokenImagesTimeout = setTimeout(checkBrokenImages, 2500);
}

// ============================================
// MODAL
// ============================================
function openModal(player, country) {
    // Remove previous card if any
    const existingCard = modalCard.querySelector('.card-slot');
    if (existingCard) existingCard.remove();
    const existingInfo = modalCard.querySelector('.modal-info');
    if (existingInfo) existingInfo.remove();
    const existingBtn = modalCard.querySelector('.download-btn');
    if (existingBtn) existingBtn.remove();

    // Build enlarged card using the exact same logic as the grid
    const card = createCardElement(player, country);
    card.id = 'modal-card-inner';
    // Remove the click listener that createCardElement adds, so clicking the modal doesn't re-open it
    const newCard = card.cloneNode(true);
    newCard.id = 'modal-card-inner';

    modalCard.insertBefore(card, modalCard.firstChild);

    // Botón de descarga
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar cromo`;
    downloadBtn.addEventListener('click', () => downloadCard(card, player.d || player.u || `Jugador_${player.id}`));
    modalCard.appendChild(downloadBtn);

    modalOverlay.classList.add('active');
}

// ============================================
// AVATAR CLIP-PATH FIX FOR HTML2CANVAS
// html2canvas doesn't support clip-path: inset(), so we convert it to
// an equivalent overflow:hidden wrapper before rendering.
// ============================================
function fixAvatarClipForHtml2Canvas(cardClone) {
    const avatarEl = cardClone.querySelector('.card-avatar');
    if (!avatarEl) return;

    // --- FIX: DOM ORDER / Z-INDEX ---
    // html2canvas renders elements in DOM order and doesn't always respect z-index.
    // Move the avatar to be the last child so it paints on top of everything.
    const nameBar = cardClone.querySelector('.card-name-bar');
    if (nameBar && cardClone.contains(avatarEl)) {
        cardClone.insertBefore(avatarEl, nameBar);
    }

    const computedClip = window.getComputedStyle(avatarEl).clipPath;
    if (!computedClip || computedClip === 'none') return;

    // Parse inset values — browsers may report in px or %
    const match = computedClip.match(/inset\(([^)]+)\)/);
    if (!match) return;

    const parts = match[1].trim().split(/\s+/);
    if (parts.length < 4) return;

    const W = avatarEl.offsetWidth;
    let H = avatarEl.offsetHeight;
    // height:auto (from configurador) makes offsetHeight 0 — fall back to the img's rendered height
    if (H === 0) {
        const imgFallback = avatarEl.querySelector('img');
        if (imgFallback) H = imgFallback.offsetHeight || Math.round(W * (imgFallback.naturalHeight || imgFallback.naturalWidth || 1) / (imgFallback.naturalWidth || imgFallback.naturalHeight || 1));
    }
    if (W === 0 || H === 0) return;

    function parseVal(v, dim) {
        if (v.endsWith('%'))  return parseFloat(v) / 100 * dim;
        if (v.endsWith('px')) return parseFloat(v);
        return parseFloat(v); // assume px
    }

    const cropT = parseVal(parts[0], H);
    const cropR = parseVal(parts[1], W);
    const cropB = parseVal(parts[2], H);
    const cropL = parseVal(parts[3], W);

    const img = avatarEl.querySelector('img');
    if (!img) return;

    // Freeze img dimensions in pixels before re-parenting
    const imgW = img.offsetWidth  || W * 1.2;
    const imgH = img.offsetHeight || H;

    // Inner div that simulates the inset crop via overflow:hidden
    const inner = document.createElement('div');
    inner.style.cssText = `
        position: absolute;
        top: ${cropT}px;
        left: ${cropL}px;
        width: ${Math.max(0, W - cropL - cropR)}px;
        height: ${Math.max(0, H - cropT - cropB)}px;
        overflow: hidden;
    `;

    // Pin img so it keeps the same visual appearance
    img.style.cssText = `
        position: absolute;
        top: ${-cropT}px;
        left: ${-cropL}px;
        width: ${imgW}px;
        height: ${imgH}px;
        object-fit: cover;
        object-position: center top;
        opacity: 1;
    `;

    // Reparent img → inner → avatarEl
    if (img.parentNode) img.parentNode.removeChild(img);
    inner.appendChild(img);
    avatarEl.appendChild(inner);

    // Remove the clip-path so html2canvas doesn't try (and fail) to apply it
    avatarEl.style.clipPath = 'none';
}

// Descarga una imagen (aunque sea de otro dominio con CORS) y la convierte a
// data URL base64. Así html2canvas puede dibujarla sin problemas de CORS/caché.
async function imageUrlToDataURL(url) {
    const resp = await fetch(url, { mode: 'cors', cache: 'reload' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const blob = await resp.blob();
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function downloadCard(cardEl, playerName) {
    const btn = modalCard.querySelector('.download-btn');
    if (btn) { btn.textContent = 'Generando...'; btn.disabled = true; }

    try {
        const TARGET_W = 600;
        const TARGET_H = Math.round(600 * 1453 / 1082);

        // Read configurator settings (same keys saved by configurador.html)
        const DEF_CFG = {
            avatarSize: 90, avatarX: -8, avatarY: 0,
            cropTop: 0, cropBottom: 0, cropLeft: 0, cropRight: 0,
            nameY: 86, nameX: 5, nameWidth: 75, nameFontSize: 7,
        };
        let cfg = { ...DEF_CFG };
        try {
            const saved = localStorage.getItem('cromo-configurator');
            if (saved) cfg = { ...DEF_CFG, ...JSON.parse(saved) };
        } catch (e) {}

        const loadImage = (src, crossOrigin) => new Promise((resolve, reject) => {
            const im = new Image();
            if (crossOrigin) im.crossOrigin = crossOrigin;
            im.onload = () => resolve(im);
            im.onerror = () => reject(new Error('Load failed'));
            im.src = src;
        });

        // Gather image sources
        const plantillaEl  = cardEl.querySelector('.card-plantilla');
        const plantillaSrc = plantillaEl ? plantillaEl.src : null;

        const avatarImgEl = cardEl.querySelector('.card-avatar img');
        let avatarSrc = avatarImgEl ? avatarImgEl.src : null;

        // Convert external avatar to data URL to avoid CORS-cache problems
        if (avatarSrc && /^https?:\/\//i.test(avatarSrc)) {
            try { avatarSrc = await imageUrlToDataURL(avatarSrc); }
            catch (e) { console.warn('CORS dataURL fallback failed:', e); }
        }

        // Load both images in parallel
        const [plantImg, avatarImg] = await Promise.all([
            plantillaSrc ? loadImage(plantillaSrc, 'anonymous') : Promise.resolve(null),
            avatarSrc    ? loadImage(avatarSrc)                 : Promise.resolve(null),
        ]);

        // Build output canvas
        const out = document.createElement('canvas');
        out.width  = TARGET_W;
        out.height = TARGET_H;
        const ctx  = out.getContext('2d');

        // Layer 1 – background
        if (plantImg) {
            ctx.drawImage(plantImg, 0, 0, TARGET_W, TARGET_H);
        } else {
            // No template: draw the gradient from .card-bg
            const bgEl  = cardEl.querySelector('.card-bg');
            const colors = bgEl
                ? (bgEl.style.background.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/g) || [])
                : [];
            if (colors.length >= 2) {
                const ang = 145 * Math.PI / 180;
                const d   = Math.hypot(TARGET_W, TARGET_H);
                const grd = ctx.createLinearGradient(
                    TARGET_W/2 - Math.cos(ang)*d/2, TARGET_H/2 - Math.sin(ang)*d/2,
                    TARGET_W/2 + Math.cos(ang)*d/2, TARGET_H/2 + Math.sin(ang)*d/2
                );
                grd.addColorStop(0,   colors[0]);
                grd.addColorStop(0.5, colors[1]);
                grd.addColorStop(1,   colors[0]);
                ctx.fillStyle = grd;
            } else {
                ctx.fillStyle = '#1a1a2e';
            }
            ctx.fillRect(0, 0, TARGET_W, TARGET_H);
        }

        // Layer 2 – avatar with crop applied via canvas clipping
        if (avatarImg) {
            const nw = avatarImg.naturalWidth  || 1;
            const nh = avatarImg.naturalHeight || 1;

            const avatarW = TARGET_W * cfg.avatarSize / 100;
            const avatarH = Math.round(nh * avatarW / nw);
            const posX    = TARGET_W * cfg.avatarX / 100;
            const posY    = TARGET_H * cfg.avatarY / 100;

            const cropT = avatarH * cfg.cropTop    / 100;
            const cropB = avatarH * cfg.cropBottom / 100;
            const cropL = avatarW * cfg.cropLeft   / 100;
            const cropR = avatarW * cfg.cropRight  / 100;

            ctx.save();
            ctx.beginPath();
            ctx.rect(
                posX + cropL,
                posY + cropT,
                Math.max(0, avatarW - cropL - cropR),
                Math.max(0, avatarH - cropT - cropB)
            );
            ctx.clip();
            ctx.drawImage(avatarImg, posX, posY, avatarW, avatarH);
            ctx.restore();
        }

        // Layer 3 – player name
        const nameEl   = cardEl.querySelector('.card-name');
        const nameText = (nameEl ? nameEl.textContent : playerName || '').toUpperCase();
        const fontSize = Math.round(TARGET_H * cfg.nameFontSize / 100);
        const textCX   = TARGET_W * (cfg.nameX + cfg.nameWidth / 2) / 100;
        // nameY% = top of the name-bar div; base CSS gives it height: 9% and
        // flex align-items:center, so the text center is at nameY% + 4.5%
        const textY    = TARGET_H * (cfg.nameY / 100 + 0.045);

        try { await document.fonts.load(`900 ${fontSize}px Outfit`); } catch (e) {}

        ctx.save();
        ctx.font          = `900 ${fontSize}px Outfit, Arial, sans-serif`;
        ctx.fillStyle     = '#ffffff';
        ctx.textAlign     = 'center';
        ctx.textBaseline  = 'middle';
        ctx.shadowColor   = 'rgba(0,0,0,0.85)';
        ctx.shadowBlur    = 4;
        ctx.shadowOffsetY = 1;
        ctx.fillText(nameText, textCX, textY);
        ctx.restore();

        const link = document.createElement('a');
        link.download = `cromo_${playerName}.png`;
        link.href = out.toDataURL('image/png');
        link.click();

    } catch (e) {
        console.error('Error al generar imagen:', e);
        alert('No se pudo generar la imagen.');
    } finally {
        if (btn) {
            btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar cromo`;
            btn.disabled = false;
        }
    }
}


function closeModal() {
    modalOverlay.classList.remove('active');
}

// ============================================
// SEARCH
// ============================================
let searchTimeout = null;

function performSearch(query) {
    if (!query || query.length < 2) {
        searchResults.classList.remove('active');
        return;
    }

    const lowerQ = query.toLowerCase();
    const results = [];

    for (const country of ALBUM_DATA.countries) {
        for (const player of ALBUM_DATA.players[country]) {
            const name = (player.d || player.u || '').toLowerCase();
            const id = String(player.id);

            if (name.includes(lowerQ) || id.includes(query)) {
                results.push({ player, country });
                if (results.length >= 15) break;
            }
        }
        if (results.length >= 15) break;
    }

    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item"><span class="result-name">Sin resultados</span></div>';
        searchResults.classList.add('active');
        return;
    }

    for (const { player, country } of results) {
        const meta = getCountryMeta(country);
        const item = document.createElement('div');
        item.className = 'search-result-item';

        const avatarImg = document.createElement('img');
        avatarImg.alt = '';
        setAvatarImage(avatarImg, player.id);
        item.appendChild(avatarImg);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'result-name';
        nameSpan.textContent = player.d || player.u || `Jugador_${player.id}`;
        item.appendChild(nameSpan);

        const countrySpan = document.createElement('span');
        countrySpan.className = 'result-country';
        countrySpan.textContent = `${meta.flag} ${country}`;
        item.appendChild(countrySpan);

        item.addEventListener('click', () => {
            searchResults.classList.remove('active');
            searchInput.value = '';
            openModal(player, country);
        });

        searchResults.appendChild(item);
    }

    searchResults.classList.add('active');
}

// ============================================
// FILTER
// ============================================
function applyFilter(country) {
    currentFilter = country;
    const meta = country ? getCountryMeta(country) : null;
    filterLabel.textContent = country ? `${meta.flag} ${meta.name}` : 'Todos los países';
    filterMenu.classList.remove('active');

    allPages = buildPages(ALBUM_DATA, currentFilter);
    totalPages = allPages.length;
    currentPage = 0;

    updateStats();

    if (allPages.length > 0) {
        renderPage(0);
    } else {
        gridLeft.innerHTML = '';
        gridRight.innerHTML = '';
    }
}

function buildFilterMenu() {
    // "All" option
    const allOpt = document.createElement('div');
    allOpt.className = 'filter-option active';
    allOpt.innerHTML = `<span>🌎 Todos los países</span><span class="filter-count">${ALBUM_DATA.totalPlayers}</span>`;
    allOpt.addEventListener('click', () => {
        document.querySelectorAll('.filter-option').forEach(o => o.classList.remove('active'));
        allOpt.classList.add('active');
        applyFilter(null);
    });
    filterMenu.appendChild(allOpt);

    // Country options sorted by count
    for (const country of ALBUM_DATA.countries) {
        const meta = getCountryMeta(country);
        const count = ALBUM_DATA.players[country].length;

        const opt = document.createElement('div');
        opt.className = 'filter-option';
        opt.innerHTML = `<span>${meta.flag} ${meta.name}</span><span class="filter-count">${count}</span>`;
        opt.addEventListener('click', () => {
            document.querySelectorAll('.filter-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            applyFilter(country);
        });
        filterMenu.appendChild(opt);
    }
}

// ============================================
// STATS
// ============================================
function updateStats() {
    const totalPlayers = currentFilter
        ? ALBUM_DATA.players[currentFilter].length
        : ALBUM_DATA.totalPlayers;
    const totalCountries = currentFilter ? 1 : ALBUM_DATA.countries.length;

    playerCount.textContent = `${totalPlayers} jugadores`;
    countryCountEl.textContent = `${totalCountries} países`;
    pageIndicator.textContent = `Página ${currentPage + 1} / ${allPages.length || 1}`;
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Navigation
    btnPrev.addEventListener('click', () => {
        if (currentPage > 0) renderPage(currentPage - 1);
    });

    btnNext.addEventListener('click', () => {
        if (currentPage < allPages.length - 1) renderPage(currentPage + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;

        if (e.key === 'ArrowLeft' && currentPage > 0) {
            renderPage(currentPage - 1);
        } else if (e.key === 'ArrowRight' && currentPage < allPages.length - 1) {
            renderPage(currentPage + 1);
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => performSearch(e.target.value.trim()), 200);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            performSearch(searchInput.value.trim());
        }
    });

    // Close search on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#search-box')) {
            searchResults.classList.remove('active');
        }
        if (!e.target.closest('#country-filter')) {
            filterMenu.classList.remove('active');
        }
    });

    // Filter toggle
    filterBtn.addEventListener('click', () => {
        filterMenu.classList.toggle('active');
    });

    // Modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// ============================================
// SECOND PASS: CHECK BROKEN IMAGES
// ============================================
// Revisa periodicamente si hay imagenes que el navegador marca como "completas" 
// pero que tienen 0 pixeles de alto (significa que rompieron/fallaron)
function checkBrokenImages() {
    const images = document.querySelectorAll('.card-avatar img');
    let brokenCount = 0;

    images.forEach(img => {
        if (!img.classList.contains('is-fallback') && img.src && img.src.includes('http') && img.complete && img.naturalHeight === 0) {
            brokenCount++;
            // Disparar el evento error para activar el retry
            img.dispatchEvent(new Event('error'));
        }
    });

    if (brokenCount > 0) {
        console.log(`[Revisión] Detectados ${brokenCount} avatares rotos. Forzando reintento...`);
    }
}

// Segunda revisada llamada por renderPage, no por intervalo
// setInterval(checkBrokenImages, 10000); // Removido por peticion del usuario

// ============================================
// INITIALIZATION
// ============================================
function init() {
    if (typeof ALBUM_DATA === 'undefined') {
        console.error('ALBUM_DATA not found. Make sure data/jugadores.js is loaded.');
        loadingScreen.querySelector('.loading-text').textContent = 'Error: datos no encontrados';
        return;
    }

    // Load custom configurator CSS if exists
    let customCSS = localStorage.getItem('cromo-custom-css');
    if (customCSS) {
        // Fix legacy em units from old configurador exports to cqw for proper scaling
        customCSS = customCSS.replace(/font-size:\s*([\d.]+)em/g, (_match, p1) => {
            return `font-size: ${parseFloat(p1) * 10}cqw`;
        });
        const styleEl = document.createElement('style');
        styleEl.id = 'configurador-styles';
        styleEl.textContent = customCSS;
        document.head.appendChild(styleEl);
        console.log('[Configurador] Estilos aplicados desde configurador.');
    }

    // Build pages
    allPages = buildPages(ALBUM_DATA, null);
    totalPages = allPages.length;

    // Build filter menu
    buildFilterMenu();

    // Update stats
    updateStats();

    // Setup events
    setupEventListeners();

    // Render first page
    if (allPages.length > 0) {
        renderPage(0);
    }

    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
    }, 600);
}

// Start
document.addEventListener('DOMContentLoaded', init);
