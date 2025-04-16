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
  "styles/modern.css",
  "styles/cyberpunk.css",
  "styles/pink.css",
  "styles/green.css",
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