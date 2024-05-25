import { UtilsDate } from "../utils/UtilsDate.js";
import { FCFrise } from "./FCFrise.js";

export class FCDate {
  static napoleonDates = [
    new FCDate(new Date(1789, 5, 5), "Révolution Francaise"),
    new FCDate(new Date(1815, 6, 18), "Défaite de Napoléon B. à Waterloo"),
    new FCDate(new Date(1830, 7, 29), "Révolution des Trois Glorieuses"),
    new FCDate(new Date(1848, 6, 25), "Révolution"),
  ];

  static defaultDates = [
    new FCDate(UtilsDate.ZERO, "Evenement 1"),
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
   * @param {string} titre
   * @param {Date} date
   */
  static addDate(frise, titre, date) {
    if (titre && date) {
      frise.dataDate.push({
        date: date,
        event: titre,
      });
      frise.actualiserFrise();
    } else {
      alert("Les informations saisies ne sont pas valides.");
    }
  }

  onHoverIn(event) {
    // Afficher le tooltip
    const tooltip = document.querySelector("#tooltip");
    tooltip.style.display = "block";

    // Mettre à jour les informations du tooltip
    document.getElementById("tooltip-date").innerText = UtilsDate.getString(
      this.date
    );
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
    frise.dataDate = frise.dataDate.filter((item) => item != this);
    frise.actualiserFrise();
  }
}
