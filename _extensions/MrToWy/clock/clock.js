// Credit: Mateusz Rybczonec

// dash array value is the circumference of the circle radius (here 45)
const FULL_DASH_ARRAY = 2 * Math.PI * 45;
// the second limits for color change
const THRESHOLDS = [10, 5];

// Funktion zur Initialisierung des Timers in einem Container
function initializeClock(containerId, timeLimit, startOn) {

  let active = true;
  let timePassed = 0;
  let timeLeft = timeLimit;

  // Dynamisches Erstellen des Timer-HTML-Inhalts für jeden Container
  document.getElementById(containerId).innerHTML = `
    <div class="base-timer">
    <text id="${containerId}-label" x="50%" y ="50%" dominant-baseline="middle" text-anchor="middle">
            ${formatClock(timeLeft)}
          </text>
      
    </div>
    `;

  // Set the timer to inactive and then change to type slide
  if ( startOn === "interaction" ) {
    toggleTimer();
    startOn = "slide";
  }

  // Startet den Timer für einen bestimmten Container
  (function startTimer() {
    // only advance time when focus is required and slide is in focus
    if (active && (startOn === 'presentation' || (startOn === 'slide' && !isHidden()))) {

      timePassed += 1;
      timeLeft = timeLimit - timePassed;

      document.getElementById(`${containerId}-label`).innerHTML = formatClock(
        timeLeft
      );
    }
    setTimeout(startTimer, 1000);
  }());

  function isHidden() {
    let timecont = document.getElementById(containerId);
    let ancestor = timecont.parentNode;

    // look if the section element, the 'slide', is visible
    while (ancestor.tagName !== "SECTION") {
      ancestor = ancestor.parentNode;
    }
    return ancestor.hidden;
  }

  function toggleTimer() {
    if (active) {
      document.getElementById(`${containerId}-circle`).style.fill = '#fcb';
    } else {
      document.getElementById(`${containerId}-circle`).style.fill = '';
    }
    active = !active;
  }

  // Funktion zur Formatierung der verbleibenden Zeit
  function formatClock(time) {

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const currentTime = `${hours}:${minutes}:${seconds}`;

  
    return currentTime;
  }

  // Funktion zur Festlegung der Farbe des verbleibenden
  // Pfades basierend auf der verbleibenden Zeit
  function setRemainingPathColor(timeLeft) {
    const pathId = `${containerId}-path-remaining`;

    for ( let i = 0; i < THRESHOLDS.length; i+=1 ) {
      if (timeLeft < THRESHOLDS[i]) {
        document.getElementById(pathId).classList.remove(`lvl${i-1}`);
        document.getElementById(pathId).classList.add(`lvl${i}`);
      }
    }
  }

  // Funktion zur Festlegung der Strichlänge des verbleibenden
  // Pfades basierend auf dem Anteil der verstrichenen Zeit
  function setCircleDasharray() {
    let circle_proportions = timeLeft / timeLimit * FULL_DASH_ARRAY + " ";
    circle_proportions += (1 - timeLeft / timeLimit) * FULL_DASH_ARRAY;
  }
}
