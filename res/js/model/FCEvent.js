import { FCFrise } from "./FCFrise.js";

export class FCEvent {
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
