import { FCPeriode } from "./model/FCPeriode.js";
import { FCDate } from "./model/FCDate.js";
import { FCEvent } from "./model/FCEvent.js";
import { FCFrise } from "./model/FCFrise.js";
import { UtilsDate } from "./utils/UtilsDate.js";

const frise = new FCFrise();

const loadingIcons = document.getElementsByClassName("loading-icon");
const menuContainer = document.getElementById("menu-container");

document
  .querySelector("#txtSizePeriod")
  .addEventListener("input", debounce(changeSizePeriod, 500));
document
  .querySelector("#txtSizeEvent")
  .addEventListener("input", debounce(changeSizeEvent, 500));
document
  .querySelector("#txtSizeDate")
  .addEventListener("input", debounce(changeSizeDate, 500));
document
  .querySelector("#maxCharPerLigne")
  .addEventListener("input", debounce(changeCharPerLigne, 500));

//#region SUBMENU
const menuDate = document.getElementById("menu-date");
const menuEvent = document.getElementById("menu-event");
const menuPeriod = document.getElementById("menu-period");
const menuTutoriel = document.getElementById("menu-tutoriel");
menuDate.style.display = "none";
menuPeriod.style.display = "none";
menuEvent.style.display = "none";
document
  .querySelector("#btnTutoriel")
  .addEventListener("click", () => afficherSubMenu(menuTutoriel));
document
  .querySelector("#dateParameter")
  .addEventListener("click", () => afficherSubMenu(menuDate));
document
  .querySelector("#periodParameter")
  .addEventListener("click", () => afficherSubMenu(menuPeriod));
document
  .querySelector("#eventParameter")
  .addEventListener("click", () => afficherSubMenu(menuEvent));
//#endregion

document.querySelector("#resetZoom").addEventListener("click", resetZoom);
document.querySelector("#btnAddDate").addEventListener("click", addDate);

onwheel = function (event) {
  frise.callOnWheel(event);
};

function resetZoom() {
  alert("unimplemented method");
}

function changeSizePeriod(event) {
  frise.fontSizePeriod = event.target.value + "px";
  frise.actualiserFrise();
}

function changeSizeEvent(event) {
  frise.fontSizeEvent = event.target.value + "px";
  frise.actualiserFrise();
}

function changeSizeDate(event) {
  frise.fontSizeDate = event.target.value + "px";
  frise.actualiserFrise();
}

function changeCharPerLigne(event) {
  frise.maxCharPerLigne = event.target.value;
  frise.actualiserFrise();
}

function afficherSubMenu(submenu) {
  menuDate.style.display = "none";
  menuEvent.style.display = "none";
  menuPeriod.style.display = "none";
  menuTutoriel.style.display = "none";
  submenu.style.display = "block";
}

//#region ADD
function addDate() {
  console.log("tetstest");
  var titre = document.getElementById("newDateTitre").value;
  var date = document.getElementById("newDateDate").value;
  var newDate = new FCDate(date, titre);

  frise.dataDate.push(newDate);
  frise.actualiserFrise();
}

function addRegion(){

}

function addEvent(){

}
//#endregion

window.addEventListener("resize", debounce(onResize));

onResize();
function onResize() {
  var bodyHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  //    <div id="chart-container"></div>
  //  <div id="menu-container"></div>

  var element = document.getElementById("chart-container");
  var positionInfo = element.getBoundingClientRect();
  var c1H = positionInfo.height;

  var newHeight = bodyHeight - c1H;
  document.getElementById("menu-container").style.height =
    newHeight - 40 + "px";
}

// debouncing pour optimiser les perf et éviter de faire crash le moteur de recherche
// cimer chatgpt
function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    displayLoadingIcones(true);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
      displayLoadingIcones(false);
    }, wait);
  };
}

var isLoading = false;
/**
 * Définit si les icones de loading doivent s'afficher ou non.
 * @param {boolean} shouldDisplay
 */
function displayLoadingIcones(shouldDisplay) {
  if (isLoading == shouldDisplay) return;
  isLoading = shouldDisplay;

  for (var i = 0; i < loadingIcons.length; i++) {
    // Si le paramètre afficher est vrai, ajouter la classe pour afficher
    // Sinon, retirer la classe pour masquer
    if (shouldDisplay) {
      loadingIcons[i].classList.toggle("fade");
    } else {
      loadingIcons[i].classList.toggle("fade");
    }
  }
}
