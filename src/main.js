import '/src/styles/main.css';
import { BIBLE_BOOKS, getChapterVerses, getVerseOfTheDay, getFavorites, toggleFavorite, isFavorite } from './services/bibleData.js';
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
document.addEventListener('DOMContentLoaded', () => {
  initNativeFeatures();
  applyTheme(state.theme);
  renderHeroVerse();
  renderBooksGrid();
  setupEventListeners();
  renderGallery();
  renderPlan();
});

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
  document.getElementById('heroText').textContent = `"${v.text}"`;
  document.getElementById('heroRef').textContent = v.ref;
  
  document.getElementById('btnHeroShare').onclick = () => {
    triggerHapticFeedback();
    shareContent('Versículo do Dia - Bíblia Ave Maria', `"${v.text}" (${v.ref})`, 'https://bibliasagradaavemaria.com.br');
  };

  document.getElementById('btnHeroHomily').onclick = () => {
    triggerHapticFeedback();
    openHomilyModal(v.ref, v.text);
  };
}

// RENDERIZAR GRADE DE LIVROS (73 LIVROS AVE MARIA)
function renderBooksGrid() {
  const container = document.getElementById('booksGrid');
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
function openBookReader(book) {
  state.currentBook = book;
  state.currentChapter = 1;
  
  switchView('viewReader');
  document.getElementById('readerTitle').textContent = book.name;
  document.getElementById('readerSubtitle').textContent = `${book.chapters} Capítulos (${book.testament === 1 ? 'Antigo Testamento' : 'Novo Testamento'})`;

  renderChaptersGrid(book.chapters);
  renderChapterVerses(book.id, 1);
}

// RENDERIZAR BOTOES DE CAPÍTULOS
function renderChaptersGrid(totalChapters) {
  const grid = document.getElementById('chaptersGrid');
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
  container.innerHTML = '';

  document.getElementById('readerControls').classList.remove('hidden');
  document.getElementById('chapterNavBar').classList.remove('hidden');

  verses.forEach((vText, index) => {
    const verseNum = index + 1;
    const isFav = isFavorite(state.currentBook.name, chapterNum, verseNum);
    
    const vEl = document.createElement('div');
    vEl.className = 'verse-item';
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
  document.getElementById('btnPrevChapter').disabled = (chapterNum <= 1);
  document.getElementById('btnNextChapter').disabled = (chapterNum >= state.currentBook.chapters);
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
  container.innerHTML = '';

  const pct = getPlanProgressPercentage();
  document.getElementById('planProgressFill').style.width = `${pct}%`;
  document.getElementById('planProgressText').textContent = `${pct}% concluído (${planDays.filter(d => d.completed).length}/365 dias)`;

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
  document.getElementById('homilyModalRef').textContent = homily.reference;
  document.getElementById('homilyModalBody').innerHTML = homily.body;
  
  const modal = document.getElementById('homilyModal');
  modal.classList.add('active');

  document.getElementById('btnSpeakHomily').onclick = () => {
    triggerHapticFeedback();
    startAudioTrack(`Homilia sobre ${homily.reference}`, homily.body);
    modal.classList.remove('active');
  };
}

// BARRA DE ÁUDIO DE LEITURA
function startAudioTrack(title, textToSpeak) {
  const audioBar = document.getElementById('audioPlayerBar');
  document.getElementById('audioTrackTitle').textContent = title;
  audioBar.classList.remove('hidden');

  speakText(textToSpeak, () => {
    audioBar.classList.add('hidden');
  });
}

// TROCA DE VIEWS (ROUTING MOBILE)
function switchView(targetViewId) {
  const views = ['viewHome', 'viewReader', 'viewGallery', 'viewPlan', 'viewFavorites', 'viewSearch'];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', id !== targetViewId);
  });

  // Atualiza botões da navegação inferior
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === targetViewId);
  });

  if (targetViewId === 'viewFavorites') renderFavorites();
  if (targetViewId === 'viewPlan') renderPlan();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// SETUP DE LISTENERS DA INTERFACE
