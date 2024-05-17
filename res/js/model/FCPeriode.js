import { FCFrise } from "./FCFrise.js";

export class FCPeriode {
  constructor(dateDebut, titre, color) {
    this.dateDebut = dateDebut;
    this.titre = titre;
    this.color = color;
  }

  static addPeriode(frise) {
    const nouvelleName = prompt("Entrez le nom de la période :");
    const nouvelleDate = prompt("Entrez la date de début (format YYYY-MM-DD) :");
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
}
