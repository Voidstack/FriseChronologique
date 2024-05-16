export class UtilsArray{
    // Fonction pour supprimer un élément spécifique d'un tableau
  static removeElement(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}