export class UtilsDate {
  static ZERO = new Date("0000-01-01T00:00:00Z");

  /**
   * Retourne un string au format DD-MM-AAAA.
   * @param {Date} date
   * @returns
   */
  static getString(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");
    year = year.toString().padStart(4, "0");

    return `${day}/${month}/${year}`;
  }

  static inputValueToDate(value) {
    // Diviser la chaîne en composants de date (année, mois, jour)
    const [year, month, day] = value.split("-").map(Number);
    // Créer un nouvel objet Date avec les composants extraits
    // Notez que les mois dans l'objet Date commencent à 0 (janvier) jusqu'à 11 (décembre)
    const date = new Date(year, month - 1, day);
    return date;
  }

  /**
   * Return true si start < end.
   * @param {Date} start
   * @param {Date} end
   * @returns {boolean}
   */
  static checkIfIsBefore(start, end) {
    return start < end;
  }

  // Retourne la dernière date d'une [] de dates
  static getLastDate(dates) {
    // Trier les dates dans l'ordre chronologique
    dates.sort((a, b) => a - b);
    // Récupérer la dernière date de la liste triée
    return dates[dates.length - 1];
  }

  /**
   * Retourne la première date d'une liste
   * @param {Dates[]} dates
   * @returns
   */
  static getFirstDate(dates) {
    dates.sort((a, b) => a + b);
    return dates[dates.length - 1];
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

  /**
   * Transforme une date en chaine de caractère, enfin je crois.
   * @param {Date} date
   * @returns
   */
  static formatDate(date) {
    if (!(date instanceof Date)) {
      throw new Error("L'argument doit être un objet Date");
    }

    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont de 0 à 11
    var day = String(date.getDate()).padStart(2, "0");

    var result = `${year}-${month}-${day}`;

    console.log(result);

    return result;
  }
}
