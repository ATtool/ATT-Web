/* =========================================================
   Adventist Tamil Tool (ATT) - Modular Songbook Engine
   Translates ZionScreen, ThirumaraiHopeScreen, ThirumaraiOldScreen,
   and Global Search logic from React Native to Vanilla JS.
   ========================================================= */

const SONGS_STATE = {
  activeBook: null, // 'menu', 'zion', 'thiru_hope', 'thiru_old'
  searchQuery: '',
  isNumericKeyboard: true,
  showFavoritesOnly: false,
  sortOrder: 'number', // 'number' or 'alpha'
  selectedLetter: 'All',
  isAlphabetMode: false,
  selectedCategory: 'All',
  activeSongList: [],
  selectedSongIndex: null,
  activeGlobalSong: null,
  
  // Reading Preferences
  titleSize: 20,
  lyricsSize: 18,
  lyricsLineHeight: 32,
  lyricsSpacing: 0,
  
  // Favorites storage sets
  favsZion: new Set(JSON.parse(localStorage.getItem('@zion_favs') || '[]')),
  favsThiruHope: new Set(JSON.parse(localStorage.getItem('@thirumarai_favs') || '[]')),
  favsThiruOld: new Set(JSON.parse(localStorage.getItem('@thirumarai_old_favs') || '[]'))
};

// Colors matching React Native app design
const ACCENT_ZION = '#30D158';
const ACCENT_HOPE = '#FF9F0A';
const ACCENT_OLD = '#00F0FF';

/* ---------------------------------------------------------
   1. MAIN SONGS HUB MENU
   --------------------------------------------------------- */
