import { FCFrise } from "./FCFrise.js";

export class FCPeriode {
  static defaultPeriodes = [
    new FCPeriode(
      new Date(0, 0, 0),
      new Date(500, 0),
      "Gaule romaine",
      "#ffc56e"
    ),
    new FCPeriode(
      new Date(500, 0),
      new Date(750, 0),
      "Mérovingiens",
      "#6babdb"
    ),
    new FCPeriode(
      new Date(750, 0),
      new Date(990, 0),
      "Carolingiens",
      "#3f3f3f"
    ),
    new FCPeriode(new Date(990, 0), new Date(1200, 0), "Capétiens", "#ffc56e"),
    new FCPeriode(
      new Date(1750, 0),
      new Date(2024, 0),
      "Période contemporaine",
      "#ffc56e"
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
}
