import { FCFrise } from "./FCFrise.js";

export class FCDate {
  static defaultDates = [
    new FCDate(new Date(0, 0, 0), "Evenement 1"),
    new FCDate(new Date(400, 0, 0), "Evenemnt2"),
    new FCDate(new Date(2018, 3, 20), "Evenement 3"),
  ];

  /**
   * Construteur de la classe.
   * @param {Date} date
   * @param {string} title
   */
  constructor(date, title) {
    this.date = date;
    this.title = title;
  }

  static getLastDate(fcDates) {
    var dates = fcDates.map((d) => d.date);
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

  static getFirstDate(fcDates) {
    var dates = fcDates.map((d) => d.date);
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

  /**
   * Permet d'ajouter une Date dans la frise.
   * @param {FCFrise} frise
   */
  static addDate(frise) {
    const nouvelleName = prompt("Entrez le nom de la date :");
    const nouvelleDate = prompt("Entrez la date (format YYYY-MM-DD) :");
    if (nouvelleName && nouvelleDate) {
      frise.dataDate.push({
        dateDebut: frise.parseDate(nouvelleDate),
        event: nouvelleName,
      });
      frise.actualiserFrise();
    } else {
      alert("Les informations saisies ne sont pas valides.");
    }
  }

  /**
   * Permet d'ajouter une Date dans la frise.
   * @param {FCFrise} frise
   * @param {string} titre
   * @param {Date} date
   */
  static addDate(frise, titre, date) {
    if (titre && date) {
      frise.dataDate.push({
        dateDebut: frise.parseDate(date),
        event: titre,
      });
      frise.actualiserFrise();
    } else {
      alert("Les informations saisies ne sont pas valides.");
    }
  }
}
