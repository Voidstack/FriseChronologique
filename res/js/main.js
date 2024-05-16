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

document.querySelector('#btnAddDate').addEventListener('click', ajouterEvenement);

onwheel = function(event) {
  frise.callOnWheel(event);
};

// Fonction pour ajouter un événement
function ajouterEvenement() {
  const nouvelEvenement = prompt("Entrez le nom de l'événement :");
  const nouvelleDate = prompt(
    "Entrez la date de l'événement (format YYYY-MM-DD) :"
  );
  if (nouvelEvenement && nouvelleDate) {
    frise.dataDate.push({
      dateDebut: parseDate(nouvelleDate),
      event: nouvelEvenement,
    });
    frise.actualiserFriseChronologique();
  } else {
    alert("Les informations saisies ne sont pas valides.");
  }
}
/*
window.onresize = () => {
  width = parent.innerWidth - 30;
  redimensionner();
};*/
