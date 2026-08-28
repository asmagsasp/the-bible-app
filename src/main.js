import '/src/styles/main.css';
import { getBibleBooks, getChapterVerses, getVerseOfTheDay, getFavorites, toggleFavorite, isFavorite, searchBibleText } from './services/bibleData.js';
import { getAIHomilyReflection, speakText, stopAudio, isAudioPlaying, unlockAudioContext } from './services/homilyService.js';
import { getReadingPlan, toggleDayCompleted, getPlanProgressPercentage, getTodayDayOfYear, getMonthLabel } from './services/planService.js';
import { getGalleryCategories, getGalleryItems } from './services/galleryData.js';
import { initNativeFeatures, triggerHapticFeedback, shareContent, showNativeToast } from './services/nativeService.js';
import { getLanguage, setLanguage, t } from './services/i18n.js';

// ESTADO GLOBAL DA APLICAÇÃO
const state = {
  currentTestament: 0, // 0: Todos, 1: Antigo, 2: Novo
  currentBook: null,
  currentChapter: 1,
  currentVerseFontSize: 1.125, // rem
  theme: localStorage.getItem('avemaria_theme') || 'navy',
  planMonth: 0, // 0: Todos os Meses, 1..12
  planFilter: 'all', // 'all', 'pending', 'completed'
  planSearch: '',
  galleryCategory: 'all'
};

// INICIALIZAÇÃO DO APP
function initApp() {
  initNativeFeatures();
  applyTheme(state.theme);
  updateUILS();
  renderHeroVerse();
  renderBooksGrid();
  setupEventListeners();
  renderGallery();
  renderPlan();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ALTERAR TEMA (Navy -> OLED -> Sepia -> Light -> Navy)
function applyTheme(themeName) {
  state.theme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('avemaria_theme', themeName);
  
  const icon = document.querySelector('#btnThemeToggle i');
  if (icon) {
    if (themeName === 'navy') icon.className = 'fas fa-moon';
    else if (themeName === 'oled') icon.className = 'fas fa-circle';
    else if (themeName === 'sepia') icon.className = 'fas fa-book-open';
    else icon.className = 'fas fa-sun';
  }
}

function cycleTheme() {
  triggerHapticFeedback();
  const themes = ['navy', 'oled', 'sepia', 'light'];
  const nextIdx = (themes.indexOf(state.theme) + 1) % themes.length;
  applyTheme(themes[nextIdx]);
  showNativeToast(`Tema alterado para: ${themes[nextIdx].toUpperCase()}`);
}

// ATUALIZAÇÃO DINÂMICA DE INTERFACE POR IDIOMA (i18n)
function updateUILS() {
  const currentLang = getLanguage();
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
  });

  const headerTitle = document.querySelector('.header-title');
  if (headerTitle) headerTitle.textContent = t('appTitle');
  
  const headerSub = document.querySelector('.header-subtitle');
  if (headerSub) headerSub.textContent = t('appSubtitle');

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t('searchPlaceholder');

  const searchTitle = document.querySelector('#viewSearch .view-header-title');
  if (searchTitle) searchTitle.textContent = t('searchTitle');

  const searchSub = document.getElementById('searchSubtitle');
  if (searchSub) searchSub.textContent = t('searchSubtitle');

  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length >= 3) {
    tabBtns[0].textContent = t('navBooks');
    tabBtns[1].textContent = t('oldTestament');
    tabBtns[2].textContent = t('newTestament');
  }

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const target = item.getAttribute('data-target');
    const label = item.querySelector('.nav-label');
    if (label) {
      if (target === 'viewHome') label.textContent = t('navBooks');
      if (target === 'viewPlan') label.textContent = t('navPlan');
      if (target === 'viewFavorites') label.textContent = t('navFavorites');
      if (target === 'viewGallery') label.textContent = t('navGallery');
      if (target === 'viewSearch') label.textContent = t('navSearch');
    }
  });

  const heroReadBtn = document.getElementById('btnHeroRead');
  if (heroReadBtn) heroReadBtn.innerHTML = `<i class="fas fa-book-open"></i> ${t('readChapter')}`;

  const heroDonateBtn = document.getElementById('btnHeroDonate');
  if (heroDonateBtn) heroDonateBtn.innerHTML = `<i class="fas fa-hand-holding-heart"></i> ${t('donateTitle')}`;

  // Banner de Apoio (Home)
  const bannerBadge = document.getElementById('bannerBadgeText');
  if (bannerBadge) bannerBadge.innerHTML = `<i class="fas fa-heart"></i> ${t('bannerSupportTag')}`;

  const bannerTitle = document.getElementById('bannerTitleText');
  if (bannerTitle) bannerTitle.textContent = t('bannerSupportTitle');

  const bannerDesc = document.getElementById('bannerDescText');
  if (bannerDesc) bannerDesc.textContent = t('bannerSupportDesc');

  const bannerBtn = document.getElementById('bannerBtnText');
  if (bannerBtn) bannerBtn.textContent = t('bannerSupportBtn');

  // Card de Apoio (Leitor)
  const readerSupTitle = document.getElementById('readerSupportTitleText');
  if (readerSupTitle) readerSupTitle.textContent = t('readerSupportTitle');

  const readerSupDesc = document.getElementById('readerSupportDescText');
  if (readerSupDesc) readerSupDesc.textContent = t('readerSupportDesc');

  const readerSupBtn = document.getElementById('readerSupportBtnText');
  if (readerSupBtn) readerSupBtn.textContent = t('readerSupportBtn');

  // Modal Pix
  const modalDonTitle = document.getElementById('modalDonateTitle');
  if (modalDonTitle) modalDonTitle.textContent = t('donateTitle');

  const modalDonDesc = document.getElementById('modalDonateDesc');
  if (modalDonDesc) modalDonDesc.textContent = t('donateDesc');

  const copyPixBtn = document.getElementById('btnCopyPix');
  if (copyPixBtn) copyPixBtn.innerHTML = `<i class="far fa-copy"></i> ${t('copyPixKey')}`;

  const listenCapBtn = document.getElementById('btnListenChapter');
  if (listenCapBtn) listenCapBtn.innerHTML = `<i class="fas fa-volume-high"></i> ${t('listenChapter')}`;

  const homilyCapBtn = document.getElementById('btnChapterHomily');
  if (homilyCapBtn) homilyCapBtn.innerHTML = `<i class="fas fa-cross"></i> ${t('reflectionAI')}`;

  const favTitle = document.querySelector('#viewFavorites .view-header-title');
  if (favTitle) favTitle.textContent = t('favoritesTitle');

  const galTitle = document.querySelector('#viewGallery .view-header-title');
  if (galTitle) galTitle.textContent = t('galleryTitle');

  const galSub = document.querySelector('#viewGallery .view-header-subtitle');
  if (galSub) galSub.textContent = t('gallerySub');

  const planTitle = document.querySelector('#viewPlan .view-header-title');
  if (planTitle) planTitle.textContent = t('readingPlanTitle');

  const planSub = document.querySelector('#viewPlan .view-header-subtitle');
  if (planSub) planSub.textContent = t('readingPlanSub');

  const btnTodayShortcut = document.getElementById('btnGoToToday');
  if (btnTodayShortcut) btnTodayShortcut.innerHTML = `<i class="fas fa-calendar-day"></i> ${t('goToToday')}`;

  const planSearchInp = document.getElementById('planSearchInput');
  if (planSearchInp) planSearchInp.placeholder = t('searchPlanPlaceholder');

  const pills = document.querySelectorAll('.plan-pill');
  if (pills.length >= 3) {
    pills[0].textContent = t('filterAll');
    pills[1].textContent = t('filterPending');
    pills[2].textContent = t('filterCompleted');
  }
}

