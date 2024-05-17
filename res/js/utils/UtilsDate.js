
export class UtilsDate {
  // Retourne la dernière date d'une [] de dates
  static getLastDate(dates) {
    // Trier les dates dans l'ordre chronologique
    dates.sort((a, b) => a - b);
    // Récupérer la dernière date de la liste triée
    const derniereDate = dates[dates.length - 1];
    return derniereDate;
  }

  // Retourne la date suivante la plus proche de dateEntree contenue dans la liste de Dates listeDates
  static dateSuivanteLaPlusProche(dateEntree, listeDates) {
    // Initialisation de la date la plus proche
    let datePlusProche = null;

    // Parcourir la liste des dates
    for (let i = 0; i < listeDates.length; i++) {
      const dateCourante = listeDates[i];

      // Vérifier si la date courante est après la date d'entrée
      if (dateCourante > dateEntree) {
        // Si la date la plus proche n'a pas encore été définie ou si la date courante est plus proche que la date précédemment trouvée
        if (!datePlusProche || dateCourante < datePlusProche) {
          datePlusProche = dateCourante;
        }
        // Sortir de la boucle car la liste est ordonnée chronologiquement et nous avons trouvé la date suivante la plus proche
        break;
      }
    }
    return datePlusProche;
  }
}