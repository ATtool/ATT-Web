/* =========================================================
   Adventist Tamil Tool (ATT) - Core Application Logic
   Motto: “Abide in Christ, and be kept by His power.” – DA 324
   ========================================================= */

const MANNA_GIST_URL = 'https://gist.githubusercontent.com/ATtool/e3a8241e07503969cb06448a32eb4382/raw/manna.json';

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

  switch (viewName) {
    case 'home': renderHome(container); break;
    case 'songs': renderSongsMenu(container); break;
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
    <div class="date-badge">${formattedDate}</div>
    <section class="card devotion-card" id="manna-card">
      <div class="card-header">
        <h2 class="card-title">✨ இன்றைய மன்னா (Today's Manna)</h2>
      </div>
      <div id="manna-content" class="card-body">
        <p class="loading-text">மன்னாவை ஏற்றுகிறது (Loading devotion)...</p>
      </div>
    </section>
    <section class="hub-grid">
      <div class="hub-card" onclick="navigate('songs')">
        <span class="hub-icon">🎵</span><h3>பாடல்கள்</h3><p>சீயோன் & திருமறைப் பாடல்கள்</p>
      </div>
      <div class="hub-card" onclick="navigate('books')">
        <span class="hub-icon">📚</span><h3>நூலகம்</h3><p>EGW ஆவிக்குரிய புத்தகங்கள்</p>
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
      mannaContainer.innerHTML = `
        <h3 class="manna-heading">${devotion.title || 'இன்றைய தியானம்'}</h3>
        <blockquote class="manna-verse">“${devotion.verse || ''}”</blockquote>
        <div class="manna-text">${(devotion.message || devotion.text || '').replace(/\n/g, '<br><br>')}</div>
      `;
    } else {
      mannaContainer.innerHTML = `<p class="info-text">இன்றைய நாளுக்கான மன்னா விரைவில் புதுப்பிக்கப்படும்.</p>`;
    }
  } catch (error) {
    mannaContainer.innerHTML = `<p class="error-text">மன்னாவை ஏற்றுவதில் சிக்கல் ஏற்பட்டது. தயவுசெய்து இணைய இணைப்பைச் சரிபார்க்கவும்.</p>`;
  }
}

/* =========================================================
   SONGBOOK LOGIC (Zion Songs)
   ========================================================= */
function renderSongsMenu(container) {
  container.innerHTML = `
    <div class="page-header" style="margin-bottom: 20px;">
      <h2 style="color: var(--color-primary); font-size: 1.5rem;">🎵 சீயோன் கீதங்கள்</h2>
      <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 15px;">Zion Songs</p>
      <input type="text" id="song-search" placeholder="Search by Number or Title..." 
             oninput="filterSongs(this.value)" 
             style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-size: 1rem; outline: none;">
    </div>
    <div id="songs-list" style="padding-bottom: 80px;"></div>
  `;
  renderSongsList(typeof ZION_SONGS !== 'undefined' ? ZION_SONGS : []);
}

function renderSongsList(songsToRender) {
  const listContainer = document.getElementById('songs-list');
  if (!listContainer) return;

  if (songsToRender.length === 0) {
    listContainer.innerHTML = `<p style="text-align: center; color: var(--text-secondary); margin-top: 30px;">No songs found.</p>`;
    return;
  }

  listContainer.innerHTML = songsToRender.map(song => `
    <div class="song-card" onclick="openSong(${song.id})" style="display: flex; align-items: center; background: var(--bg-card); padding: 12px; border-radius: 16px; border: 1px solid var(--border-color); margin-bottom: 10px; cursor: pointer;">
      <div style="width: 40px; height: 40px; border-radius: 20px; background: var(--glow-color); border: 1px solid var(--color-primary); color: var(--color-primary); display: flex; justify-content: center; align-items: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">
        ${song.song_number}
      </div>
      <div>
        <div style="color: var(--text-primary); font-size: 1.1rem; font-weight: bold; margin-bottom: 2px;">${song.title_tamil}</div>
        <div style="color: var(--text-secondary); font-size: 0.8rem;">${song.title_english || 'Zion Songs'}</div>
      </div>
    </div>
  `).join('');
}