// RENDEREIZAR HERO - VERSÍCULO DO DIA
function renderHeroVerse() {
  const v = getVerseOfTheDay();
  const heroTextEl = document.getElementById('heroText');
  const heroRefEl = document.getElementById('heroRef');
  
  if (heroTextEl) heroTextEl.textContent = `"${v.text}"`;
  if (heroRefEl) heroRefEl.textContent = v.reference;
  
  const readBtn = document.getElementById('btnHeroRead');
  if (readBtn) {
    readBtn.onclick = () => {
      triggerHapticFeedback();
      const books = getBibleBooks();
      const targetBook = books.find(b => b.id === v.bookId) || books.find(b => v.reference.toLowerCase().includes(b.name.toLowerCase())) || books[0];
      openBookReader(targetBook, v.chapter || 1, v.verseNum || null);
    };
  }

  const shareBtn = document.getElementById('btnHeroShare');
  if (shareBtn) {
    shareBtn.onclick = () => {
      triggerHapticFeedback();
      shareContent('Versículo do Dia - Bíblia Ave Maria', `"${v.text}" (${v.reference})`, 'https://bibliasagradaavemaria.com.br');
    };
  }

  const homilyBtn = document.getElementById('btnHeroHomily');
  if (homilyBtn) {
    homilyBtn.onclick = () => {
      triggerHapticFeedback();
      openHomilyModal(v.reference, v.text);
    };
  }
}