function setupEventListeners() {
  // Troca de Tema
  document.getElementById('btnThemeToggle').onclick = cycleTheme;

  // Botões do Modal Pix / Doação
  const donateModal = document.getElementById('donateModal');
  document.getElementById('btnDonateHeader').onclick = () => {
    triggerHapticFeedback();
    donateModal.classList.add('active');
  };
  document.getElementById('btnCloseDonate').onclick = () => donateModal.classList.remove('active');
  
  document.getElementById('btnCopyPix').onclick = () => {
    triggerHapticFeedback();
    const pix = document.getElementById('pixKeyText').textContent;
    navigator.clipboard.writeText(pix);
    showNativeToast('Chave Pix copiada com sucesso!');
  };

  // Botão Fechar Modal Homilia
  document.getElementById('btnCloseHomily').onclick = () => {
    document.getElementById('homilyModal').classList.remove('active');
  };

  // Botão Parar Áudio
  document.getElementById('btnStopAudio').onclick = () => {
    triggerHapticFeedback();
    stopAudio();
    document.getElementById('audioPlayerBar').classList.add('hidden');
  };

  // Botões de Tamanho de Fonte
  document.getElementById('btnFontPlus').onclick = () => {
    triggerHapticFeedback();
    if (state.currentVerseFontSize < 1.8) {
      state.currentVerseFontSize += 0.1;
      document.querySelectorAll('.verse-item').forEach(v => v.style.fontSize = `${state.currentVerseFontSize}rem`);
    }
  };
  document.getElementById('btnFontMinus').onclick = () => {
    triggerHapticFeedback();
    if (state.currentVerseFontSize > 0.8) {
      state.currentVerseFontSize -= 0.1;
      document.querySelectorAll('.verse-item').forEach(v => v.style.fontSize = `${state.currentVerseFontSize}rem`);
    }
  };

  // Navegação entre capítulos
  document.getElementById('btnPrevChapter').onclick = () => navigateChapter(-1);
  document.getElementById('btnNextChapter').onclick = () => navigateChapter(1);
  document.getElementById('btnBackToHome').onclick = () => {
    triggerHapticFeedback();
    switchView('viewHome');
  };

  // Ouvir Capítulo inteiro
  document.getElementById('btnListenChapter').onclick = () => {
    if (!state.currentBook) return;
    triggerHapticFeedback();
    const verses = getChapterVerses(state.currentBook.id, state.currentChapter);
    const fullText = verses.join('. ');
    startAudioTrack(`${state.currentBook.name} Capitulo ${state.currentChapter}`, fullText);
  };

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
    btn.onclick = () => {
      triggerHapticFeedback();
      const target = btn.getAttribute('data-target');
      switchView(target);
    };
  });

  // Busca em Tempo Real
  const searchInput = document.getElementById('searchInput');
  searchInput.oninput = (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length < 2) {
      if (!document.getElementById('viewSearch').classList.contains('hidden')) {
        switchView('viewHome');
      }
      return;
    }

    switchView('viewSearch');
    const container = document.getElementById('searchResultsList');
    container.innerHTML = '';

    const matchedBooks = BIBLE_BOOKS.filter(b => b.name.toLowerCase().includes(query) || b.abbrev.toLowerCase().includes(query));
    document.getElementById('searchSubtitle').textContent = `Encontrados ${matchedBooks.length} livro(s) com "${query}"`;

    matchedBooks.forEach(b => {
      const item = document.createElement('div');
      item.className = 'verse-item';
      item.innerHTML = `
        <div style="font-weight: 700; color: var(--accent-gold); font-size: 1rem;">${b.name} (${b.abbrev})</div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${b.chapters} capítulos • ${b.category}</div>
      `;
      item.onclick = () => openBookReader(b);
      container.appendChild(item);
    });
  };
}
