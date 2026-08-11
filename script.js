// --- 1. Global State Management ---
var selectedIcon = undefined;
var topZIndex = 10; // Ensures opened/clicked windows come to the front

// --- 2. Window Elements ---
var welcomeScreen = document.querySelector("#mydiv");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen"); // Topbar logo/button

var hawkNotesWindow = document.querySelector("#hawkNotesWindow");
var hawkNotesClose = document.querySelector("#hawkNotesClose");

// --- 3. Core Window Logic (Open/Close/Focus) ---
function closeWindow(windowElement) {
  if (windowElement) windowElement.style.display = "none";
}

function openWindow(windowElement) {
  if (windowElement) {
    windowElement.style.display = "";
    // Bring window to front when opened
    topZIndex++;
    windowElement.style.zIndex = topZIndex;
  }
}

// Focus window on click/drag layer order
function focusWindow(windowElement) {
  topZIndex++;
  windowElement.style.zIndex = topZIndex;
}

// --- 4. Unified Event Listeners ---
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

// --- 5. Unified App Icon Interaction ---
// COMBINED both functions into one clean conditional tap event handler
function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        selectedIcon = undefined;
    } else {
        deselectIcon(selectedIcon);
        selectIcon(element);
        
        // Open the window linked to this specific icon selection
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

// --- 6. Draggable Window Mechanism ---
function dragElement(elmnt) {
  if (!elmnt) return;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  if (document.getElementById(elmnt.id + "header")) {

    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;

  } else {

    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Focus window layer order when user clicks to drag it
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