// RENDERIZAR GRADE DE LIVROS (73 LIVROS TRILÍNGUES)
function renderBooksGrid() {
  const container = document.getElementById('booksGrid');
  if (!container) return;
  container.innerHTML = '';

  const books = getBibleBooks();
  const filtered = books.filter(b => {
    if (state.currentTestament === 0) return true;
    return b.testament === state.currentTestament;
  });

  filtered.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <span class="book-abbrev">${book.abbrev}</span>
      <div class="book-name">${book.name}</div>
      <div class="book-chapters-count">${book.chapters} cap. • ${book.category}</div>
    `;
    card.onclick = () => {
      triggerHapticFeedback();
      openBookReader(book);
    };
    container.appendChild(card);
  });
}

// ABRIR LEITOR DE LIVRO E CAPÍTULOS
function openBookReader(book, chapterToOpen = 1, scrollToVerse = null) {
  state.currentBook = book;
  state.currentChapter = chapterToOpen;
  
  switchView('viewReader');
  const titleEl = document.getElementById('readerTitle');
  const subEl = document.getElementById('readerSubtitle');
  if (titleEl) titleEl.textContent = book.name;
  if (subEl) subEl.textContent = `${book.chapters} Capítulos (${book.testament === 1 ? 'Antigo Testamento' : 'Novo Testamento'})`;

  renderChaptersGrid(book.chapters);
  renderChapterVerses(book.id, chapterToOpen);

  if (scrollToVerse) {
    setTimeout(() => {
      const verseElem = document.getElementById(`verse_${scrollToVerse}`);
      if (verseElem) {
        verseElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        verseElem.classList.add('selected');
        setTimeout(() => verseElem.classList.remove('selected'), 3000);
      }
    }, 300);
  }
}

// RENDERIZAR BOTÕES DE CAPÍTULOS
function renderChaptersGrid(totalChapters) {
  const grid = document.getElementById('chaptersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  for (let i = 1; i <= totalChapters; i++) {
    const btn = document.createElement('button');
    btn.className = `chapter-btn ${i === state.currentChapter ? 'active' : ''}`;
    btn.textContent = i;
    btn.onclick = () => {
      triggerHapticFeedback();
      state.currentChapter = i;
      document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderChapterVerses(state.currentBook.id, i);
    };
    grid.appendChild(btn);
  }
}

// RENDERIZAR VERSÍCULOS DO CAPÍTULO SELECIONADO
function renderChapterVerses(bookId, chapterNum) {
  const verses = getChapterVerses(bookId, chapterNum);
  const container = document.getElementById('versesList');
  if (!container) return;
  container.innerHTML = '';

  const ctrlEl = document.getElementById('readerControls');
  const navEl = document.getElementById('chapterNavBar');
  if (ctrlEl) ctrlEl.classList.remove('hidden');
  if (navEl) navEl.classList.remove('hidden');

  verses.forEach((vText, index) => {
    const verseNum = index + 1;
    const isFav = isFavorite(state.currentBook.name, chapterNum, verseNum);
    
    const vEl = document.createElement('div');
    vEl.className = 'verse-item';
    vEl.id = `verse_${verseNum}`;
    vEl.style.fontSize = `${state.currentVerseFontSize}rem`;
    vEl.innerHTML = `
      <span class="verse-num">${verseNum}</span>
      <span>${vText}</span>
      <span class="verse-item-actions">
        <button class="verse-action-btn ${isFav ? 'active' : ''}" title="Salvar Favorito">
          <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <button class="verse-action-btn btn-share-v" title="Compartilhar">
          <i class="fas fa-share-nodes"></i>
        </button>
        <button class="verse-action-btn btn-audio-v" title="Ouvir Versículo">
          <i class="fas fa-volume-high"></i>
        </button>
      </span>
    `;

    // Favorito
    const favBtn = vEl.querySelector('.fa-heart').parentElement;
    favBtn.onclick = (e) => {
      e.stopPropagation();
      triggerHapticFeedback();
      const added = toggleFavorite(state.currentBook.name, chapterNum, verseNum, vText);
      favBtn.classList.toggle('active', added);
      favBtn.querySelector('i').className = added ? 'fas fa-heart' : 'far fa-heart';
      showNativeToast(added ? 'Versículo salvo em Favoritos!' : 'Removido dos Favoritos.');
    };

    // Compartilhar
    vEl.querySelector('.btn-share-v').onclick = (e) => {
      e.stopPropagation();
      triggerHapticFeedback();
      shareContent(
        `${state.currentBook.name} ${chapterNum}, ${verseNum}`,
        `"${vText}" (${state.currentBook.name} ${chapterNum}, ${verseNum} - Ave Maria)`,
        'https://bibliasagradaavemaria.com.br'
      );
    };

    // Ouvir Versículo
    vEl.querySelector('.btn-audio-v').onclick = (e) => {
      e.stopPropagation();
      triggerHapticFeedback();
      startAudioTrack(`${state.currentBook.name} ${chapterNum}, ${verseNum}`, vText);
    };

    container.appendChild(vEl);
  });

  // Atualiza navegação de botões Anterior/Próximo
  const prevBtn = document.getElementById('btnPrevChapter');
  const nextBtn = document.getElementById('btnNextChapter');
  if (prevBtn) prevBtn.disabled = (chapterNum <= 1);
  if (nextBtn) nextBtn.disabled = (chapterNum >= state.currentBook.chapters);
}

// NAVEGAÇÃO ENTRE CAPÍTULOS
function navigateChapter(delta) {
  if (!state.currentBook) return;
  const newCap = state.currentChapter + delta;
  if (newCap >= 1 && newCap <= state.currentBook.chapters) {
    triggerHapticFeedback();
    state.currentChapter = newCap;
    renderChaptersGrid(state.currentBook.chapters);
    renderChapterVerses(state.currentBook.id, newCap);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// RENDERIZAR ABAS DE CATEGORIAS DA GALERIA
function renderGalleryCategoryTabs() {
  const container = document.getElementById('galleryCategoryTabs');
  if (!container) return;
  container.innerHTML = '';

  const categories = getGalleryCategories();
  const lang = getLanguage();

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `gallery-cat-btn ${state.galleryCategory === cat.id ? 'active' : ''}`;
    const label = cat[lang] || cat.pt;
    btn.innerHTML = `<i class="${cat.icon}"></i> ${label}`;
    btn.onclick = () => {
      triggerHapticFeedback();
      state.galleryCategory = cat.id;
      renderGallery();
    };
    container.appendChild(btn);
  });
}

// RENDERIZAR GALERIA DE MEDITAÇÃO COM IMAGENS E VERSÍCULOS
function renderGallery() {
  renderGalleryCategoryTabs();
  const container = document.getElementById('galleryGrid');
  if (!container) return;
  container.innerHTML = '';

  const lang = getLanguage();
  const items = getGalleryItems(state.galleryCategory);

  items.forEach(item => {
    const langData = item[lang] || item.pt;
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <div class="gallery-card-img-box" style="background: ${item.bg}">
        <img class="gallery-card-bg-img" src="${item.imageUrl}" alt="${langData.reference}" loading="lazy" />
        <div class="gallery-card-overlay"></div>
        <div class="gallery-card-content">
          <div class="gallery-verse-text">"${langData.text}"</div>
          <div class="gallery-verse-ref"><i class="fas fa-cross"></i> ${langData.reference}</div>
        </div>
      </div>
      <div class="gallery-card-body">
        <button class="btn-primary btn-share-g" style="padding: 6px 12px; font-size: 0.78rem;">
          <i class="fab fa-whatsapp"></i> Compartilhar
        </button>
        <div class="gallery-card-actions">
          <button class="btn-card-action btn-audio-g" title="Ouvir Áudio">
            <i class="fas fa-volume-high"></i>
          </button>
          <button class="btn-card-action btn-homily-g" title="Reflexão com IA">
            <i class="fas fa-sparkles" style="color: #3b82f6;"></i>
          </button>
          <button class="btn-card-action btn-read-g" title="Ler Capítulo">
            <i class="fas fa-book-open"></i>
          </button>
        </div>
      </div>
    `;

    // Clique na imagem para abrir modal em tela cheia
    const imgBox = card.querySelector('.gallery-card-img-box');
    if (imgBox) {
      imgBox.onclick = () => {
        triggerHapticFeedback();
        openGalleryModal(item);
      };
    }

    // Compartilhar
    const shareBtn = card.querySelector('.btn-share-g');
    if (shareBtn) {
      shareBtn.onclick = (e) => {
        e.stopPropagation();
        triggerHapticFeedback();
        shareContent(
          `Meditação Sagrada - ${langData.reference}`,
          `"${langData.text}" (${langData.reference}) - Bíblia Ave Maria`,
          'https://bibliasagradaavemaria.com.br'
        );
      };
    }

    // Áudio
    const audioBtn = card.querySelector('.btn-audio-g');
    if (audioBtn) {
      audioBtn.onclick = (e) => {
        e.stopPropagation();
        triggerHapticFeedback();
        startAudioTrack(langData.reference, langData.text);
      };
    }

    // Reflexão IA
    const homilyBtn = card.querySelector('.btn-homily-g');
    if (homilyBtn) {
      homilyBtn.onclick = (e) => {
        e.stopPropagation();
        triggerHapticFeedback();
        openHomilyModal(langData.reference, langData.text);
      };
    }

    // Ler Capítulo
    const readBtn = card.querySelector('.btn-read-g');
    if (readBtn) {
      readBtn.onclick = (e) => {
        e.stopPropagation();
        triggerHapticFeedback();
        const books = getBibleBooks();
        const book = books.find(b => b.id === item.bookId) || books[0];
        openBookReader(book, item.chapter || 1, item.verseNum || null);
      };
    }

    container.appendChild(card);
  });
}