function renderSongsMainHub(container) {
  SONGS_STATE.activeBook = 'menu';
  
  container.innerHTML = `
    <div class="songs-hub-header">
      <div>
        <h2 class="hub-title">பாடல் புத்தகங்கள்</h2>
        <p class="hub-subtitle">SONG BOOKS</p>
      </div>
      <button class="icon-circle-btn" onclick="openGlobalSearchModal()" title="Global Search">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#00F0FF"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      </button>
    </div>

    <div class="songs-menu-list">
      <!-- Box 1: Zion -->
      <div class="songbook-card zion-border" onclick="openSongBook('zion')">
        <div class="card-icon-wrap zion-bg">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="${ACCENT_ZION}"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </div>
        <div class="card-text-wrap">
          <div class="card-ta-title">சீயோன் இனிய கீதங்கள்</div>
        </div>
        <span class="chevron-arrow">›</span>
      </div>

      <!-- Box 2: Thirumarai Hope -->
      <div class="songbook-card hope-border" onclick="openSongBook('thiru_hope')">
        <div class="card-icon-wrap hope-bg">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="${ACCENT_HOPE}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        </div>
        <div class="card-text-wrap">
          <div class="card-ta-title">திருமறைத்திருப் பாடல்கள்</div>
          <div class="card-ta-subtitle">( நம்பிக்கையின் கீதங்கள் புத்தக வரிசை )</div>
        </div>
        <span class="chevron-arrow">›</span>
      </div>

      <!-- Box 3: Thirumarai Old -->
      <div class="songbook-card old-border" onclick="openSongBook('thiru_old')">
        <div class="card-icon-wrap old-bg">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="${ACCENT_OLD}"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
        </div>
        <div class="card-text-wrap">
          <div class="card-ta-title">திருமறைத்திருப் பாடல்கள்</div>
          <div class="card-ta-subtitle">( பழைய புத்தக வரிசை )</div>
        </div>
        <span class="chevron-arrow">›</span>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------
   2. GLOBAL SEARCH ENGINE (Zion + Hope + Old)
   --------------------------------------------------------- */
function getMasterGlobalList() {
  let master = [];

  // 1. Zion Songs
  if (typeof ZION_SONGS !== 'undefined') {
    ZION_SONGS.forEach((s, idx) => {
      master.push({
        global_id: `zion_${idx}`,
        source: 'சீயோன் இனிய கீதங்கள்',
        sourceColor: ACCENT_ZION,
        num: s.song_number || s.id || '?',
        title_tamil: s.title_tamil || 'Unknown Title',
        search_en: s.title_english || '',
        lyrics: s.lyrics,
        category: s.category || ''
      });
    });
  }

  // 2. Thirumarai Songs (Hope & Old)
  if (typeof THIRUMARAI_SONGS !== 'undefined') {
    THIRUMARAI_SONGS.forEach((s, idx) => {
      if (s.Song_number_by_Nambikaiyen_Geethagal != null && s.Song_number_by_Nambikaiyen_Geethagal !== '') {
        master.push({
          global_id: `thiru_hope_${idx}`,
          source: 'திருமறைத்திருப் பாடல் நம்பிக்கையின் கீதங்கள் புத்தக வரிசை',
          sourceColor: ACCENT_HOPE,
          num: s.Song_number_by_Nambikaiyen_Geethagal,
          title_tamil: s.title_tamil || 'Unknown Title',
          search_en: s.title_english || '',
          lyrics: s.lyrics
        });
      }
      if (s.song_number != null && s.song_number !== '') {
        master.push({
          global_id: `thiru_old_${idx}`,
          source: 'திருமறைத்திருப் பாடல் பழைய புத்தக வரிசை',
          sourceColor: ACCENT_OLD,
          num: s.song_number,
          title_tamil: s.title_tamil || 'Unknown Title',
          search_en: s.title_english || '',
          lyrics: s.lyrics
        });
      }
    });
  }

  return master;
}

function openGlobalSearchModal() {
  const modal = document.createElement('div');
  modal.id = 'global-search-modal';
  modal.className = 'full-modal';

  modal.innerHTML = `
    <div class="global-search-header">
      <button class="back-arrow-btn" onclick="closeGlobalSearchModal()">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      </button>
      <div class="search-input-box">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#8E94A3"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <input type="text" id="global-search-input" placeholder="Search all song books..." oninput="handleGlobalSearch(this.value)" autofocus />
      </div>
    </div>
    <div id="global-search-results" class="global-results-scroll">
      <div class="empty-search-placeholder">
        <p>Type an exact song number, or part of a Tamil/English title...</p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function closeGlobalSearchModal() {
  const modal = document.getElementById('global-search-modal');
  if (modal) modal.remove();
}

function handleGlobalSearch(query) {
  const resultsContainer = document.getElementById('global-search-results');
  if (!resultsContainer) return;
  const term = query.toLowerCase().trim();

  if (!term) {
    resultsContainer.innerHTML = `<div class="empty-search-placeholder"><p>Type an exact song number, or part of a Tamil/English title...</p></div>`;
    return;
  }

  const masterList = getMasterGlobalList();
  const filtered = masterList.filter(song => {
    const numStr = song.num ? song.num.toString().toLowerCase() : '';
    const tamStr = song.title_tamil ? song.title_tamil.toLowerCase() : '';
    const engStr = song.search_en ? song.search_en.toLowerCase() : '';
    
    // Exact match for numbers, substring match for words
    const isExactNumber = numStr === term;
    const isPartialText = tamStr.includes(term) || engStr.includes(term);
    return isExactNumber || isPartialText;
  }).slice(0, 70);

  if (filtered.length === 0) {
    resultsContainer.innerHTML = `<div class="empty-search-placeholder"><p>No songs found.</p></div>`;
    return;
  }

  resultsContainer.innerHTML = filtered.map(song => `
    <div class="global-song-row" onclick="openGlobalLyricViewer('${song.global_id}')">
      <div class="global-num-circle" style="border-color: ${song.sourceColor}; background: ${song.sourceColor}20; color: ${song.sourceColor};">
        ${song.num}
      </div>
      <div class="global-text-area">
        <div class="global-song-title">${song.title_tamil}</div>
        <div class="global-song-source" style="color: ${song.sourceColor};">${song.source}</div>
      </div>
      <span class="chevron-arrow" style="color: rgba(255,255,255,0.2);">›</span>
    </div>
  `).join('');
}

function openGlobalLyricViewer(globalId) {
  const masterList = getMasterGlobalList();
  const song = masterList.find(s => s.global_id === globalId);
  if (!song) return;

  closeGlobalSearchModal();
  renderLyricModal(song, song.source);
}

/* ---------------------------------------------------------
   3. INDIVIDUAL SONGBOOK LIST VIEW
   --------------------------------------------------------- */
function openSongBook(bookType) {
  SONGS_STATE.activeBook = bookType;
  SONGS_STATE.searchQuery = '';
  SONGS_STATE.showFavoritesOnly = false;
  SONGS_STATE.sortOrder = 'number';
  SONGS_STATE.selectedLetter = 'All';
  SONGS_STATE.isAlphabetMode = false;
  SONGS_STATE.selectedCategory = 'All';

  renderBookListView();
}

function getRawBookSongs(bookType) {
  if (bookType === 'zion') {
    return (typeof ZION_SONGS !== 'undefined' ? ZION_SONGS : []).map(s => ({
      id: s.id,
      song_number: s.song_number,
      title_tamil: s.title_tamil,
      title_english: s.title_english,
      category: s.category || '',
      lyrics: s.lyrics
    }));
  } else if (bookType === 'thiru_hope') {
    return (typeof THIRUMARAI_SONGS !== 'undefined' ? THIRUMARAI_SONGS : [])
      .filter(s => s.Song_number_by_Nambikaiyen_Geethagal != null && s.Song_number_by_Nambikaiyen_Geethagal !== '')
      .map(s => ({
        id: s.Song_number_by_Nambikaiyen_Geethagal,
        song_number: s.Song_number_by_Nambikaiyen_Geethagal,
        title_tamil: s.title_tamil,
        title_english: s.title_english,
        lyrics: s.lyrics
      }));
  } else if (bookType === 'thiru_old') {
    return (typeof THIRUMARAI_SONGS !== 'undefined' ? THIRUMARAI_SONGS : [])
      .filter(s => s.song_number != null && s.song_number !== '')
      .map(s => ({
        id: s.song_number,
        song_number: s.song_number,
        title_tamil: s.title_tamil,
        title_english: s.title_english,
        lyrics: s.lyrics
      }));
  }
  return [];
}

function getBookFavoritesSet(bookType) {
  if (bookType === 'zion') return SONGS_STATE.favsZion;
  if (bookType === 'thiru_hope') return SONGS_STATE.favsThiruHope;
  if (bookType === 'thiru_old') return SONGS_STATE.favsThiruOld;
  return new Set();
}

function saveBookFavorites(bookType) {
  if (bookType === 'zion') localStorage.setItem('@zion_favs', JSON.stringify([...SONGS_STATE.favsZion]));
  if (bookType === 'thiru_hope') localStorage.setItem('@thirumarai_favs', JSON.stringify([...SONGS_STATE.favsThiruHope]));
  if (bookType === 'thiru_old') localStorage.setItem('@thirumarai_old_favs', JSON.stringify([...SONGS_STATE.favsThiruOld]));
}

function toggleBookFavorite(songId, event) {
  if (event) event.stopPropagation();
  const favSet = getBookFavoritesSet(SONGS_STATE.activeBook);
  if (favSet.has(songId)) {
    favSet.delete(songId);
  } else {
    favSet.add(songId);
  }
  saveBookFavorites(SONGS_STATE.activeBook);
  renderBookListView();
}

function renderBookListView() {
  const container = document.getElementById('main-content');
  const bookType = SONGS_STATE.activeBook;
  const rawSongs = getRawBookSongs(bookType);
  const favSet = getBookFavoritesSet(bookType);

  // Compute Categories (Zion only)
  const categories = ['All', ...new Set(rawSongs.map(s => s.category).filter(Boolean))];

  // Compute Alphabet Letters
  const lettersSet = new Set();
  rawSongs.forEach(s => {
    if (s.title_tamil) {
      const match = s.title_tamil.match(/[\u0B85-\u0BB9][\u0BBE-\u0BCD]?|[A-Za-z]/);
      if (match) lettersSet.add(match[0].toUpperCase());
    }
  });
  const alphabetLetters = Array.from(lettersSet).sort((a, b) => a.localeCompare(b, 'ta'));

  // Filtering Logic
  let filtered = rawSongs.filter(song => {
    if (SONGS_STATE.showFavoritesOnly && !favSet.has(song.id)) return false;
    if (SONGS_STATE.selectedCategory !== 'All' && song.category !== SONGS_STATE.selectedCategory) return false;
    if (SONGS_STATE.selectedLetter !== 'All' && song.title_tamil) {
      const match = song.title_tamil.match(/[\u0B85-\u0BB9][\u0BBE-\u0BCD]?|[A-Za-z]/);
      const baseLetter = match ? match[0].toUpperCase() : '';
      if (baseLetter !== SONGS_STATE.selectedLetter) return false;
    }
    if (!SONGS_STATE.searchQuery.trim()) return true;

    const term = SONGS_STATE.searchQuery.toLowerCase().trim();
    const songNum = (song.song_number || song.id || '').toString();
    const searchTamil = (song.title_tamil || '').toLowerCase();
    const searchEng = (song.title_english || '').toString().toLowerCase();

    return songNum.includes(term) || searchTamil.includes(term) || searchEng.includes(term);
  });

  // Sorting Logic
  if (SONGS_STATE.sortOrder === 'alpha' || SONGS_STATE.selectedLetter !== 'All') {
    filtered.sort((a, b) => (a.title_tamil || '').localeCompare(b.title_tamil || ''));
  } else {
    filtered.sort((a, b) => parseInt(a.song_number || a.id || 0) - parseInt(b.song_number || b.id || 0));
  }

  SONGS_STATE.activeSongList = filtered;

  const hasFiltersActive = SONGS_STATE.searchQuery !== '' || SONGS_STATE.showFavoritesOnly || SONGS_STATE.sortOrder !== 'number' || SONGS_STATE.selectedLetter !== 'All' || SONGS_STATE.selectedCategory !== 'All';

  container.innerHTML = `
    <div class="book-header-sticky">
      <div class="search-top-row">
        <button class="back-arrow-btn" onclick="renderSongsMainHub(document.getElementById('main-content'))">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#00F0FF"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        </button>

        <div class="search-pill">
          <input type="${SONGS_STATE.isNumericKeyboard ? 'number' : 'text'}" 
                 id="song-search-input" 
                 placeholder="${SONGS_STATE.isNumericKeyboard ? 'Search Number...' : 'ஏசுவின் / Yesuvin'}" 
                 value="${SONGS_STATE.searchQuery}" 
                 oninput="onSongSearchInput(this.value)" />
          
          ${SONGS_STATE.searchQuery ? `
            <button class="clear-icon-btn" onclick="clearSongSearchInput()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#8E94A3"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
            </button>
          ` : ''}

          <div class="inline-toggle">
            <button class="toggle-btn ${!SONGS_STATE.isNumericKeyboard ? 'active' : ''}" onclick="toggleKeyboardMode(false)">ABC</button>
            <button class="toggle-btn ${SONGS_STATE.isNumericKeyboard ? 'active' : ''}" onclick="toggleKeyboardMode(true)">123</button>
          </div>
        </div>
      </div>

      <!-- Filter Chips Row -->
      <div class="chips-scroll-row">
        ${hasFiltersActive ? `
          <button class="chip-btn chip-clear" onclick="clearAllSongFilters()">
            ✕ Clear All
          </button>
        ` : ''}

        <button class="chip-btn ${SONGS_STATE.isAlphabetMode ? 'chip-active' : ''}" onclick="toggleSortMenuModal()">
          ${SONGS_STATE.sortOrder === 'number' ? '🔢 Sort' : '🔠 Sort'}
        </button>

        ${bookType === 'zion' ? `
          <button class="chip-btn ${SONGS_STATE.selectedCategory !== 'All' ? 'chip-active' : ''}" onclick="toggleCategoryModal()">
            🏷️ Category
          </button>
        ` : ''}

        <button class="chip-btn ${SONGS_STATE.showFavoritesOnly ? 'chip-fav-active' : ''}" onclick="toggleFavoritesOnlyFilter()">
          ${SONGS_STATE.showFavoritesOnly ? '❤️ Favorites' : '🤍 Favorites'}
        </button>
      </div>
    </div>

    <div id="songs-render-area">
      ${SONGS_STATE.isAlphabetMode ? `
        <div class="alphabet-grid-header" onclick="selectNumberOrderMode()">
          ← Back to Numbers
        </div>
        <div class="alphabet-5col-grid">
          ${alphabetLetters.map(letter => `
            <div class="alpha-grid-item" onclick="selectAlphabetLetter('${letter}')">
              ${letter}
            </div>
          `).join('')}
        </div>
      ` : `
        ${SONGS_STATE.selectedLetter !== 'All' ? `
          <div class="alphabet-grid-header" onclick="selectBackToAlphabetGrid()">
            ← அகர வரிசைக்குச் செல் (Back)
          </div>
        ` : ''}

        ${filtered.length === 0 ? `
          <div class="empty-search-placeholder">
            <p>No songs found matching your search.</p>
          </div>
        ` : `
          <div class="song-items-list">
            ${filtered.map((song, index) => {
              const isFav = favSet.has(song.id);
              return `
                <div class="song-list-card" onclick="openSongFromIndex(${index})">
                  <div class="song-num-bubble">${song.song_number || song.id}</div>
                  <div class="song-title-col">
                    <div class="song-ta-name">${song.title_tamil || 'Unknown'}</div>
                    ${song.category ? `<div class="song-category-sub">${song.category}</div>` : ''}
                  </div>
                  <button class="heart-btn" onclick="toggleBookFavorite(${song.id}, event)">
                    ${isFav ? '❤️' : '🤍'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        `}
      `}
    </div>

    <!-- Floating Scroll To Top Button -->
    <button id="fab-scroll-top" class="fab-scroll" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
      ↑
    </button>
  `;
}

function onSongSearchInput(val) {
  SONGS_STATE.searchQuery = val;
  if (SONGS_STATE.showFavoritesOnly) SONGS_STATE.showFavoritesOnly = false;
  if (SONGS_STATE.isAlphabetMode) SONGS_STATE.isAlphabetMode = false;
  if (SONGS_STATE.selectedLetter !== 'All') SONGS_STATE.selectedLetter = 'All';
  renderBookListView();
}

function clearSongSearchInput() {
  SONGS_STATE.searchQuery = '';
  renderBookListView();
}

function toggleKeyboardMode(isNumeric) {
  SONGS_STATE.isNumericKeyboard = isNumeric;
  renderBookListView();
  setTimeout(() => {
    const input = document.getElementById('song-search-input');
    if (input) input.focus();
  }, 50);
}

function clearAllSongFilters() {
  SONGS_STATE.searchQuery = '';
  SONGS_STATE.showFavoritesOnly = false;
  SONGS_STATE.sortOrder = 'number';
  SONGS_STATE.isAlphabetMode = false;
  SONGS_STATE.selectedLetter = 'All';
  SONGS_STATE.selectedCategory = 'All';
  renderBookListView();
}

function toggleFavoritesOnlyFilter() {
  SONGS_STATE.showFavoritesOnly = !SONGS_STATE.showFavoritesOnly;
  SONGS_STATE.searchQuery = '';
  SONGS_STATE.isAlphabetMode = false;
  SONGS_STATE.selectedLetter = 'All';
  renderBookListView();
}

function selectNumberOrderMode() {
  SONGS_STATE.sortOrder = 'number';
  SONGS_STATE.isAlphabetMode = false;
  SONGS_STATE.selectedLetter = 'All';
  renderBookListView();
}

function selectAlphabetLetter(letter) {
  SONGS_STATE.selectedLetter = letter;
  SONGS_STATE.isAlphabetMode = false;
  renderBookListView();
}

function selectBackToAlphabetGrid() {
  SONGS_STATE.isAlphabetMode = true;
  SONGS_STATE.selectedLetter = 'All';
  renderBookListView();
}

/* ---------------------------------------------------------
   4. MODALS (Sort & Category)
   --------------------------------------------------------- */
function toggleSortMenuModal() {
  const modal = document.createElement('div');
  modal.className = 'overlay-blur-modal';
  modal.id = 'sort-modal';

  modal.innerHTML = `
    <div class="center-card-modal">
      <div class="modal-card-title">Sort Options</div>
      <div class="modal-btn-row" onclick="applySortOption('number')">
        <span>🔢 எண் வரிசை (Number Order)</span>
      </div>
      <div class="modal-btn-row" onclick="applySortOption('alpha')">
        <span>🔠 அகர வரிசை (Alphabetical)</span>
      </div>
      <div class="modal-cancel-row" onclick="this.closest('#sort-modal').remove()">
        Cancel
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function applySortOption(order) {
  const modal = document.getElementById('sort-modal');
  if (modal) modal.remove();

  SONGS_STATE.sortOrder = order;
  SONGS_STATE.isAlphabetMode = (order === 'alpha');
  SONGS_STATE.selectedLetter = 'All';
  renderBookListView();
}

function toggleCategoryModal() {
  const rawSongs = getRawBookSongs('zion');
  const categories = ['All', ...new Set(rawSongs.map(s => s.category).filter(Boolean))];

  const modal = document.createElement('div');
  modal.className = 'overlay-blur-modal';
  modal.id = 'category-modal';

  modal.innerHTML = `
    <div class="center-card-modal scrollable-card">
      <div class="modal-card-title">Select Category</div>
      <div class="category-list-wrap">
        ${categories.map(cat => `
          <div class="category-item-row ${SONGS_STATE.selectedCategory === cat ? 'active' : ''}" onclick="applyCategoryOption('${cat}')">
            ${cat}
          </div>
        `).join('')}
      </div>
      <div class="modal-cancel-row" onclick="this.closest('#category-modal').remove()">
        Close
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function applyCategoryOption(cat) {
  const modal = document.getElementById('category-modal');
  if (modal) modal.remove();

  SONGS_STATE.selectedCategory = cat;
  SONGS_STATE.searchQuery = '';
  SONGS_STATE.showFavoritesOnly = false;
  SONGS_STATE.sortOrder = 'number';
  SONGS_STATE.isAlphabetMode = false;
  SONGS_STATE.selectedLetter = 'All';
  renderBookListView();
}

/* ---------------------------------------------------------
   5. FULL-SCREEN LYRIC READER & CONTROLS
   --------------------------------------------------------- */
function openSongFromIndex(index) {
  SONGS_STATE.selectedSongIndex = index;
  const song = SONGS_STATE.activeSongList[index];
  if (!song) return;

  const bookName = {
    'zion': 'சீயோன் கீதங்கள்',
    'thiru_hope': 'நம்பிக்கையின் கீதங்கள்',
    'thiru_old': 'திருமறைப் பாடல்கள்'
  }[SONGS_STATE.activeBook] || 'Songs';

  renderLyricModal(song, bookName);
}

function renderLyricModal(song, subtitle) {
  // Remove existing lyric modal if present
  const existing = document.getElementById('lyric-reader-modal');
  if (existing) existing.remove();

  // Parse Stanzas & Highlight Refrains starting with '~'
  const rawLines = (song.lyrics || '').split('\n');
  const processedHtml = rawLines.map((line, idx) => {
    const trimmed = line.trim();
    let isRefrain = false;
    if (trimmed.startsWith('~')) {
      const nextLine = rawLines[idx + 1];
      if (nextLine === undefined || nextLine.trim() === '') isRefrain = true;
    }
    if (isRefrain) {
      return `<span style="color: var(--color-primary); font-weight: bold;">${line}</span>`;
    }
    return line;
  }).join('<br>');

  const isFav = getBookFavoritesSet(SONGS_STATE.activeBook).has(song.id);

  const modal = document.createElement('div');
  modal.id = 'lyric-reader-modal';
  modal.className = 'full-modal';

  modal.innerHTML = `
    <div class="lyric-reader-header">
      <button class="back-arrow-btn" onclick="closeLyricReader()">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#FFD700"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </button>

      <div class="lyric-header-title-area">
        <h3 class="lyric-song-title" style="font-size: ${SONGS_STATE.titleSize}px;">
          ${song.song_number || song.id} - ${song.title_tamil}
        </h3>
        <p class="lyric-song-subtitle">${subtitle || ''}</p>
      </div>

      <div class="lyric-header-actions">
        <button class="text-pref-btn" onclick="toggleTextSettingsModal()">Aa</button>
        <button class="share-btn" onclick="shareSongLyrics()">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="#FFD700"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
        </button>
      </div>
    </div>

    <div id="lyric-scroll-body" class="lyric-body-container" style="font-size: ${SONGS_STATE.lyricsSize}px; line-height: ${SONGS_STATE.lyricsLineHeight}px; letter-spacing: ${SONGS_STATE.lyricsSpacing}px;">
      ${processedHtml}
    </div>

    <!-- Floating Navigation for Prev / Next / Favorite -->
    ${SONGS_STATE.selectedSongIndex !== null ? `
      <div class="bottom-float-bar">
        ${SONGS_STATE.selectedSongIndex > 0 ? `
          <button class="float-nav-btn" onclick="changeSongStep(-1)">
            ‹
          </button>
        ` : '<div></div>'}

        <div class="float-center-controls">
          <button class="heart-float-btn" onclick="toggleFavoriteInsideReader(${song.id})">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        ${SONGS_STATE.selectedSongIndex < SONGS_STATE.activeSongList.length - 1 ? `
          <button class="float-nav-btn" onclick="changeSongStep(1)">
            ›
          </button>
        ` : '<div></div>'}
      </div>
    ` : ''}
  `;

  document.body.appendChild(modal);
}

function closeLyricReader() {
  const modal = document.getElementById('lyric-reader-modal');
  if (modal) modal.remove();
  SONGS_STATE.selectedSongIndex = null;
}

function changeSongStep(delta) {
  const nextIdx = SONGS_STATE.selectedSongIndex + delta;
  if (nextIdx >= 0 && nextIdx < SONGS_STATE.activeSongList.length) {
    openSongFromIndex(nextIdx);
  }
}

function toggleFavoriteInsideReader(songId) {
  toggleBookFavorite(songId);
  const song = SONGS_STATE.activeSongList[SONGS_STATE.selectedSongIndex];
  if (song) renderLyricModal(song);
}

function shareSongLyrics() {
  const song = SONGS_STATE.activeSongList[SONGS_STATE.selectedSongIndex];
  if (!song) return;

  const shareText = `${song.song_number || song.id} - ${song.title_tamil}\n\n${song.lyrics}\n\n✨ Adventist Tamil Tool\nhttps://adventisttamil.app/`;

  if (navigator.share) {
    navigator.share({ title: song.title_tamil, text: shareText });
  } else {
    navigator.clipboard.writeText(shareText);
    alert('பாடல் வரிகள் நகலெடுக்கப்பட்டது (Copied to Clipboard)!');
  }
}

/* ---------------------------------------------------------
   6. TEXT SIZE & PREFERENCE MODAL
   --------------------------------------------------------- */
function toggleTextSettingsModal() {
  const modal = document.createElement('div');
  modal.className = 'overlay-blur-modal';
  modal.id = 'text-settings-modal';

  modal.innerHTML = `
    <div class="bottom-sheet-card">
      <div class="sheet-title-row">
        <h3>Reading Preferences</h3>
        <button class="close-sheet-btn" onclick="this.closest('#text-settings-modal').remove()">✕</button>
      </div>

      <div class="setting-item">
        <label>Title Size: <span id="val-title-size">${SONGS_STATE.titleSize}</span></label>
        <input type="range" min="16" max="30" value="${SONGS_STATE.titleSize}" oninput="updateReaderProp('titleSize', this.value)" />
      </div>

      <div class="setting-item">
        <label>Lyrics Font Size: <span id="val-lyrics-size">${SONGS_STATE.lyricsSize}</span></label>
        <input type="range" min="12" max="35" value="${SONGS_STATE.lyricsSize}" oninput="updateReaderProp('lyricsSize', this.value)" />
      </div>

      <div class="setting-item">
        <label>Line Spacing: <span id="val-line-height">${SONGS_STATE.lyricsLineHeight}</span></label>
        <input type="range" min="20" max="60" value="${SONGS_STATE.lyricsLineHeight}" oninput="updateReaderProp('lyricsLineHeight', this.value)" />
      </div>

      <div class="setting-item">
        <label>Letter Spacing: <span id="val-spacing">${SONGS_STATE.lyricsSpacing}</span></label>
        <input type="range" min="0" max="5" step="0.5" value="${SONGS_STATE.lyricsSpacing}" oninput="updateReaderProp('lyricsSpacing', this.value)" />
      </div>

      <button class="restore-defaults-btn" onclick="restoreReaderDefaults()">
        🔄 Restore Defaults
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

function updateReaderProp(prop, val) {
  SONGS_STATE[prop] = parseFloat(val);
  
  if (prop === 'titleSize') {
    const el = document.querySelector('.lyric-song-title');
    const label = document.getElementById('val-title-size');
    if (el) el.style.fontSize = `${val}px`;
    if (label) label.innerText = val;
  } else if (prop === 'lyricsSize') {
    const el = document.getElementById('lyric-scroll-body');
    const label = document.getElementById('val-lyrics-size');
    if (el) el.style.fontSize = `${val}px`;
    if (label) label.innerText = val;
  } else if (prop === 'lyricsLineHeight') {
    const el = document.getElementById('lyric-scroll-body');
    const label = document.getElementById('val-line-height');
    if (el) el.style.lineHeight = `${val}px`;
    if (label) label.innerText = val;
  } else if (prop === 'lyricsSpacing') {
    const el = document.getElementById('lyric-scroll-body');
    const label = document.getElementById('val-spacing');
    if (el) el.style.letterSpacing = `${val}px`;
    if (label) label.innerText = val;
  }
}

function restoreReaderDefaults() {
  SONGS_STATE.titleSize = 20;
  SONGS_STATE.lyricsSize = 18;
  SONGS_STATE.lyricsLineHeight = 32;
  SONGS_STATE.lyricsSpacing = 0;

  const modal = document.getElementById('text-settings-modal');
  if (modal) modal.remove();

  const song = SONGS_STATE.activeSongList[SONGS_STATE.selectedSongIndex];
  if (song) renderLyricModal(song);
}
