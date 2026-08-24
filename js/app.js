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
    <div class="date-badge" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); padding: 8px 14px; border-radius: 20px; font-size: 0.85rem; text-align: center; margin-bottom: 16px; color: var(--color-gold);">${formattedDate}</div>
    <section class="card devotion-card" id="manna-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 18px; margin-bottom: 18px;">
      <div class="card-header" style="margin-bottom: 12px;">
        <h2 class="card-title" style="color: var(--color-primary); font-size: 1.15rem;">✨ இன்றைய மன்னா (Today's Manna)</h2>
      </div>
      <div id="manna-content" class="card-body">
        <p class="loading-text" style="color: var(--text-secondary); font-size: 0.9rem;">மன்னாவை ஏற்றுகிறது (Loading devotion)...</p>
      </div>
    </section>
    <section class="hub-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
      <div class="hub-card" onclick="navigate('songs')" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px; text-align: center; cursor: pointer;">
        <span class="hub-icon" style="font-size: 1.8rem; display: block; margin-bottom: 6px;">🎵</span>
        <h3 style="color: var(--text-primary); font-size: 1rem; margin-bottom: 2px;">பாடல்கள்</h3>
        <p style="color: var(--text-secondary); font-size: 0.75rem;">சீயோன் & திருமறை</p>
      </div>
      <div class="hub-card" onclick="navigate('books')" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px; text-align: center; cursor: pointer;">
        <span class="hub-icon" style="font-size: 1.8rem; display: block; margin-bottom: 6px;">📚</span>
        <h3 style="color: var(--text-primary); font-size: 1rem; margin-bottom: 2px;">நூலகம்</h3>
        <p style="color: var(--text-secondary); font-size: 0.75rem;">EGW புத்தகங்கள்</p>
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
        <h3 class="manna-heading" style="color: var(--text-primary); font-size: 1.1rem; margin-bottom: 8px;">${devotion.title || 'இன்றைய தியானம்'}</h3>
        <blockquote class="manna-verse" style="color: var(--color-gold); font-style: italic; border-left: 3px solid var(--color-gold); padding-left: 10px; margin-bottom: 12px; font-size: 0.95rem;">“${devotion.verse || ''}”</blockquote>
        <div class="manna-text" style="color: var(--text-primary); font-size: 0.95rem; line-height: 1.7; font-family: 'Tamil003', sans-serif;">${(devotion.message || devotion.text || '').replace(/\n/g, '<br><br>')}</div>
      `;
    } else {
      mannaContainer.innerHTML = `<p class="info-text" style="color: var(--text-secondary);">இன்றைய நாளுக்கான மன்னா விரைவில் புதுப்பிக்கப்படும்.</p>`;
    }
  } catch (error) {
    mannaContainer.innerHTML = `<p class="error-text" style="color: #FF3B30;">மன்னாவை ஏற்றுவதில் சிக்கல் ஏற்பட்டது. தயவுசெய்து இணைய இணைப்பைச் சரிபார்க்கவும்.</p>`;
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
        <h3 class="book-title-ta" style="color: var(--text-primary); margin-bottom: 4px; font-size: 1.1rem; font-family: 'Tamil003', sans-serif;">${book.title_tamil}</h3>
        <p class="book-title-en" style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px;">${book.title_english}</p>
        <div class="book-actions">${actionButtons}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="page-header" style="margin-bottom: 20px;">
      <h2 style="color: var(--color-primary); font-size: 1.5rem; font-family: 'Tamil003', sans-serif;">📚 ஆவிக்குரிய நூலகம்</h2>
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
