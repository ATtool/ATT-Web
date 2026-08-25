/* =========================================================
   Adventist Tamil Tool (ATT) - Core Application Logic
   Motto: “Abide in Christ, and be kept by His power.” – DA 324
   ========================================================= */

const MANNA_GIST_URL = 'https://gist.githubusercontent.com/ATtool/e3a8241e07503969cb06448a32eb4382/raw/manna.json';

// Global App State
const APP_STATE = {
  mannaFontSize: 16,
  currentDevotionText: '',
  isSpeaking: false,
  booksSearchQuery: ''
};

// Complete EGW Books Dataset
const EGW_BOOKS_DATA = [
  { id: 'promises', title_tamil: 'ஆண்டவர் அருளிய வாக்குத்தத்தங்களும்', title_english: 'God Has Promised', pdf_url: 'https://drive.google.com/uc?export=download&id=10lMvcxSlx9QV7rHxBgEgZFQCokVWwlmN', website_url: null },
  { id: 'health_food', title_tamil: 'ஆரோக்கிய உணவு ஊழியம்', title_english: 'Health Food Ministry', pdf_url: 'https://drive.google.com/uc?export=download&id=1_NWxOEcd-IlDnfBpS7F--27IgSUDL2Zq', website_url: null },
  { id: 'healthy_living', title_tamil: 'ஆரோக்கியமான வாழ்வு', title_english: 'Healthy Living', pdf_url: 'https://drive.google.com/uc?export=download&id=1TMwptMzbnWwBAs4dHUpq5BjhNQLW5mxf', website_url: null },
  { id: 'prophets_kings', title_tamil: 'இராஜ்ஜாக்களும் தீர்க்கதரிசிகளும்', title_english: 'Prophets and Kings', pdf_url: null, website_url: 'https://m.egwwritings.org/ta/book/14180.2#0' },
  { id: 'egw_life', title_tamil: 'எலன் ஜி. உவைட்டின் ஜீவியமும் உபதேசங்களும்', title_english: 'Life and Teachings of Ellen G. White', pdf_url: null, website_url: 'https://m.egwwritings.org/ta/book/12283.2#0' },
  { id: 'acts_apostles', title_tamil: 'எழும்பி பிரகாசித்த இயேசுவின் சீடர்கள்', title_english: 'Acts of the Apostles', pdf_url: 'https://drive.google.com/uc?export=download&id=1bCe92gsV1_LUlEDcSXqibtTdVcSAR_Ts', website_url: null },
  { id: 'space_travel', title_tamil: 'ஏழுநாள் விண்வெளி பயணம்', title_english: '7 Day Space Travel', pdf_url: 'https://drive.google.com/uc?export=download&id=1SlWBlAdW4flZuNSVzu9FofjqhFaVeie3', website_url: null },
  { id: 'last_day_events', title_tamil: 'கடைசி கால சம்பவங்கள்', title_english: 'Last Day Events', pdf_url: 'https://drive.google.com/uc?export=download&id=1ShOXBYMsHWxFIW8rH_p49gYCGL7bhny8', website_url: 'https://m.egwwritings.org/ta/book/14108.2#0' },
  { id: 'education', title_tamil: 'கல்வி', title_english: 'Education', pdf_url: 'https://drive.google.com/uc?export=download&id=1w0kMHJpVCBVTlNzg8pEUFFOT-eNunI2L', website_url: null },
  { id: 'christian_service', title_tamil: 'கிறிஸ்தவச் சேவை', title_english: 'Christian Service', pdf_url: null, website_url: 'https://m.egwwritings.org/ta/book/14290.2#0' },
  { id: 'steps_to_christ', title_tamil: 'கிறிஸ்துவிடம் செல்லும் பாதை', title_english: 'Steps to Christ', pdf_url: 'https://drive.google.com/uc?export=download&id=18Y9TTBHDWZkXN8BTsAfxAei8NylBDu7_', website_url: 'https://m.egwwritings.org/ta/book/11804.2#0' },
  { id: 'object_lessons', title_tamil: 'கிறிஸ்துவின் உவமைப்பாடங்கள்', title_english: "Christ's Object Lessons", pdf_url: 'https://drive.google.com/uc?export=download&id=1Q400or1lJc55O8SjRPh4HAQKdaHZojbJ', website_url: null },
  { id: 'child_guidance', title_tamil: 'குழந்தை வளர்ப்பிர்கான ஆலோசனை', title_english: 'Child Guidance', pdf_url: 'https://drive.google.com/uc?export=download&id=1ewfsq5rzX3QEp9YsJjOU3YYdUrVbtNI9', website_url: null },
  { id: 'patriarchs_prophets', title_tamil: 'கோத்திரப்பிதாக்களும் தீர்க்கதரிசிகளும்', title_english: 'Patriarchs and Prophets', pdf_url: null, website_url: 'https://m.egwwritings.org/ta/book/14229.2#0' },
  { id: 'counsels_church', title_tamil: 'சபைகளுக்கு ஆலோசனை', title_english: 'Counsels for the Church', pdf_url: 'https://drive.google.com/uc?id=1xUYbK0RZwyBDSWX8bbg_wDn3SNokwf6S', website_url: 'https://m.egwwritings.org/ta/book/12000.2#0' },
  { id: 'selected_messages', title_tamil: 'தேர்ந்தெடுக்கப்பட்ட தூதுகள்', title_english: 'Selected Messages', pdf_url: 'https://drive.google.com/uc?export=download&id=1KTmBktYa612W3BNPOV9ygnpjuviwg0P4', website_url: null },
  { id: 'our_prayers', title_tamil: 'நமது ஜெபங்களும் ஆண்டவர் அருளிய வாக்குத்தத்தங்களும்', title_english: "Our Prayers & God's Promises", pdf_url: 'https://drive.google.com/uc?export=download&id=1LeSJfUGF0TrJrtHIExxYkQmgmlMG4-Lu', website_url: null },
  { id: 'rock_feast', title_tamil: 'நித்திய கன்மலை வழங்கும் சத்திய விருந்து', title_english: 'Feast from the Eternal Rock', pdf_url: 'https://drive.google.com/uc?export=download&id=1GZBO358tFtM2hC0Fq1jczkEbXwtLxSHI', website_url: null },
  { id: 'early_writings', title_tamil: 'பரம தரிசனங்கள்', title_english: 'Early Writings', pdf_url: 'https://drive.google.com/uc?export=download&id=17tfn2H_wugHoubMBGGfkiRYWcGqjfJia', website_url: null },
  { id: 'great_controversy_1', title_tamil: 'மகா சர்ச்சை', title_english: 'The Great Controversy', pdf_url: 'https://drive.google.com/uc?export=download&id=1SUQN4kpzyVZwhBa_L7zQQBkdvsYE6zum', website_url: 'https://m.egwwritings.org/ta/book/13906.2#0' },
  { id: 'great_controversy_2', title_tamil: 'மாபெரும் ஆன்மீக போராட்டம்', title_english: 'The Great Controversy (Variant)', pdf_url: 'https://drive.google.com/uc?export=download&id=1VhHjDqWs0xoFBepPhY4obrU6QCKcVUSQ', website_url: 'https://m.egwwritings.org/ta/book/14718.1#0' },
  { id: 'maranatha', title_tamil: 'மாரநாதா', title_english: 'Maranatha', pdf_url: 'https://drive.google.com/uc?export=download&id=1pLlAhPChFfZgTetMzbk0ytvHxT9LteG9', website_url: 'https://m.egwwritings.org/ta/book/12544.2#0' },
  { id: 'story_redemption', title_tamil: 'மீட்பின் வரலாறு', title_english: 'Story of Redemption', pdf_url: 'https://drive.google.com/uc?export=download&id=1-6RumoCgn0R2tQp4e8GYCgFlRJPNXDxP', website_url: null },
  { id: 'desire_of_ages', title_tamil: 'யுகங்களின் வாஞ்சை', title_english: 'The Desire of Ages', pdf_url: 'https://drive.google.com/uc?export=download&id=1xfqPO3Kt7CEEnpcEBxd1eveknK4c036X', website_url: null },
  { id: 'messages_young', title_tamil: 'வாலிபர்களுக்கான ஆலோசனைகள்', title_english: 'Messages to Young People', pdf_url: 'https://drive.google.com/uc?export=download&id=18XUgFHwSMQh3CUI2IDMaFmFyVPMmecW8', website_url: null },
  { id: 'appeal_mothers', title_tamil: 'Appeal to Mothers', title_english: 'Appeal to Mothers', pdf_url: 'https://drive.google.com/uc?export=download&id=1w1by6BbGx4FSqcc-jGMj8xo95gKPqStv', website_url: null },
  { id: 'female_modesty', title_tamil: 'Female Modesty', title_english: 'Female Modesty', pdf_url: 'https://drive.google.com/uc?export=download&id=14VjT5TwvZj0neygsUk0K3-2CvgDSSUdv', website_url: null },
  { id: 'obedience_law', title_tamil: 'Obedience to the Law of God', title_english: 'Obedience to the Law of God', pdf_url: 'https://drive.google.com/uc?export=download&id=1cnlwMMJz3KTdJmU2yTNw_I6W4MI1n9wZ', website_url: null },
  { id: 'our_example', title_tamil: 'Our Example', title_english: 'Our Example', pdf_url: 'https://drive.google.com/uc?export=download&id=1AfAOB1VNTmZetmB8X0zRFy1rwQ2n45vY', website_url: null },
  { id: 'marriage_relation', title_tamil: 'The Marriage Relation', title_english: 'The Marriage Relation', pdf_url: 'https://drive.google.com/uc?export=download&id=1y_1ZnLnCJOpvQQMWD84c9_BEjB9nvXc-', website_url: null }
];

