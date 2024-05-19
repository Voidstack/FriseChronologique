import { FCPeriode } from "./model/FCPeriode.js";
import { FCDate } from "./model/FCDate.js";
import { FCEvent } from "./model/FCEvent.js";
import { FCFrise } from "./model/FCFrise.js";
import { UtilsDate } from "./utils/UtilsDate.js";

const dataPeriodes = [
  new FCPeriode(new Date("0000-00-00"), "Gaule romaine", "#ffc56e"),
  new FCPeriode(new Date("0500-00-00"), "Mérovingiens", "#6babdb"),
  new FCPeriode(new Date("0750-00-00"), "Carolingiens", "#3f3f3f"),
  new FCPeriode(new Date("0990-00-00"), "Capétiens", "#ffc56e"),
  new FCPeriode(new Date("1790-00-00"), "Période contemporaine", "#6babdb"),
];

const frise = new FCFrise();

const loadingIcons = document.getElementsByClassName("loading-icon");

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

onwheel = function (event) {
  frise.callOnWheel(event);
};

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

// Fonction pour ajouter un événement
function ajouterDate() {
  console.log("ntm");
  FCDate.addDate(frise);
}

function btnAddDate() {
  var titre = document.getElementById("newDateTitre");
  var date = document.getElementById("newDateDate");

  FCDate.addDate(frise, titre, date);
}

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
  console.log("isLoading : " + shouldDisplay);
  isLoading = shouldDisplay;

  console.log(loadingIcons);

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