function filterSongs(query) {
  if (typeof ZION_SONGS === 'undefined') return;
  const lowerQuery = query.toLowerCase().trim();
  const filtered = ZION_SONGS.filter(song =>
    song.song_number.toString().includes(lowerQuery) ||
    song.title_tamil.toLowerCase().includes(lowerQuery) ||
    (song.title_english && song.title_english.toLowerCase().includes(lowerQuery))
  );
  renderSongsList(filtered);
}

function openSong(id) {
  const song = ZION_SONGS.find(s => s.id === id);
  if (!song) return;

  const container = document.getElementById('main-content');
  
  // Neon Blue "~" Refrain Logic
  const rawLines = song.lyrics.split('\n');
  const processedLyrics = rawLines.map((line, index) => {
    const trimmed = line.trim();
    let isRefrain = false;
    
    // Check if line starts with ~ and next line is empty or doesn't exist
    if (trimmed.startsWith('~')) {
      const nextLine = rawLines[index + 1];
      if (nextLine === undefined || nextLine.trim() === '') {
        isRefrain = true;
      }
    }
    
    // Apply Neon Blue color to refrains
    if (isRefrain) {
      return `<span style="color: var(--color-primary); font-weight: bold;">${line}</span>`;
    }
    return line;
  }).join('\n');

  container.innerHTML = `
    <div style="display: flex; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 20px; position: sticky; top: 0; background: var(--bg-primary); z-index: 10;">
      <button onclick="navigate('songs')" style="background: transparent; border: none; color: var(--color-gold); font-size: 1.5rem; margin-right: 15px; cursor: pointer;">⬅</button>
      <h2 style="color: var(--color-primary); font-size: 1.2rem; flex: 1; margin: 0;">${song.song_number} - ${song.title_tamil}</h2>
    </div>
    <div style="font-size: 1.15rem; line-height: 2.2; padding-bottom: 100px; white-space: pre-wrap;">${processedLyrics}</div>
  `;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render EGW Books Library
function renderBooksMenu(container) {
  let booksHtml = EGW_BOOKS_DATA.map(book => {
    let actionButtons = '';
    if (book.website_url) {
      actionButtons += `<a href="${book.website_url}" target="_blank" rel="noopener" class="btn btn-online" style="display: inline-block; padding: 8px 12px; background: rgba(255, 159, 10, 0.1); color: #FF9F0A; text-decoration: none; border-radius: 8px; font-size: 0.8rem; font-weight: bold; margin-right: 10px;">🌐 Read Online</a>`;
    }
    if (book.pdf_url) {
      actionButtons += `<a href="${book.pdf_url}" target="_blank" rel="noopener" class="btn btn-pdf" style="display: inline-block; padding: 8px 12px; background: rgba(48, 209, 88, 0.1); color: #30D158; text-decoration: none; border-radius: 8px; font-size: 0.8rem; font-weight: bold;">📥 PDF</a>`;
    }

    return `
      <div class="book-card" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 15px; border-radius: 12px; margin-bottom: 12px;">
        <h3 class="book-title-ta" style="color: var(--text-primary); margin-bottom: 4px; font-size: 1.1rem;">${book.title_tamil}</h3>
        <p class="book-title-en" style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px;">${book.title_english}</p>
        <div class="book-actions">${actionButtons}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="page-header" style="margin-bottom: 20px;">
      <h2 style="color: var(--color-primary); font-size: 1.5rem;">📚 ஆவிக்குரிய நூலகம்</h2>
      <p style="color: var(--text-secondary); font-size: 0.85rem;">Ellen G. White Writings in Tamil</p>
    </div>
    <div class="books-list" style="padding-bottom: 80px;">
      ${booksHtml}
    </div>
  `;
}

// Render About Screen
function renderAbout(container) {
  container.innerHTML = `
    <div class="card" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 20px; border-radius: 16px; text-align: center;">
      <h2 style="color: var(--color-primary); margin-bottom: 10px;">Adventist Tamil Tool</h2>
      <p class="app-motto" style="color: var(--color-gold); font-style: italic; margin-bottom: 15px;">“Abide in Christ, and be kept by His power.” – DA 324</p>
      <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
        Tamil Adventist Worship Tools, Devotions, Hymnals, and EGW Spiritual Library.<br><br>
        Web Version PWA 1.0<br>Built exclusively for Pr. KSM
      </p>
    </div>
  `;
}
