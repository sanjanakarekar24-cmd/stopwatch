let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lastLapTime = 0;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapTableBody = document.querySelector("#lapTable tbody");
const themeToggle = document.getElementById("themeToggle");

function formatTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor(ms / (1000 * 60 * 60));

    return (
        (hours ? String(hours).padStart(2, "0") + ":" : "") +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
    }
});

pauseBtn.addEventListener("click", () => {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    display.textContent = "00:00:00.00";
    lapTableBody.innerHTML = "";
    lapCount = 0;
    lastLapTime = 0;
});

lapBtn.addEventListener("click", () => {
    if (running) {
        lapCount++;
        let currentLapTime = elapsedTime;
        let lapDuration = currentLapTime - lastLapTime;
        lastLapTime = currentLapTime;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${lapCount}</td>
            <td>${formatTime(currentLapTime)}</td>
            <td>+${formatTime(lapDuration)}</td>
        `;
        lapTableBody.appendChild(row);
    }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    themeToggle.textContent = document.body.classList.contains("light-mode") ? "🌞 Light Mode" : "🌙 Dark Mode";
});
