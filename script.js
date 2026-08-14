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
    
    // Fix layout metrics the moment it becomes visible
    fixWindowCoords(windowElement);
  }
}


function focusWindow(windowElement) {
  topZIndex++;
  windowElement.style.zIndex = topZIndex;
}

// Helper to convert CSS transforms/percentages into absolute pixels safely
function fixWindowCoords(elmnt) {
  if (!elmnt) return;
  // Temporarily show element if it was hidden so getBoundingClientRect works
  var originalDisplay = elmnt.style.display;
  if (originalDisplay === "none") {
    elmnt.style.display = "block";
  }
  var rect = elmnt.getBoundingClientRect();
  elmnt.style.transform = "none";
  elmnt.style.top = rect.top + "px";
  elmnt.style.left = rect.left + "px";
  if (originalDisplay === "none") {
    elmnt.style.display = "none";
  }
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

// --- 6. Draggable Window Mechanism ---
function dragElement(elmnt) {
  if (!elmnt) return;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
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
   
    // Force explicit pixel initialization on the very first click if missing
    if (!elmnt.style.top || elmnt.style.top === "") {
        elmnt.style.top = elmnt.offsetTop + "px";
        elmnt.style.left = elmnt.offsetLeft + "px";
    }

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

    function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Calculate new cursor position changes
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // Set element's new position directly using calculated style subtraction
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }


  function closeDragElement() {

    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Initialize dragging mechanics safely on page load
if (welcomeScreen) dragElement(welcomeScreen);
if (hawkNotesWindow) dragElement(hawkNotesWindow);
