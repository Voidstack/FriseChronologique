import { FCFrise } from "./FCFrise.js";
import { UtilsDate } from "../utils/UtilsDate.js";

export class FCEvent {
  static defaultEvents = [
    new FCEvent(new Date(200, 1, 1), new Date(400, 5, 10), "Event 1"),
    new FCEvent(new Date(900, 0, 0), new Date(1500, 5, 10), "Event 2"),
    new FCEvent(new Date(1900, 1, 1), new Date(2010, 5, 10), "Event 3"),
    new FCEvent(new Date(1200, 0, 0), new Date(1600, 0, 0), "Event qui overlap !"),
    new FCEvent(new Date(1100, 0, 0), new Date(1500, 0, 0), "Event qui overlap encore !")
  ];

  constructor(start, end, title) {
    this.start = start;
    this.end = end;
    this.title = title;
  }

  // Méthode pour vérifier le chevauchement avec une autre période
  checkOverlap(otherEvent) {
    if (this.start >= otherEvent.end || otherEvent.start >= this.end) {
      return false; // Pas de chevauchement
    }

    const overlapStart =
      this.start > otherEvent.start ? this.start : otherEvent.start;
    const overlapEnd = this.end < otherEvent.end ? this.end : otherEvent.end;

    return new FCEvent(overlapStart, overlapEnd, this.title);
  }

  
 findFirstFreeLevel(levels) {
  for (let i = 0; i < levels.length; i++) {
      if (!levels[i].some(e => this.checkOverlap(e))) {
          return i;
      }
  }
  return levels.length; // Si aucun niveau libre n'est trouvé, utiliser un nouveau niveau
}

  findOverlappingEvents(events) {
    return events.filter(event => this.checkOverlap(this, event));
  }

  checkOverlap(event2) {
    return this.start < event2.end && this.end > event2.start;
  }


  onHoverIn(event){
// Afficher le tooltip
  const tooltip = document.querySelector("#tooltip");
  tooltip.style.display = "block";

// Mettre à jour les informations du tooltip
  document.getElementById("tooltip-date").innerText = UtilsDate.getString(this.start);
  document.getElementById("tooltip-event").innerText = this.title;

// Positionner le tooltip par rapport à la position de la souris
    tooltip.style.left = event.pageX + 10 + "px";
    tooltip.style.top = event.pageY + 10 + "px";
  }

  onHoverOut(event){
    // Masquer le tooltip lorsque la souris quitte l'élément
    const tooltip = document.querySelector("#tooltip");
    tooltip.style.display = "none";
  }
  
  onClick(frise, event){
    frise.dataEvent = frise.dataEvent.filter(item => item != this);
    frise.actualiserFrise();
  }
}
