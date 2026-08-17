// --- 1. Global State Management ---
var selectedIcon = undefined;
var topZIndex = 101; 

// --- 2. Window Elements ---
var welcomeScreen = document.querySelector("#mydiv");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen"); 

var hawkNotesWindow = document.querySelector("#hawkNotesWindow");
var hawkNotesClose = document.querySelector("#hawkNotesClose");
var AdlerTimerWindow = document.querySelector("#AdlerTimerWindow");
var AdlerTimerClose = document.querySelector("#AdlerTimerClose");

// --- 3. Core Window Logic ---
function closeWindow(windowElement) {
  if (windowElement) windowElement.style.display = "none";
}

function openWindow(windowElement) {
  if (windowElement) {

    windowElement.style.display = "";

    topZIndex++;

    windowElement.style.zIndex = topZIndex;

  }
}


function focusWindow(windowElement) {
  topZIndex++;
  windowElement.style.zIndex = topZIndex;
}



// --- 4. Event Listeners ---
if (welcomeScreenClose) {
  welcomeScreenClose.addEventListener("click", function(e) {
    e.stopPropagation(); // Stops the drag engine from overriding the click
    closeWindow(welcomeScreen);
  });
}

if (welcomeScreenOpen) {
  welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
  });
}

if (hawkNotesClose) {
  hawkNotesClose.addEventListener("click", function(e) {
    e.stopPropagation(); // Stops the drag engine from overriding the click
    closeWindow(hawkNotesWindow);
  });
}

if (AdlerTimerClose) {
  AdlerTimerClose.addEventListener("click", function(e) {
    e.stopPropagation(); // Stops the drag engine from overriding the click
    closeWindow(AdlerTimerWindow);
  });
}


window.handleIconTap = function(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        selectedIcon = undefined;
    } else {
        deselectIcon(selectedIcon);

        selectIcon(element);

        openWindow(hawkNotesWindow); 
    }
}
window.handleAdlerIconTap = function(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        selectedIcon = undefined;
    } else {
        deselectIcon(selectedIcon);

        selectIcon(element);

        openWindow(AdlerTimerWindow); 
    }
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
  }
}


function dragElement(elmnt) {
  if (!elmnt) return;
  var pos3 = 0, pos4 = 0;

  

 
  var headerElement = document.getElementById(elmnt.id + "header") || elmnt.querySelector(".window-header");

  
  if (headerElement) {
    headerElement.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {

    e = e || window.event;

    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.target.classList.contains('close-button')) {
        return; 
    }

    e.preventDefault();
    focusWindow(elmnt);
   
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Direct delta calculation based on mouse movement
    var deltaX = pos3 - e.clientX;
    var deltaY = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    elmnt.style.top = (elmnt.offsetTop - deltaY) + "px";
    elmnt.style.left = (elmnt.offsetLeft - deltaX) + "px";

  }


  function closeDragElement() {

    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// Initialize dragging mechanics safely on page load
if (welcomeScreen) dragElement(welcomeScreen);
if (hawkNotesWindow) dragElement(hawkNotesWindow);
if (AdlerTimerWindow) dragElement(AdlerTimerWindow);

// --- 5. Timer Logic ---
let timer;
let minutes = 15;
let seconds = 0;
let isPaused = false;
let enteredTime = null;

function startTimer() {
    // Clear any existing intervals to prevent multiple timers running at once
    clearInterval(timer); 
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            seconds = 59;
            minutes--;
        }
    }

    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = formatTime(minutes, seconds);
    }

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert('Time is up! Take a break.');
    }
}

function formatTime(minutes, seconds) {
    // Fixed: Template literal must remain on the exact same line as the return statement
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Fixed: Renamed to match the capitalized onclick attributes in your HTML file
function TogglePauseResume() {
    const pauseResumeButton = document.querySelector('.control-buttons button');
    isPaused = !isPaused;

    if (isPaused) {
        pauseResumeButton.textContent = 'Resume';
    } else {
        pauseResumeButton.textContent = 'Pause';
    }
}

function restartTimer() {
    minutes = enteredTime || 15;
    seconds = 0;
    isPaused = false;
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = formatTime(minutes, seconds);
    }
    
    const pauseResumeButton = document.querySelector('.control-buttons button');
    if (pauseResumeButton) {
        pauseResumeButton.textContent = 'Pause';
    }
    startTimer();
}

function chooseTime() {
    const newTime = prompt('Enter new time in minutes:');
    if (newTime !== null && !isNaN(newTime) && parseInt(newTime) > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isPaused = false;
        
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = formatTime(minutes, seconds);
        }
        
        const pauseResumeButton = document.querySelector('.control-buttons button');
        if (pauseResumeButton) {
            pauseResumeButton.textContent = 'Pause';
        }
        startTimer();
    } else if (newTime !== null) {
        alert('Invalid input. Please enter a valid number greater than 0.');
    }
}

// Start tracking right away when the app is running
startTimer();
