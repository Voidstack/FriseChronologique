import { UtilsDate } from "../utils/UtilsDate.js";
import { FCFrise } from "./FCFrise.js";

export class FCPeriode {
  static napoleonPeriodes = [
    new FCPeriode(
      new Date(1774, 1),
      new Date(1789, 1),
      "Monarchie absolue",
      "#AA88EE"
    ),
    new FCPeriode(
      new Date(1792, 1),
      new Date(1804, 1),
      "I République",
      "#3f3f3f"
    ),
    new FCPeriode(new Date(1804, 1), new Date(1815, 1), "I Empire", "#AA88EE"),
    new FCPeriode(
      new Date(1815, 1),
      new Date(1830, 1),
      "Restauration",
      "#3f3f3f"
    ),
    new FCPeriode(
      new Date(1830, 1),
      new Date(1848, 1),
      "Monarchie de Juillet",
      "#AA88EE"
    ),
    new FCPeriode(
      new Date(1848, 1),
      new Date(1852, 1),
      "II République",
      "#3f3f3f"
    ),
    new FCPeriode(
      new Date(1852, 1),
      new Date(1870, 1),
      "III République",
      "#AA88EE"
    ),
  ];

  static defaultPeriodes = [
    new FCPeriode(UtilsDate.ZERO, new Date(500, 0), "Gaule romaine", "#AA88EE"),
    new FCPeriode(
      new Date(500, 0),
      new Date(750, 0),
      "Mérovingiens",
      "#3f3f3f"
    ),
    new FCPeriode(
      new Date(750, 0),
      new Date(990, 0),
      "Carolingiens",
      "#AA88EE"
    ),
    new FCPeriode(new Date(990, 0), new Date(1200, 0), "Capétiens", "#3f3f3f"),
    new FCPeriode(
      new Date(1750, 0),
      new Date(),
      "Période contemporaine",
      "#AA88EE"
    ),
  ];

  /**
   * Constructeur de la classe.
   * @param {Date} dateDebut
   * @param {Date} dateFin
   * @param {string} title
   * @param {string} color
   */
  constructor(dateDebut, dateFin, title, color) {
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.title = title;
    this.color = color;
  }

  /**
   * Retourne la date la plus récente d'une list de Date.
   * @param {Date} fcPeriodes
   * @returns
   */
  static getLastDate(fcPeriodes) {
    var dates = fcPeriodes.map((d) => d.dateFin);
    if (!Array.isArray(dates) || dates.length === 0) {
      throw new Error("L'argument doit être un tableau non vide de dates");
    }
    let lastDate = dates[0];
    for (let i = 1; i < dates.length; i++) {
      if (dates[i] > lastDate) {
        lastDate = dates[i];
      }
    }
    return lastDate;
  }

  /**
   * Retourne la date la plus ancienne d'une list de Date.
   * @param {Date} fcPeriodes
   * @returns
   */
  static getFirstDate(fcPeriodes) {
    var dates = fcPeriodes.map((d) => d.dateDebut);
    if (!Array.isArray(dates) || dates.length === 0) {
      throw new Error("L'argument doit être un tableau non vide de dates");
    }
    let firstDate = dates[0];
    for (let i = 1; i < dates.length; i++) {
      if (dates[i] < firstDate) {
        firstDate = dates[i];
      }
    }
    return firstDate;
  }

  onHoverIn(event) {
    // Afficher le tooltip
    const tooltip = document.querySelector("#tooltip");
    tooltip.style.display = "block";

    // Mettre à jour les informations du tooltip
    document.getElementById("tooltip-date").innerText =
      "Date de début : " +
      UtilsDate.getString(this.dateDebut) +
      "\n" +
      "Date de fin : " +
      UtilsDate.getString(this.dateFin);
    document.getElementById("tooltip-event").innerText = this.title;

    // Positionner le tooltip par rapport à la position de la souris
    tooltip.style.left = event.pageX + 10 + "px";
    tooltip.style.top = event.pageY + 10 + "px";
  }

  onHoverOut(event) {
    // Masquer le tooltip lorsque la souris quitte l'élément
    const tooltip = document.querySelector("#tooltip");
    tooltip.style.display = "none";
  }

  onClick(frise, event) {
    frise.dataPeriodes = frise.dataPeriodes.filter((item) => item != this);
    frise.actualiserFrise();
  }
}
