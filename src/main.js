import '/src/styles/main.css';
import { BIBLE_BOOKS, getChapterVerses, getVerseOfTheDay, getFavorites, toggleFavorite, isFavorite, searchBibleText } from './services/bibleData.js';
import { getAIHomilyReflection, speakText, stopAudio, isAudioPlaying } from './services/homilyService.js';
import { getReadingPlan, toggleDayCompleted, getPlanProgressPercentage } from './services/planService.js';
import { initNativeFeatures, triggerHapticFeedback, shareContent, showNativeToast } from './services/nativeService.js';

// ESTADO GLOBAL DA APLICAÇÃO
const state = {
  currentTestament: 0, // 0: Todos, 1: Antigo, 2: Novo
  currentBook: null,
  currentChapter: 1,
  currentVerseFontSize: 1.125, // rem
  theme: localStorage.getItem('avemaria_theme') || 'navy'
};

// INICIALIZAÇÃO DO APP
function initApp() {
  initNativeFeatures();
  applyTheme(state.theme);
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

// RENDEREIZAR HERO - VERSÍCULO DO DIA
function renderHeroVerse() {
  const v = getVerseOfTheDay();
  const heroTextEl = document.getElementById('heroText');
  const heroRefEl = document.getElementById('heroRef');
  
  if (heroTextEl) heroTextEl.textContent = `"${v.text}"`;
  if (heroRefEl) heroRefEl.textContent = v.ref;
  
  const shareBtn = document.getElementById('btnHeroShare');
  if (shareBtn) {
    shareBtn.onclick = () => {
      triggerHapticFeedback();
      shareContent('Versículo do Dia - Bíblia Ave Maria', `"${v.text}" (${v.ref})`, 'https://bibliasagradaavemaria.com.br');
    };
  }

  const homilyBtn = document.getElementById('btnHeroHomily');
  if (homilyBtn) {
    homilyBtn.onclick = () => {
      triggerHapticFeedback();
      openHomilyModal(v.ref, v.text);
    };
  }
}

// RENDERIZAR GRADE DE LIVROS (73 LIVROS AVE MARIA)
function renderBooksGrid() {
  const container = document.getElementById('booksGrid');
  if (!container) return;
  container.innerHTML = '';

  const filtered = BIBLE_BOOKS.filter(b => {
    if (state.currentTestament === 0) return true;
    return b.testament === state.currentTestament;
  });

  filtered.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <span class="book-abbrev">${book.abbrev}</span>
      <div class="book-name">${book.name}</div>
      <div class="book-chapters-count">${book.chapters} capítulos • ${book.category}</div>
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

// RENDERIZAR GALERIA DE MEDITAÇÃO
function renderGallery() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;
  container.innerHTML = '';

  const galleryItems = [
    { text: "O Senhor é a minha luz e a minha salvação; a quem temerei?", ref: "Salmos 27, 1", bg: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)" },
    { text: "Vinde a mim, todos vós que estais cansados e oprimidos, e eu vos aliviarei.", ref: "São Mateus 11, 28", bg: "linear-gradient(135deg, #311b92 0%, #4a148c 100%)" },
    { text: "O amor tudo desculpa, tudo crê, tudo espera, tudo suporta.", ref: "1 Coríntios 13, 7", bg: "linear-gradient(135deg, #881337 0%, #4c0519 100%)" },
    { text: "O Senhor te abençoe e te guarde; faça resplandecer o seu rosto sobre ti.", ref: "Números 6, 24-25", bg: "linear-gradient(135deg, #14532d 0%, #064e3b 100%)" }
  ];

  galleryItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <div class="gallery-card-img-box" style="background: ${item.bg}">
        <div class="gallery-verse-text">"${item.text}"</div>
        <div class="gallery-verse-ref">${item.ref}</div>
      </div>
      <div class="gallery-card-body">
        <button class="btn-secondary btn-share-g" style="padding: 6px 12px; font-size: 0.8rem;">
          <i class="fab fa-whatsapp"></i> Compartilhar
        </button>
      </div>
    `;
    card.querySelector('.btn-share-g').onclick = () => {
      triggerHapticFeedback();
      shareContent(item.ref, `"${item.text}" (${item.ref})`, 'https://bibliasagradaavemaria.com.br');
    };
    container.appendChild(card);
  });
}

// RENDERIZAR PLANO DE LEITURA 365 DIAS
function renderPlan() {
  const planDays = getReadingPlan();
  const container = document.getElementById('planDaysList');
  if (!container) return;
  container.innerHTML = '';

  const pct = getPlanProgressPercentage();
  const fillEl = document.getElementById('planProgressFill');
  const txtEl = document.getElementById('planProgressText');
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (txtEl) txtEl.textContent = `${pct}% concluído (${planDays.filter(d => d.completed).length}/365 dias)`;

  // Renderiza os primeiros 30 dias para alta performance
  planDays.slice(0, 30).forEach(day => {
    const item = document.createElement('div');
    item.className = `plan-day-item ${day.completed ? 'completed' : ''}`;
    item.innerHTML = `
      <div>
        <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${day.title}</div>
        <div style="font-size: 0.8rem; color: var(--accent-gold); margin-top: 2px;">${day.read}</div>
      </div>
      <div class="plan-checkbox">
        ${day.completed ? '<i class="fas fa-check"></i>' : ''}
      </div>
    `;
    item.onclick = () => {
      triggerHapticFeedback();
      const isDone = toggleDayCompleted(day.day);
      renderPlan();
      showNativeToast(isDone ? 'Dia concluído!' : 'Dia desmarcado.');
    };
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

  if (targetViewId === 'viewFavorites') renderFavorites();
  if (targetViewId === 'viewPlan') renderPlan();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// SETUP DE LISTENERS DA INTERFACE
function setupEventListeners() {
  // Troca de Tema
  const themeToggleBtn = document.getElementById('btnThemeToggle');
  if (themeToggleBtn) themeToggleBtn.onclick = cycleTheme;

  // Botões do Modal Pix / Doação
  const donateModal = document.getElementById('donateModal');
  const donateHeaderBtn = document.getElementById('btnDonateHeader');
  const donateHeroBtn = document.getElementById('btnHeroDonate');
  
  const openDonate = () => {
    triggerHapticFeedback();
    if (donateModal) donateModal.classList.add('active');
  };
  
  if (donateHeaderBtn) donateHeaderBtn.onclick = openDonate;
  if (donateHeroBtn) donateHeroBtn.onclick = openDonate;
  
  const closeDonateBtn = document.getElementById('btnCloseDonate');
  if (closeDonateBtn && donateModal) {
    closeDonateBtn.onclick = () => donateModal.classList.remove('active');
  }
  
  const copyPixBtn = document.getElementById('btnCopyPix');
  if (copyPixBtn) {
    copyPixBtn.onclick = () => {
      triggerHapticFeedback();
      const pixKeyTextEl = document.getElementById('pixKeyText');
      if (pixKeyTextEl) {
        navigator.clipboard.writeText(pixKeyTextEl.textContent);
        showNativeToast('Chave Pix copiada com sucesso!');
      }
    };
  }

  // Botão Fechar Modal Homilia
  const closeHomilyBtn = document.getElementById('btnCloseHomily');
  const homilyModal = document.getElementById('homilyModal');
  if (closeHomilyBtn && homilyModal) {
    closeHomilyBtn.onclick = () => homilyModal.classList.remove('active');
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
}