// MODAL DE VISUALIZAÇÃO DA GALERIA
function openGalleryModal(item) {
  const lang = getLanguage();
  const langData = item[lang] || item.pt;

  const modal = document.getElementById('galleryModal');
  const imgEl = document.getElementById('galleryModalImg');
  const verseEl = document.getElementById('galleryModalVerse');
  const refEl = document.getElementById('galleryModalRef');
  const imgBox = document.getElementById('galleryModalImgBox');

  if (imgEl) imgEl.src = item.imageUrl;
  if (verseEl) verseEl.textContent = `"${langData.text}"`;
  if (refEl) refEl.textContent = langData.reference;
  if (imgBox) imgBox.style.background = item.bg;

  if (modal) modal.classList.add('active');

  const shareBtn = document.getElementById('btnGalleryModalShare');
  if (shareBtn) {
    shareBtn.onclick = () => {
      triggerHapticFeedback();
      shareContent(
        `Meditação Sagrada - ${langData.reference}`,
        `"${langData.text}" (${langData.reference}) - Bíblia Ave Maria`,
        'https://bibliasagradaavemaria.com.br'
      );
    };
  }

  const audioBtn = document.getElementById('btnGalleryModalAudio');
  if (audioBtn) {
    audioBtn.onclick = () => {
      triggerHapticFeedback();
      startAudioTrack(langData.reference, langData.text);
      if (modal) modal.classList.remove('active');
    };
  }

  const homilyBtn = document.getElementById('btnGalleryModalHomily');
  if (homilyBtn) {
    homilyBtn.onclick = () => {
      triggerHapticFeedback();
      if (modal) modal.classList.remove('active');
      openHomilyModal(langData.reference, langData.text);
    };
  }

  const readBtn = document.getElementById('btnGalleryModalRead');
  if (readBtn) {
    readBtn.onclick = () => {
      triggerHapticFeedback();
      if (modal) modal.classList.remove('active');
      const books = getBibleBooks();
      const book = books.find(b => b.id === item.bookId) || books[0];
      openBookReader(book, item.chapter || 1, item.verseNum || null);
    };
  }
}

