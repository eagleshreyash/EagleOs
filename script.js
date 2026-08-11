// --- 1. Global State Management ---
var selectedIcon = undefined;
var topZIndex = 10; 

// --- 2. Window Elements ---
var welcomeScreen = document.querySelector("#mydiv");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen"); 

var hawkNotesWindow = document.querySelector("#hawkNotesWindow");
var hawkNotesClose = document.querySelector("#hawkNotesClose");

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
  welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
  });
}

if (welcomeScreenOpen) {
  welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
  });
}

if (hawkNotesClose) {
  hawkNotesClose.addEventListener("click", function() {
    closeWindow(hawkNotesWindow);
  });
}

// --- 5. App Icon Interaction ---
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

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
  }
}

// --- 6. Fixed Draggable Window Mechanism ---
function dragElement(elmnt) {
  if (!elmnt) return;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  // Find the exact header element matching your unique id syntax rules
  var headerElement = document.getElementById(elmnt.id + "header");
  
  if (headerElement) {
    // If a header exists, apply the mouse trigger ONLY to the header element
    headerElement.onmousedown = dragMouseDown;
  } else {
    // Fallback security rule
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    
    // Allow users to naturally select text inside textareas or input fields
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
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
    
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }


  function closeDragElement() {

    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Initialize dragging mechanics safely
if (welcomeScreen) dragElement(welcomeScreen);
if (hawkNotesWindow) dragElement(hawkNotesWindow);
