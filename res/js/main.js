import { FCDate } from "./model/FCDate.js";
import { FCEvent } from "./model/FCEvent.js";
import { FCFrise } from "./model/FCFrise.js";
import { FCPeriode } from "./model/FCPeriode.js";
import { UtilsDate } from "./utils/UtilsDate.js";

const frise = new FCFrise();

const loadingIcons = document.getElementsByClassName("loading-icon");
const menuContainer = document.getElementById("menu-container");

// MAX CHAR PER LINE
const maxCharPerLine = document.getElementById("maxCharPerLine");
frise.maxCharPerLine = maxCharPerLine.value;
maxCharPerLine.addEventListener("input", (event) => {
  frise.maxCharPerLine = event.target.value;
  frise.actualiserFrise();
});

// EVENT
const eventFontSize = document.getElementById("eventFontSize");
frise.eventFontSize = eventFontSize.value;
eventFontSize.addEventListener("input", (event) => {
  frise.eventFontSize = event.target.value;
  frise.actualiserFrise();
});

const eventColorArrow = document.getElementById("eventColorArrow");
frise.eventArrowColor = eventColorArrow.value;
eventColorArrow.addEventListener("input", (event) => {
  frise.eventArrowColor = event.target.value;
  frise.actualiserFrise();
});

const eventColorLine = document.getElementById("eventColorLine");
frise.eventLineColor = eventColorLine.value;
eventColorLine.addEventListener("input", (event) => {
  frise.eventLineColor = event.target.value;
  frise.actualiserFrise();
});

const eventFontColor = document.getElementById("eventColorFont");
frise.eventFontColor = eventFontColor.value;
eventFontColor.addEventListener("input", (event) => {
  frise.eventFontColor = event.target.value;
  frise.actualiserFrise();
});

// PERIOD
const txtSizePeriod = document.getElementById("txtSizePeriod");
frise.fontSizePeriod = txtSizePeriod.value;
txtSizePeriod.addEventListener("input", (event) => {
  frise.fontSizePeriod = event.target.value;
  frise.actualiserFrise();
});

const periodFontColor = document.getElementById("txtColorPeriod");
frise.periodFontColor = periodFontColor.value;
periodFontColor.addEventListener("input", (event) => {
  frise.periodFontColor = event.target.value;
  frise.actualiserFrise();
});

// DATE
const dateSymbolColor = document.getElementById("dateSymbolColor");
frise.dateSymbolColor = dateSymbolColor.value;
dateSymbolColor.addEventListener("input", (event) => {
  frise.dateSymbolColor = event.target.value;
  frise.actualiserFrise();
});

const txtSizeDate = document.getElementById("txtSizeDate");
frise.fontSizeDate = txtSizeDate.value;
txtSizeDate.addEventListener("input", (event) => {
  frise.fontSizeDate = event.target.value;
  frise.actualiserFrise();
});

// OTHER
const otherDrawAxi = document.getElementById("otherDrawAxi");
frise.shouldDrawAxi = otherDrawAxi.checked;
otherDrawAxi.addEventListener("change", (event) => {
  frise.shouldDrawAxi = event.target.checked;
  frise.redimensionnerY();
  frise.actualiserFrise();
});

const otherBackgroundColor = document.getElementById("otherBackgroundColor");
const charContainer = document.getElementById("chart-container");
charContainer.style.background = otherBackgroundColor.value;
otherBackgroundColor.addEventListener("input", (event) => {
  charContainer.style.background = event.target.value;
});

frise.actualiserFrise();

//#region SUBMENU
const menuDate = document.getElementById("menu-date");
const menuEvent = document.getElementById("menu-event");
const menuPeriod = document.getElementById("menu-period");
const menuTutoriel = document.getElementById("menu-tutoriel");
const menuOther = document.getElementById("menu-other");
afficherSubMenu(menuTutoriel);

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
document
  .querySelector("#otherParameter")
  .addEventListener("click", () => afficherSubMenu(menuOther));
document.getElementById("btnOtherClean").addEventListener("click", () => {
  frise.dataDate = [];
  frise.dataEvent = [];
  frise.dataPeriodes = [];
  frise.actualiserFrise();
});
//#endregion

document
  .querySelector("#resetZoom")
  .addEventListener("click", () => frise.resetZoom());
document.querySelector("#btnAddDate").addEventListener("click", addDate);
document.querySelector("#btnAddPeriod").addEventListener("click", addPeriod);
document.querySelector("#btnAddEvent").addEventListener("click", addEvent);

onwheel = function (event) {
  frise.callOnWheel(event);
};

function afficherSubMenu(submenu) {
  menuDate.style.display = "none";
  menuEvent.style.display = "none";
  menuPeriod.style.display = "none";
  menuTutoriel.style.display = "none";
  menuOther.style.display = "none";
  submenu.style.display = "block";
}

//#region ADD
function addDate() {
  console.log("addDate");
  var titre = document.getElementById("newDateTitre").value;
  var dateValue = document.getElementById("newDateDate").value;
  var date = new FCDate(UtilsDate.inputValueToDate(dateValue), titre);

  frise.dataDate.push(date);
  console.log(frise.dataDate);
  frise.actualiserFrise();
}

function addPeriod() {
  console.log("addPeriod");
  var titre = document.getElementById("newPeriodTitre").value;
  var color = document.getElementById("newPeriodColor").value;
  var dateStart = document.getElementById("newPeriodDateStart").value;
  var dateEnd = document.getElementById("newPeriodDateEnd").value;

  dateStart = UtilsDate.inputValueToDate(dateStart);
  dateEnd = UtilsDate.inputValueToDate(dateEnd);

  // Verif !
  if (UtilsDate.checkIfIsBefore(dateEnd, dateStart)) {
    var error = document.getElementById("errorAddPeriod").value;
    console.log("error !");
  } else {
    var fcPeriod = new FCPeriode(dateStart, dateEnd, titre, color);
    frise.dataPeriodes.push(fcPeriod);
    console.log(frise.dataPeriodes);
    frise.redimensionnerX();
    frise.actualiserFrise();
  }
}

function addEvent() {
  console.log("addEvent");

  var titre = document.getElementById("newEventTitre").value;
  var start = document.getElementById("newEventDateStart").value;
  var end = document.getElementById("newEventDateEnd").value;

  start = UtilsDate.inputValueToDate(start);
  end = UtilsDate.inputValueToDate(end);

  // Verif !
  if (UtilsDate.checkIfIsBefore(start, end)) {
    var error = document.getElementById("errorAddEvent").value;
    console.log("error !");
  } else {
    var fcEvent = new FCEvent(start, end, titre);
    frise.dataEvent.push(fcEvent);
    console.log(frise.dataEvent);
    frise.actualiserFrise();
  }
}
//#endregion

//#region CALLBACK & FUNCTION
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
  // document.getElementById("menu-container").style.height =
  // newHeight - 40 + "px";
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
