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
const CARDS_PER_SPREAD = 21; // 10 left + 11 right
const CARDS_LEFT = 10;
const CARDS_RIGHT = 11;
const AVATAR_BATCH_SIZE = 100;

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
        } catch (e) {}
        
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
    imgEl.onerror = null; // evitar loop
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

    const card = document.createElement('div');
    card.className = 'card-slot';
    card.setAttribute('data-player-id', player.id);

    // Background gradient
    const bg = document.createElement('div');
    bg.className = 'card-bg';
    bg.style.background = `linear-gradient(145deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`;
    card.appendChild(bg);

    // FIFA 26 watermark
    const watermark = document.createElement('div');
    watermark.className = 'card-watermark';
    watermark.innerHTML = `<span class="wm-26">26</span><span class="wm-fifa">FIFA</span>`;
    card.appendChild(watermark);

    // Avatar
    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'card-avatar';
    const img = document.createElement('img');
    img.alt = player.d || player.u || `Jugador ${player.id}`;
    // No usar lazy loading: todas las cartas son visibles en pantalla
    img.classList.add('loading');

    // Auto-retry si la imagen falla al cargar por timeout o error de red
    img.onerror = function () {
        let retries = parseInt(img.getAttribute('data-retries') || '0');
        if (retries < 3) {
            img.setAttribute('data-retries', retries + 1);
            setTimeout(() => {
                if (!img.src) return;
                // Anadir parametro para forzar al navegador a reintentar
                let url = img.src;
                url = url.replace(/([?&])retry=\d+/, '');
                url += (url.includes('?') ? '&' : '?') + 'retry=' + Date.now();
                img.src = url;
            }, 2000);
        } else {
            // Fallback final - desactivar onerror para evitar loop infinito
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

    // Flag
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
async function renderPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= allPages.length) return;

    currentPage = pageIndex;
    const pageData = allPages[pageIndex];
    const meta = getCountryMeta(pageData.country);

    // Update page backgrounds with country color
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

    // Collect all user IDs for this page to batch-fetch avatars
    const userIds = pageData.cards.map(p => p.id);
    fetchAvatars(userIds); // Fire and forget, images will load individually

    // LEFT PAGE: 2 empty + up to 10 cards = 12 cells
    gridLeft.appendChild(createEmptySlot());
    gridLeft.appendChild(createEmptySlot());

    for (let i = 0; i < CARDS_LEFT; i++) {
        if (i < pageData.cards.length) {
            gridLeft.appendChild(createCardElement(pageData.cards[i], pageData.country));
        } else {
            gridLeft.appendChild(createEmptySlot());
        }
    }

    // RIGHT PAGE: up to 11 cards + 1 country label = 12 cells
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

    // Segunda revisada: esperar ~2.5 segundos despues de renderizar para revisar imagenes rotas
    if (window.brokenImagesTimeout) clearTimeout(window.brokenImagesTimeout);
    window.brokenImagesTimeout = setTimeout(checkBrokenImages, 2500);
}

// ============================================
// MODAL
// ============================================
function openModal(player, country) {
    const meta = getCountryMeta(country);
    const [c1, c2] = meta.colors;

    // Remove previous card if any
    const existingCard = modalCard.querySelector('.card-slot');
    if (existingCard) existingCard.remove();
    const existingInfo = modalCard.querySelector('.modal-info');
    if (existingInfo) existingInfo.remove();

    // Build enlarged card
    const card = document.createElement('div');
    card.className = 'card-slot';

    const bg = document.createElement('div');
    bg.className = 'card-bg';
    bg.style.background = `linear-gradient(145deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`;
    card.appendChild(bg);

    const watermark = document.createElement('div');
    watermark.className = 'card-watermark';
    watermark.innerHTML = `<span class="wm-26">26</span><span class="wm-fifa">FIFA</span>`;
    card.appendChild(watermark);

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'card-avatar';
    const img = document.createElement('img');
    img.alt = player.d || player.u || `Jugador ${player.id}`;
    img.classList.add('loading');
    avatarWrap.appendChild(img);
    card.appendChild(avatarWrap);

    setAvatarImage(img, player.id);

    const flag = document.createElement('div');
    flag.className = 'card-flag';
    flag.textContent = meta.flag;
    card.appendChild(flag);

    const nameBar = document.createElement('div');
    nameBar.className = 'card-name-bar';
    const nameText = document.createElement('div');
    nameText.className = 'card-name';
    nameText.textContent = player.d || player.u || `Jugador_${player.id}`;
    nameBar.appendChild(nameText);
    card.appendChild(nameBar);

    modalCard.insertBefore(card, modalCard.firstChild);

    // Add info below
    const info = document.createElement('div');
    info.className = 'modal-info';
    info.innerHTML = `
        <div><span class="info-label">ID</span><div class="info-value">${player.id}</div></div>
        ${player.u ? `<div><span class="info-label">Username</span><div class="info-value">${player.u}</div></div>` : ''}
        ${player.r ? `<div><span class="info-label">Rango</span><div class="info-value">${player.r}</div></div>` : ''}
        <div><span class="info-label">País</span><div class="info-value">${meta.flag} ${meta.name}</div></div>
    `;
    modalCard.appendChild(info);

    modalOverlay.classList.add('active');
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
