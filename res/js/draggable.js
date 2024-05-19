const draggable = document.getElementById("toolbox");

if (draggable != null)
  console.log("Initialisation du fonctionnement de la toolbox");

let isDragging = false;
let offsetX, offsetY;

draggable.addEventListener("mousedown", (e) => {
  if (e.target.id != "toolbox") {
    return;
  }

  isDragging = true;
  offsetX = e.clientX - draggable.offsetLeft;
  offsetY = e.clientY - draggable.offsetTop;
  draggable.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    draggable.style.left = `${e.clientX - offsetX}px`;
    draggable.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  draggable.style.cursor = "move";
});

// Optionally, prevent default behavior to improve performance
draggable.addEventListener("dragstart", (e) => e.preventDefault());