// Toast Notification Utility
function showToast(message, icon = '✨') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${icon} ${message}`;
  
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  navigate('home');
});

// View Navigation Switcher
function navigate(viewName) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const activeIndex = { home: 0, songs: 1, books: 2, about: 3 }[viewName] ?? 0;
  const navItems = document.querySelectorAll('.nav-item');
  if (navItems[activeIndex]) {
    navItems[activeIndex].classList.add('active');
  }

  const container = document.getElementById('main-content');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Stop any active speech when navigating
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    APP_STATE.isSpeaking = false;
  }

  switch (viewName) {
    case 'home': renderHome(container); break;
    case 'songs': 
      if (typeof renderSongsMainHub === 'function') {
        renderSongsMainHub(container);
      } else {
        renderSongsMenu(container);
      }
      break;
    case 'books': renderBooksMenu(container); break;
    case 'about': renderAbout(container); break;
    default: renderHome(container);
  }
}

// Render Home Screen
function renderHome(container) {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('ta-IN', options);

  container.innerHTML = `
    <div style="text-align: center;">
      <div class="date-badge">📅 ${formattedDate}</div>
    </div>

    <!-- Daily Devotional Manna Card -->
    <section class="card devotion-card" id="manna-card">
      <div class="card-header-flex">
        <h2 class="card-title">✨ இன்றைய மன்னா</h2>
        <div class="devotion-actions">
          <button class="btn-icon-soft btn-audio-listen" id="btn-listen-manna" onclick="toggleSpeakDevotion()" title="Listen to Manna Voice">
            🔊 <span id="listen-btn-text">கேட்க</span>
          </button>
          <button class="btn-icon-soft" onclick="copyDevotionVerse()" title="Copy Verse">
            📋 நகல்
          </button>
        </div>
      </div>
      
      <div id="manna-content" class="card-body">
        <p class="loading-text" style="color: var(--text-secondary); font-size: 0.9rem;">மன்னாவை ஏற்றுகிறது (Loading Daily Manna)...</p>
      </div>

      <!-- Devotional Text Controls -->
      <div style="display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top: 12px; border-top: 1px solid var(--border-color); padding-top: 10px;">
        <span style="font-size: 0.75rem; color: var(--text-muted);">எழுத்து அளவு:</span>
        <button class="btn-icon-soft" style="padding: 3px 8px;" onclick="changeMannaFontSize(-1)">A-</button>
        <button class="btn-icon-soft" style="padding: 3px 8px;" onclick="changeMannaFontSize(1)">A+</button>
      </div>
    </section>

    <!-- Quick Action Hub Grid -->
    <section class="hub-grid">
      <div class="hub-card" onclick="navigate('songs')">
        <span class="hub-icon">🎵</span>
        <h3 class="hub-title-text">பாடல்கள்</h3>
        <p class="hub-desc-text">சீயோன் & திருமறை</p>
      </div>

      <div class="hub-card" onclick="navigate('books')">
        <span class="hub-icon">📚</span>
        <h3 class="hub-title-text">ஆவிக்குரிய நூலகம்</h3>
        <p class="hub-desc-text">EGW புத்தகங்கள்</p>
      </div>

      <div class="hub-card" onclick="openFavoritesView()">
        <span class="hub-icon">❤️</span>
        <h3 class="hub-title-text">விருப்பமானவை</h3>
        <p class="hub-desc-text">சேமித்த பாடல்கள்</p>
      </div>

      <div class="hub-card" onclick="navigate('about')">
        <span class="hub-icon">✝️</span>
        <h3 class="hub-title-text">ஆராதனை வழிகாட்டி</h3>
        <p class="hub-desc-text">ATT செயலி தகவல்</p>
      </div>
    </section>
  `;

  fetchTodaysManna();
}

async function fetchTodaysManna() {
  const mannaContainer = document.getElementById('manna-content');
  if (!mannaContainer) return;
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  try {
    const response = await fetch(MANNA_GIST_URL, { cache: 'no-cache' });
    const rawData = await response.json();
    const devotion = rawData.devotions && rawData.devotions[dateKey];

    if (devotion) {
      renderDevotionText(devotion.title || 'இன்றைய தியானம்', devotion.verse || '', devotion.message || devotion.text || '');
    } else {
      // Graceful inspirational fallback if date key missing in gist
      renderDevotionText(
        'கர்த்தருடைய இரக்கங்கள் முடிவில்லாதவை', 
        'அவைகள் காலைதோறும் புதியவைகள்; உமது உண்மை பெரிதாயிருக்கிறது. – புலம்பல் 3:22,23',
        'தேவனின் புதிய இரக்கம் இன்று காலை உங்களை அரவணைக்கிறது. அவரது சர்வவல்லமையுள்ள கரத்தில் நம் வாழ்க்கையை ஒப்படைத்து, அவர் தரும் சமாதானத்தோடும் தைரியத்தோடும் இந்த நாளைத் தொடங்குவோம்.'
      );
    }
  } catch (error) {
    // Offline / Network fallback
    renderDevotionText(
      'தேவனின் வாக்குத்தத்தம்', 
      'பயப்படாதே, நான் உன்னுடனே இருக்கிறேன்; திகையாதே, நான் உன் தேவன். – ஏசாயா 41:10',
      'அன்றாட வாழ்க்கையின் சோதனைகளில் கர்த்தர் நம்மைத் தாங்குவார். அவரது வார்த்தை நமக்கு வெளிச்சமும் நம்பிக்கையுமாய் இருக்கிறது.'
    );
  }
}

function renderDevotionText(title, verse, text) {
  const mannaContainer = document.getElementById('manna-content');
  if (!mannaContainer) return;

  APP_STATE.currentDevotionText = `${title}. ${verse}. ${text}`;

  mannaContainer.innerHTML = `
    <h3 class="manna-heading">${title}</h3>
    ${verse ? `<blockquote class="manna-verse" id="devotion-verse-el">“${verse}”</blockquote>` : ''}
    <div class="manna-text" id="manna-text-body" style="font-size: ${APP_STATE.mannaFontSize}px;">
      ${(text || '').replace(/\n/g, '<br><br>')}
    </div>
  `;
}

function changeMannaFontSize(delta) {
  const newSize = Math.max(14, Math.min(26, APP_STATE.mannaFontSize + delta));
  APP_STATE.mannaFontSize = newSize;
  const textEl = document.getElementById('manna-text-body');
  if (textEl) textEl.style.fontSize = `${newSize}px`;
}

function copyDevotionVerse() {
  const verseEl = document.getElementById('devotion-verse-el');
  const text = verseEl ? verseEl.innerText : APP_STATE.currentDevotionText;
  if (!text) return;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    showToast('வாக்குத்தத்த வசனம் நகலெடுக்கப்பட்டது!', '📋');
  } else {
    showToast('வாக்குத்தத்தம்: ' + text.substring(0, 30) + '...', '✨');
  }
}

function toggleSpeakDevotion() {
  if (!('speechSynthesis' in window)) {
    showToast('உங்கள் உலாவியில் குரல் வாசிப்பு வசதி இல்லை.', '⚠️');
    return;
  }

  const btn = document.getElementById('btn-listen-manna');
  const btnText = document.getElementById('listen-btn-text');

  if (APP_STATE.isSpeaking) {
    window.speechSynthesis.cancel();
    APP_STATE.isSpeaking = false;
    if (btn) btn.classList.remove('playing');
    if (btnText) btnText.innerText = 'கேட்க';
    showToast('குரல் வாசிப்பு நிறுத்தப்பட்டது', '⏹️');
  } else {
    if (!APP_STATE.currentDevotionText) return;

    const utterance = new SpeechSynthesisUtterance(APP_STATE.currentDevotionText);
    utterance.rate = 0.9;
    
    // Select Tamil voice if available
    const voices = window.speechSynthesis.getVoices();
    const taVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('TA'));
    if (taVoice) utterance.voice = taVoice;

    utterance.onend = () => {
      APP_STATE.isSpeaking = false;
      if (btn) btn.classList.remove('playing');
      if (btnText) btnText.innerText = 'கேட்க';
    };

    window.speechSynthesis.speak(utterance);
    APP_STATE.isSpeaking = true;
    if (btn) btn.classList.add('playing');
    if (btnText) btnText.innerText = 'நிறுத்து';
    showToast('மன்னா வாசிக்கப்படுகிறது...', '🔊');
  }
}

function openFavoritesView() {
  if (typeof openSongBook === 'function') {
    openSongBook('zion');
    if (typeof SONGS_STATE !== 'undefined') {
      SONGS_STATE.showFavoritesOnly = true;
      if (typeof renderBookListView === 'function') renderBookListView();
    }
  } else {
    navigate('songs');
  }
}

// Fallback Songbook Logic
function renderSongsMenu(container) {
  if (typeof renderSongsMainHub === 'function') {
    renderSongsMainHub(container);
  }
}

// Render EGW Books Library
function renderBooksMenu(container) {
  APP_STATE.booksSearchQuery = '';

  container.innerHTML = `
    <div style="margin-bottom: 20px;">
      <h2 style="color: var(--color-primary); font-size: 1.5rem; font-family: var(--font-tamil-title); margin-bottom: 4px;">📚 ஆவிக்குரிய நூலகம்</h2>
      <p style="color: var(--text-secondary); font-size: 0.85rem;">Ellen G. White Writings in Tamil</p>
    </div>

    <!-- Live Search Input for Books -->
    <div class="search-pill books-search-box">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#8E94A3" style="margin-right: 8px;"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      <input type="text" id="books-search-input" placeholder="Search books in Tamil / English..." oninput="onBooksSearchInput(this.value)" />
    </div>

    <div id="books-list-container" class="books-list">
      ${generateBooksListHtml(EGW_BOOKS_DATA)}
    </div>
  `;
}

function generateBooksListHtml(books) {
  if (books.length === 0) {
    return `<div class="empty-search-placeholder"><p>No books found matching your search.</p></div>`;
  }

  return books.map(book => {
    let actionButtons = '';
    if (book.website_url) {
      actionButtons += `<a href="${book.website_url}" target="_blank" rel="noopener" class="btn-online">🌐 Read Online</a>`;
    }
    if (book.pdf_url) {
      actionButtons += `<a href="${book.pdf_url}" target="_blank" rel="noopener" class="btn-pdf">📥 PDF Download</a>`;
    }

    return `
      <div class="book-card">
        <h3 class="book-title-ta">${book.title_tamil}</h3>
        <p class="book-title-en">${book.title_english}</p>
        <div class="book-actions">${actionButtons}</div>
      </div>
    `;
  }).join('');
}

function onBooksSearchInput(val) {
  const term = val.toLowerCase().trim();
  const filtered = EGW_BOOKS_DATA.filter(b => 
    b.title_tamil.toLowerCase().includes(term) || 
    b.title_english.toLowerCase().includes(term)
  );

  const container = document.getElementById('books-list-container');
  if (container) {
    container.innerHTML = generateBooksListHtml(filtered);
  }
}

// Render About Screen
function renderAbout(container) {
  container.innerHTML = `
    <div class="card" style="text-align: center; padding: 24px 18px;">
      <svg class="header-cross-icon" viewBox="0 0 24 24" style="width: 42px; height: 42px; margin-bottom: 12px;">
        <path d="M10.5 2h3v7h7v3h-7v10h-3V12h-7V9h7V2z"/>
      </svg>
      
      <h2 style="color: var(--color-primary); margin-bottom: 6px; font-family: var(--font-main); font-size: 1.4rem;">Adventist Tamil Tool</h2>
      <p class="app-motto" style="color: var(--color-gold); margin-bottom: 18px; font-size: 0.85rem;">“Abide in Christ, and be kept by His power.” – DA 324</p>
      
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; text-align: left; margin-bottom: 18px;">
        <h4 style="color: var(--color-gold); margin-bottom: 8px; font-size: 0.95rem;">✨ சிறப்பம்சங்கள் (Features)</h4>
        <ul style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.8; padding-left: 18px;">
          <li>இன்றைய மன்னா (Daily Devotions & Audio Read)</li>
          <li>சீயோன் இனிய கீதங்கள் (Zion Songs with Search)</li>
          <li>திருமறைத்திருப் பாடல்கள் (நம்பிக்கையின் கீதங்கள் & பழைய புத்தக வரிசை)</li>
          <li>Ellen G. White தமிழ் ஆவிக்குரிய புத்தகங்கள் (EGW Library)</li>
          <li>அகர வரிசை & எண் வரிசை தேடல் (Tamil/Number Search)</li>
          <li>வாசிப்பு விருப்பங்கள் (Custom Text Size & Controls)</li>
        </ul>
      </div>

      <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.6;">
        Web Version PWA 2.0 Modern Edition<br>Built exclusively for Pr. KSM & Seventh-day Adventist Tamil Worshipers.
      </p>
    </div>
  `;
}