// RENDERIZAR ABAS DE MESES DO PLANO (JAN A DEZ)
function renderPlanMonthsTabs() {
  const container = document.getElementById('planMonthsTabs');
  if (!container) return;
  container.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = `plan-month-btn ${state.planMonth === 0 ? 'active' : ''}`;
  allBtn.textContent = t('allMonths');
  allBtn.onclick = () => {
    triggerHapticFeedback();
    state.planMonth = 0;
    renderPlan();
  };
  container.appendChild(allBtn);

  for (let m = 1; m <= 12; m++) {
    const btn = document.createElement('button');
    btn.className = `plan-month-btn ${state.planMonth === m ? 'active' : ''}`;
    btn.textContent = getMonthLabel(m);
    btn.onclick = () => {
      triggerHapticFeedback();
      state.planMonth = m;
      renderPlan();
    };
    container.appendChild(btn);
  }
}

// RENDERIZAR PLANO DE LEITURA 365 DIAS (73 LIVROS)
function renderPlan() {
  renderPlanMonthsTabs();
  const allPlanDays = getReadingPlan();
  const container = document.getElementById('planDaysList');
  if (!container) return;
  container.innerHTML = '';

  const pct = getPlanProgressPercentage();
  const fillEl = document.getElementById('planProgressFill');
  const txtEl = document.getElementById('planProgressText');
  const completedCount = allPlanDays.filter(d => d.completed).length;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (txtEl) txtEl.textContent = `${pct}% ${t('completed')} (${completedCount}/365 ${t('day')}s)`;

  const todayNum = getTodayDayOfYear();

  // Filtragem dos dias
  let filtered = allPlanDays;

  // Filtro de Mês
  if (state.planMonth > 0) {
    filtered = filtered.filter(d => d.month === state.planMonth);
  }

  // Filtro de Status
  if (state.planFilter === 'pending') {
    filtered = filtered.filter(d => !d.completed);
  } else if (state.planFilter === 'completed') {
    filtered = filtered.filter(d => d.completed);
  }

  // Filtro de Busca
  if (state.planSearch && state.planSearch.trim().length > 0) {
    const q = state.planSearch.trim().toLowerCase();
    filtered = filtered.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.read.toLowerCase().includes(q) || 
      `dia ${d.day}`.includes(q) || 
      `${d.day}` === q
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 30px 0;">Nenhum dia encontrado para os filtros selecionados.</div>`;
    return;
  }

  filtered.forEach(day => {
    const isToday = (day.day === todayNum);
    const item = document.createElement('div');
    item.className = `plan-day-item ${day.completed ? 'completed' : ''} ${isToday ? 'today' : ''}`;
    item.id = `plan_day_${day.day}`;
    
    item.innerHTML = `
      <div class="plan-day-info">
        <div class="plan-day-header-tags">
          <span class="plan-day-badge ${isToday ? 'today-badge' : ''}">
            ${isToday ? '<i class="fas fa-star"></i> ' : ''}${t('day')} ${day.day} • ${getMonthLabel(day.month)}
          </span>
        </div>
        <div class="plan-day-title">${day.title}</div>
        <div class="plan-day-read"><i class="fas fa-book-bible"></i> ${day.read}</div>
      </div>
      <div class="plan-day-actions">
        <button class="btn-plan-read" title="${t('readNow')}">
          <i class="fas fa-book-open"></i> ${t('readNow')}
        </button>
        <button class="plan-checkbox-btn" title="Marcar como lido">
          <div class="plan-checkbox">
            ${day.completed ? '<i class="fas fa-check"></i>' : ''}
          </div>
        </button>
      </div>
    `;

    // Ação de Ler o Capítulo no Leitor
    const readBtn = item.querySelector('.btn-plan-read');
    if (readBtn) {
      readBtn.onclick = (e) => {
        e.stopPropagation();
        triggerHapticFeedback();
        const books = getBibleBooks();
        const book = books.find(b => b.id === day.bookId) || books[0];
        openBookReader(book, day.chapter || 1);
      };
    }

    // Ação de Marcar / Desmarcar como concluído
    const chkBtn = item.querySelector('.plan-checkbox-btn');
    if (chkBtn) {
      chkBtn.onclick = (e) => {
        e.stopPropagation();
        triggerHapticFeedback();
        const isDone = toggleDayCompleted(day.day);
        renderPlan();
        showNativeToast(isDone ? `Dia ${day.day} concluído!` : `Dia ${day.day} desmarcado.`);
      };
    }

    container.appendChild(item);
  });
}

