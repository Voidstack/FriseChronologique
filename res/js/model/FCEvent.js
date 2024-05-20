import { FCFrise } from "./FCFrise.js";

export class FCEvent {
  static defaultEvents = [
    new FCEvent(new Date(750, 1, 1, new Date(1100, 5, 10), "Bonjour !")),
    new FCEvent(new Date(900, 0, 0, new Date(1500, 5, 10), "Pas super !")),
    new FCEvent(new Date(2008, 1, 1, new Date(2010, 5, 10), "Bonjour2 !")),
  ];

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  // Méthode pour vérifier le chevauchement avec une autre période
  checkOverlap(otherPeriod) {
    if (this.start >= otherPeriod.end || otherPeriod.start >= this.end) {
      return false; // Pas de chevauchement
    }

    const overlapStart =
      this.start > otherPeriod.start ? this.start : otherPeriod.start;
    const overlapEnd = this.end < otherPeriod.end ? this.end : otherPeriod.end;

    return new Periode(overlapStart, overlapEnd);
  }
}
