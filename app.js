const CONFIG = {
  date: '7 KASIM 2026 · CUMARTESİ',
  time: '14:00 — 17:00',
  venue: 'Salihli Öğretmenevi',
  city: 'Manisa / Salihli',
  mapsQuery: 'Salihli Öğretmenevi ve Akşam Sanat Okulu, Aksoy Mh. Menderes Cd. No:70, Salihli, Manisa',
  // Müzik dosyası geldiğinde örn. 'assets/music.mp3' yazın. Şimdilik bilerek boş.
  musicSrc: '',
  eventStart: '2026-11-07T14:00:00+03:00',
  eventDurationMinutes: 180
};

const $ = (selector) => document.querySelector(selector);
const opening = $('#opening');
const invitation = $('#invitation');
const openButton = $('#openInvitation');
const sparkField = $('#sparkField');
const music = $('#music');
const soundToggle = $('#soundToggle');
const rsvpModal = $('#rsvpModal');
const infoModal = $('#infoModal');

$('#dateText').textContent = CONFIG.date;
$('#timeText').textContent = CONFIG.time;
$('#venueText').textContent = CONFIG.venue;

document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

function createSparks() {
  const points = [
    [-54,-31],[-42,18],[-29,-48],[-15,34],[14,-46],[27,31],[41,-22],[55,8],[5,45],[-5,-39]
  ];
  points.forEach(([x,y], index) => {
    const s = document.createElement('span');
    s.className = 'spark';
    s.style.setProperty('--x', `${x}px`);
    s.style.setProperty('--y', `${y}px`);
    s.style.animation = `sparkFly ${0.75 + (index % 3) * 0.12}s ${0.25 + index * 0.018}s ease-out forwards`;
    sparkField.appendChild(s);
  });
}

async function startMusicFromGesture() {
  if (!CONFIG.musicSrc) return;
  if (!music.src) music.src = CONFIG.musicSrc;
  music.volume = 0;
  try {
    await music.play();
    soundToggle.hidden = false;
    const startedAt = performance.now();
    const fadeMs = 1300;
    const fade = (now) => {
      const p = Math.min(1, (now - startedAt) / fadeMs);
      music.volume = 0.62 * (1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(fade);
    };
    requestAnimationFrame(fade);
  } catch (_) {
    soundToggle.hidden = true;
  }
}

function openInvitation() {
  if (opening.classList.contains('is-opening')) return;
  opening.classList.add('is-opening');
  createSparks();
  startMusicFromGesture();

  // Kartın yükselmesi + zarf kapanışının ardından ana sayfaya geçiş.
  window.setTimeout(() => {
    invitation.classList.add('is-visible');
    invitation.setAttribute('aria-hidden', 'false');
  }, 3350);

  window.setTimeout(() => {
    opening.classList.add('is-complete');
  }, 4300);
}

openButton.addEventListener('click', openInvitation, { passive: true });

soundToggle.addEventListener('click', async () => {
  if (!music.src) return;
  if (music.paused) {
    await music.play().catch(() => {});
    soundToggle.classList.remove('is-muted');
  } else {
    music.pause();
    soundToggle.classList.add('is-muted');
  }
});

$('#locationBtn').addEventListener('click', () => {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapsQuery)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

$('#calendarBtn').addEventListener('click', () => {
  // Sabit .ics dosyası iPhone Safari, Android ve masaüstünde daha güvenilir çalışır.
  window.location.href = 'vural-burcu-salihli-dugun.ics';
});

function showInfo(title, copy) {
  $('#infoTitle').textContent = title;
  $('#infoCopy').textContent = copy;
  infoModal.hidden = false;
}
function closeInfo() { infoModal.hidden = true; }
$('#infoClose').addEventListener('click', closeInfo);
infoModal.addEventListener('click', (event) => { if (event.target === infoModal) closeInfo(); });

function openRSVP() {
  const saved = localStorage.getItem('vural-burcu-salihli-rsvp');
  $('#rsvpStatus').textContent = saved ? `Seçiminiz: ${saved}` : '';
  rsvpModal.hidden = false;
}
function closeRSVP() { rsvpModal.hidden = true; }
$('#rsvpBtn').addEventListener('click', openRSVP);
$('#rsvpClose').addEventListener('click', closeRSVP);
rsvpModal.addEventListener('click', (event) => { if (event.target === rsvpModal) closeRSVP(); });

document.querySelectorAll('[data-rsvp]').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.rsvp;
    localStorage.setItem('vural-burcu-salihli-rsvp', value);
    $('#rsvpStatus').textContent = `Seçiminiz kaydedildi: ${value}`;
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!rsvpModal.hidden) closeRSVP();
    if (!infoModal.hidden) closeInfo();
  }
});
