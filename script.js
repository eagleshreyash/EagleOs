dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
   
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
  
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
   
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
dragElement(document.getElementById("mydiv"));

var welcomeScreen = document.querySelector("#mydiv");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

function closeWindow(windowElement) {
  windowElement.style.display = "none";
}

function openWindow(windowElement) {
  windowElement.style.display = "";
}

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

var selectedIcon = undefined;
function selectIcon(element) {
element.classList.add("selected")
selectedIcon = element
}

function deselectIcon(element) {
    if (element) {
        element.classList.remove("selected");
    }
}
function handleIconTap(element) {
   if (element.classList.contains("selected")) {
        deselectIcon(element);
        selectedIcon = undefined;
    } else {
      deselectIcon(selectedIcon);
      selectIcon(element);
    }
}

var hawkNotesWindow = document.querySelector("#hawkNotesWindow");
var hawkNotesClose = document.querySelector("#hawkNotesClose");


dragElement(document.getElementById("hawkNotesWindow"));


hawkNotesClose.addEventListener("click", function() {
    closeWindow(hawkNotesWindow);
});


function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        selectedIcon = undefined;
    } else {
        deselectIcon(selectedIcon);
        selectIcon(element);
        
      
        openWindow(hawkNotesWindow); 
    }
}