// RENDERIZAR FAVORITOS
function renderFavorites() {
  const favorites = getFavorites();
  const container = document.getElementById('favoritesList');
  if (!container) return;
  container.innerHTML = '';

  if (favorites.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 40px 0;">Nenhum versículo salvo em favoritos ainda.<br>Clique no ícone de coração nos versículos para salvar aqui.</div>';
    return;
  }

  favorites.forEach(fav => {
    const item = document.createElement('div');
    item.className = 'verse-item';
    item.innerHTML = `
      <div style="font-weight: 700; color: var(--accent-gold); font-size: 0.85rem; margin-bottom: 4px;">
        ${fav.bookName} ${fav.chapter}, ${fav.verseNum}
      </div>
      <div>"${fav.text}"</div>
    `;
    container.appendChild(item);
  });
}

// MODAL HOMILIA IA
function openHomilyModal(ref, text) {
  const homily = getAIHomilyReflection(ref, text);
  const refEl = document.getElementById('homilyModalRef');
  const bodyEl = document.getElementById('homilyModalBody');
  if (refEl) refEl.textContent = homily.reference;
  if (bodyEl) bodyEl.innerHTML = homily.body;
  
  const modal = document.getElementById('homilyModal');
  if (modal) modal.classList.add('active');

  const speakBtn = document.getElementById('btnSpeakHomily');
  if (speakBtn) {
    speakBtn.onclick = () => {
      triggerHapticFeedback();
      startAudioTrack(`Homilia sobre ${homily.reference}`, homily.body);
      if (modal) modal.classList.remove('active');
    };
  }
}

// BARRA DE ÁUDIO DE LEITURA
function startAudioTrack(title, textToSpeak) {
  unlockAudioContext();
  const audioBar = document.getElementById('audioPlayerBar');
  const trackEl = document.getElementById('audioTrackTitle');
  if (trackEl) trackEl.textContent = title;
  if (audioBar) audioBar.classList.remove('hidden');

  speakText(
    textToSpeak,
    () => {
      if (audioBar) audioBar.classList.add('hidden');
    },
    (currentChunk, totalChunks) => {
      if (trackEl) {
        trackEl.textContent = `${title} (${currentChunk}/${totalChunks})`;
      }
    }
  );
}

