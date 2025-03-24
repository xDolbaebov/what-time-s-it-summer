// ----- Таймер -----
function updateCountdown() {
  const now = new Date();
  const targetDate = new Date(2025, 5, 1, 0, 0, 0);
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "<h2>🎉 1 июня 2025 наступило! 🎉</h2>";
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

  document.getElementById("days").setAttribute("data-text", String(days).padStart(2, "0"));
  document.getElementById("hours").setAttribute("data-text", String(hours).padStart(2, "0"));
  document.getElementById("minutes").setAttribute("data-text", String(minutes).padStart(2, "0"));
  document.getElementById("seconds").setAttribute("data-text", String(seconds).padStart(2, "0"));
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ----- Переключение тем -----
const themes = [
  "modern.css",
  "cyberpunk.css",
  "pink.css",
  "green.css"
];

const themeStylesheet = document.getElementById("themeStylesheet");
const changeThemeButton = document.getElementById("changeTheme");

let currentThemeIndex = localStorage.getItem("themeIndex") || 0;
themeStylesheet.href = themes[currentThemeIndex];

changeThemeButton.addEventListener("click", () => {
  currentThemeIndex = (parseInt(currentThemeIndex) + 1) % themes.length;
  themeStylesheet.href = themes[currentThemeIndex];
  localStorage.setItem("themeIndex", currentThemeIndex);
});

// ----- Плеер для музыки -----
const backgroundMusic = document.getElementById('backgroundMusic');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

const tracks = [
    { name: "Funk Da Montanha - IMMORTAL PLAYA, SCARIONIX, chipbagov", src: "music/Funk Da Montanha - IMMORTAL PLAYA, SCARIONIX, chipbagov.mp3" },
    { name: "steve lacy - bad habit (jalenrekt remix)", src: "music/steve lacy - bad habit (jalenrekt remix).mp3" },
    { name: "CHRYSTAL - THE DAYS (NOTION REMIX)", src: "music/CHRYSTAL - THE DAYS (NOTION REMIX).mp3" },
    { name: "DJ Stonik1917 - GoodDayFlopTray", src: "music/DJ Stonik1917 - GoodDayFlopTray.mp3" },
    { name: "RICO Ray - Topic – Notion (RICO Ray Version)", src: "music/RICO Ray - Topic – Notion (RICO Ray Version).mp3" },
    { name: "Секрет - Моя любовь на пятом этаже", src: "music/Бит_квартет_Секрет_Моя_любовь_на_пятом_этаже_1986.mp3" },
    { name: "Дайте танк(!) - Люди", src: "music/Дайте танк(!) - Люди.mp3" },
    { name: "Дайте танк (!) - Утро", src: "music/Дайте танк (!) - Утро.mp3" },
    { name: "I GOT U - Toxi$", src: "music/I GOT U-Toxi$.mp3" },
];

let currentTrackIndex = 0;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function loadTrack(index) {
  const track = tracks[index];
  backgroundMusic.src = track.src;
  backgroundMusic.load();
  document.getElementById('currentTrackName').textContent = track.name;
  backgroundMusic.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(backgroundMusic.duration);
    progressBar.max = backgroundMusic.duration;
  }, { once: true });
}

function playTrack() {
  backgroundMusic.play();
  document.getElementById('playPauseBtn').textContent = '⏸';
}

function pauseTrack() {
  backgroundMusic.pause();
  document.getElementById('playPauseBtn').textContent = '▶';
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function setVolume(volume) {
  backgroundMusic.volume = volume;
}

function fadeInMusic() {
  backgroundMusic.volume = 0;
  backgroundMusic.play();
  let volume = 0;
  const fadeInInterval = setInterval(() => {
    if (volume < 0.5) {
      volume += 0.01;
      backgroundMusic.volume = volume;
    } else {
      clearInterval(fadeInInterval);
    }
  }, 100);
}

function updateProgress() {
  progressBar.value = backgroundMusic.currentTime;
  currentTimeDisplay.textContent = formatTime(backgroundMusic.currentTime);
}

backgroundMusic.addEventListener('timeupdate', updateProgress);
backgroundMusic.addEventListener('ended', nextTrack);

progressBar.addEventListener('input', () => {
  backgroundMusic.currentTime = progressBar.value;
});

const playMusicBtn = document.getElementById('playMusicBtn');
playMusicBtn.addEventListener('click', () => {
  fadeInMusic();
  playMusicBtn.style.display = 'none';
  document.getElementById('musicPlayer').style.display = 'block';
});

const togglePlayerBtn = document.getElementById('togglePlayer');
togglePlayerBtn.addEventListener('click', () => {
  const musicPlayer = document.getElementById('musicPlayer');
  if (musicPlayer.style.display === 'none' || musicPlayer.style.display === '') {
    musicPlayer.style.display = 'block';
    togglePlayerBtn.textContent = 'Скрыть плеер';
  } else {
    musicPlayer.style.display = 'none';
    togglePlayerBtn.textContent = 'Показать плеер';
  }
});

document.getElementById('playPauseBtn').addEventListener('click', () => {
  if (backgroundMusic.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});
document.getElementById('prevTrackBtn').addEventListener('click', prevTrack);
document.getElementById('nextTrackBtn').addEventListener('click', nextTrack);
document.getElementById('volumeSlider').addEventListener('input', (e) => setVolume(e.target.value));

loadTrack(currentTrackIndex);
