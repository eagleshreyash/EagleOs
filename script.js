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