// TROCA DE VIEWS (ROUTING MOBILE)
function switchView(targetViewId) {
  const views = ['viewHome', 'viewReader', 'viewGallery', 'viewPlan', 'viewFavorites', 'viewSearch'];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === targetViewId) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });

  // Atualiza botões da navegação inferior
  document.querySelectorAll('.nav-item').forEach(btn => {
    const target = btn.getAttribute('data-target');
    if (target === targetViewId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (targetViewId === 'viewGallery') renderGallery();
  if (targetViewId === 'viewFavorites') renderFavorites();
  if (targetViewId === 'viewPlan') renderPlan();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// SETUP DE LISTENERS DA INTERFACE
function setupEventListeners() {
  // Seletor de Idiomas (PT, EN, ES)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => {
      triggerHapticFeedback();
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
      
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      updateUILS();
      renderHeroVerse();
      renderBooksGrid();
      renderPlan();
      renderGallery();
      if (state.currentBook) {
        const books = getBibleBooks();
        const updatedBook = books.find(b => b.id === state.currentBook.id) || books[0];
        openBookReader(updatedBook, state.currentChapter);
      }
    };
  });

  // Troca de Tema
  const themeToggleBtn = document.getElementById('btnThemeToggle');
  if (themeToggleBtn) themeToggleBtn.onclick = cycleTheme;

  // Botões do Modal Pix / Doação & Banner de Apoio
  const donateModal = document.getElementById('donateModal');
  const donateHeaderBtn = document.getElementById('btnDonateHeader');
  const donateHeroBtn = document.getElementById('btnHeroDonate');
  const bannerDonateBtn = document.getElementById('btnBannerDonate');
  const homeBannerEl = document.getElementById('homeSupportBanner');
  const readerDonateBtn = document.getElementById('btnReaderDonate');
  const bannerQuickCopyBtn = document.getElementById('btnBannerQuickCopy');
  
  const openDonate = () => {
    triggerHapticFeedback();
    if (donateModal) donateModal.classList.add('active');
  };
  
  if (donateHeaderBtn) donateHeaderBtn.onclick = openDonate;
  if (donateHeroBtn) donateHeroBtn.onclick = openDonate;
  if (bannerDonateBtn) {
    bannerDonateBtn.onclick = (e) => {
      e.stopPropagation();
      openDonate();
    };
  }
  if (readerDonateBtn) readerDonateBtn.onclick = openDonate;
  
  if (homeBannerEl) {
    homeBannerEl.onclick = (e) => {
      // Se clicou no botão de cópia rápida, não abre o modal
      if (e.target.closest('#btnBannerQuickCopy')) return;
      openDonate();
    };
  }

  const copyPixHandler = (e) => {
    if (e) e.stopPropagation();
    triggerHapticFeedback();
    const pixKeyTextEl = document.getElementById('pixKeyText');
    const key = pixKeyTextEl ? pixKeyTextEl.textContent.trim() : 'minhabibliacatolica1@gmail.com';
    navigator.clipboard.writeText(key).then(() => {
      showNativeToast(t('pixCopied'));
    }).catch(() => {
      showNativeToast(t('pixCopied'));
    });
  };

  if (bannerQuickCopyBtn) bannerQuickCopyBtn.onclick = copyPixHandler;

  const closeDonateBtn = document.getElementById('btnCloseDonate');
  if (closeDonateBtn && donateModal) {
    closeDonateBtn.onclick = () => donateModal.classList.remove('active');
  }

  // Fechar ao clicar no overlay de fundo do modal
  if (donateModal) {
    donateModal.onclick = (e) => {
      if (e.target === donateModal) donateModal.classList.remove('active');
    };
  }
  
  const copyPixBtn = document.getElementById('btnCopyPix');
  if (copyPixBtn) {
    copyPixBtn.onclick = copyPixHandler;
  }

  // Seleção de Valor Sugerido no Modal (Pills)
  const donationPills = document.querySelectorAll('.donation-pill');
  donationPills.forEach(pill => {
    pill.onclick = () => {
      triggerHapticFeedback();
      donationPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const amt = pill.getAttribute('data-amount');
      showNativeToast(`Valor selecionado: R$ ${amt},00. Copie a chave Pix para transferir.`);
    };
  });

  // Botão Fechar Modal Homilia
  const closeHomilyBtn = document.getElementById('btnCloseHomily');
  const homilyModal = document.getElementById('homilyModal');
  if (closeHomilyBtn && homilyModal) {
    closeHomilyBtn.onclick = () => homilyModal.classList.remove('active');
  }

  // Botão Fechar Modal Galeria
  const closeGalleryBtn = document.getElementById('btnCloseGalleryModal');
  const galleryModal = document.getElementById('galleryModal');
  if (closeGalleryBtn && galleryModal) {
    closeGalleryBtn.onclick = () => galleryModal.classList.remove('active');
  }
  if (galleryModal) {
    galleryModal.onclick = (e) => {
      if (e.target === galleryModal) galleryModal.classList.remove('active');
    };
  }

  // Botão Parar Áudio
  const stopAudioBtn = document.getElementById('btnStopAudio');
  if (stopAudioBtn) {
    stopAudioBtn.onclick = () => {
      triggerHapticFeedback();
      stopAudio();
      const bar = document.getElementById('audioPlayerBar');
      if (bar) bar.classList.add('hidden');
    };
  }

  // Botões de Tamanho de Fonte
  const fontPlusBtn = document.getElementById('btnFontPlus');
  const fontMinusBtn = document.getElementById('btnFontMinus');
  if (fontPlusBtn) {
    fontPlusBtn.onclick = () => {
      triggerHapticFeedback();
      if (state.currentVerseFontSize < 1.8) {
        state.currentVerseFontSize += 0.1;
        document.querySelectorAll('.verse-item').forEach(v => v.style.fontSize = `${state.currentVerseFontSize}rem`);
      }
    };
  }
  if (fontMinusBtn) {
    fontMinusBtn.onclick = () => {
      triggerHapticFeedback();
      if (state.currentVerseFontSize > 0.8) {
        state.currentVerseFontSize -= 0.1;
        document.querySelectorAll('.verse-item').forEach(v => v.style.fontSize = `${state.currentVerseFontSize}rem`);
      }
    };
  }

  // Botão Reflexão & Homilia com IA no Capítulo
  const chapterHomilyBtn = document.getElementById('btnChapterHomily');
  if (chapterHomilyBtn) {
    chapterHomilyBtn.onclick = () => {
      if (!state.currentBook) return;
      triggerHapticFeedback();
      const verses = getChapterVerses(state.currentBook.id, state.currentChapter);
      const sampleVerse = verses[0] || 'Palavra de Deus para o seu dia.';
      openHomilyModal(`${state.currentBook.name} Capítulo ${state.currentChapter}`, sampleVerse);
    };
  }

  // Navegação entre capítulos
  const prevChapterBtn = document.getElementById('btnPrevChapter');
  const nextChapterBtn = document.getElementById('btnNextChapter');
  const backToHomeBtn = document.getElementById('btnBackToHome');
  if (prevChapterBtn) prevChapterBtn.onclick = () => navigateChapter(-1);
  if (nextChapterBtn) nextChapterBtn.onclick = () => navigateChapter(1);
  if (backToHomeBtn) {
    backToHomeBtn.onclick = () => {
      triggerHapticFeedback();
      switchView('viewHome');
    };
  }

  // Ouvir Capítulo inteiro em áudio
  const listenChapterBtn = document.getElementById('btnListenChapter');
  if (listenChapterBtn) {
    listenChapterBtn.onclick = () => {
      if (!state.currentBook) return;
      triggerHapticFeedback();
      const verses = getChapterVerses(state.currentBook.id, state.currentChapter);
      const fullText = verses.join('. ');
      startAudioTrack(`${state.currentBook.name} Capitulo ${state.currentChapter}`, fullText);
    };
  }

  // Abas de Testamento (Todos, Antigo, Novo)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      triggerHapticFeedback();
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentTestament = parseInt(btn.getAttribute('data-testament'));
      renderBooksGrid();
    };
  });

  // Bottom Navigation Bar
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerHapticFeedback();
      const target = btn.getAttribute('data-target');
      if (target) {
        switchView(target);
      }
    });
  });

  // BUSCA COMPLETA EM TODA A BÍBLIA (LIVROS, CAPÍTULOS E PALAVRAS DOS VERSÍCULOS)
  const searchInput = document.getElementById('searchInput');
  const searchIcon = document.querySelector('.search-icon');

  const executeSearch = () => {
    if (!searchInput) return;
    const query = searchInput.value.trim();
    if (query.length < 2) {
      const searchView = document.getElementById('viewSearch');
      if (searchView && !searchView.classList.contains('hidden')) {
        switchView('viewHome');
      }
      return;
    }

    switchView('viewSearch');
    const container = document.getElementById('searchResultsList');
    if (!container) return;
    container.innerHTML = '';

    const searchResults = searchBibleText(query);
    const searchSub = document.getElementById('searchSubtitle');
    if (searchSub) searchSub.textContent = `Encontrados ${searchResults.length} resultado(s) para "${query}" em toda a Bíblia`;

    if (searchResults.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 30px 0;">Nenhum versículo ou livro encontrado com "${query}".</div>`;
      return;
    }

    searchResults.forEach(res => {
      const item = document.createElement('div');
      item.className = 'verse-item';
      item.style.cursor = 'pointer';

      if (res.type === 'book') {
        item.innerHTML = `
          <div style="font-weight: 700; color: var(--accent-gold); font-size: 1.05rem;">
            <i class="fas fa-book-bible"></i> ${res.title}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">${res.subtitle}</div>
        `;
        item.onclick = () => openBookReader(res.book, 1);
      } else {
        item.innerHTML = `
          <div style="font-weight: 700; color: var(--accent-gold); font-size: 0.9rem; margin-bottom: 2px;">
            <i class="fas fa-bookmark"></i> ${res.title}
          </div>
          <div style="font-family: var(--font-serif); font-size: 0.95rem; line-height: 1.5;">"${res.text}"</div>
        `;
        item.onclick = () => openBookReader(res.book, res.chapter, res.verseNum);
      }
      container.appendChild(item);
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', executeSearch);
    searchInput.addEventListener('change', executeSearch);
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchInput.blur();
        executeSearch();
      }
    });
  }

  if (searchIcon) {
    searchIcon.style.pointerEvents = 'auto';
    searchIcon.style.cursor = 'pointer';
    searchIcon.addEventListener('click', executeSearch);
  }

  // CONTROLES DO PLANO DE LEITURA 365 DIAS
  const btnGoToToday = document.getElementById('btnGoToToday');
  if (btnGoToToday) {
    btnGoToToday.onclick = () => {
      triggerHapticFeedback();
      const todayNum = getTodayDayOfYear();
      const planDays = getReadingPlan();
      const todayItem = planDays.find(d => d.day === todayNum) || planDays[0];
      state.planMonth = todayItem.month;
      state.planFilter = 'all';
      state.planSearch = '';
      
      const searchInp = document.getElementById('planSearchInput');
      if (searchInp) searchInp.value = '';
      document.querySelectorAll('.plan-pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));

      renderPlan();

      setTimeout(() => {
        const el = document.getElementById(`plan_day_${todayNum}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
      showNativeToast(`Leitura de hoje: Dia ${todayNum}`);
    };
  }

  // Filtros de Status (Todos, Pendentes, Concluídos)
  document.querySelectorAll('.plan-pill').forEach(pill => {
    pill.onclick = () => {
      triggerHapticFeedback();
      document.querySelectorAll('.plan-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.planFilter = pill.getAttribute('data-filter');
      renderPlan();
    };
  });

  // Campo de Busca no Plano de Leitura
  const planSearchInput = document.getElementById('planSearchInput');
  if (planSearchInput) {
    planSearchInput.addEventListener('input', () => {
      state.planSearch = planSearchInput.value;
      renderPlan();
    });
  }
}
