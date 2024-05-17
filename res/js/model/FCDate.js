import { FCFrise } from "./FCFrise.js";

export class FCDate {
  constructor(start) {
    this.start = start;
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
  static addDate(frise, titre, date){
    if(titre && date){
      frise.dataDate.push({
        dateDebut: frise.parseDate(date),
        event: titre
      });
      frise.actualiserFrise();
    } else {
      alert("Les informations saisies ne sont pas valides.");
    }
  }
}
