import { UtilsArray } from "../utils/UtilsArray.js";
import { UtilsString } from "../utils/UtilsString.js";
import { FCDate } from "./FCDate.js";
import { FCEvent } from "./FCEvent.js";
import { FCPeriode } from "./FCPeriode.js";

export class FCFrise {
  //#region CONSTRUCTOR
  constructor() {
    this.dataPeriodes = FCPeriode.defaultPeriodes;
    this.dataEvent = FCEvent.defaultEvents;
    this.dataDate = FCDate.defaultDates;

    this.zoomFactor = 50;

    this.width = parent.innerWidth - 100;
    this.margin = { top: 20, right: 0, bottom: 30, left: 40 };

    // event param
    this.eventFontColor = "#ffffff";
    this.maxCharPerLigne = 50;

    // Création de l'élément SVG
    this.svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    // Analyse des dates
    this.parseDate = d3.timeParse("%Y-%m-%d");
    this.formatDate = d3.timeFormat("%Y-%m-%d");
    this.dataDate.forEach((d) => {
      d.dateDebut = this.parseDate(d.dateDebut);
    });

    this.lineGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveLinear);

    // Échelles axe X
    this.xScale = d3
      .scaleTime()
      .domain(d3.extent(this.dataDate, (d) => d.dateDebut)) // Ici on devrais définir la date min et max ([minDate, maxDate])
      .range([this.margin.left, this.width - this.margin.right]); // ici c'est logique

    // Créez un élément tooltip
    this.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    this.redimensionnerX();
    this.redimensionnerY();
  }
  //#endregion

  //#region FUNCTION
  callOnWheel(event) {
    const isZoomIn = event.deltaY < 0;

    if (isZoomIn) {
      this.width += this.zoomFactor;
    } else {
      const canResize =
        this.width - this.zoomFactor >=
        Math.max(this.margin.left + this.margin.right, 0);
      if (!canResize) return; // Cannot resize negatively
      this.width -= this.zoomFactor;
    }

    this.redimensionnerX();
  }

  resetZoom() {
    console.log("tetsetests");
    this.width = parent.innerWidth - 100;
    this.redimensionnerX();
  }

  redimensionnerX() {
    d3.select("#chart-container").attr("width", this.width);

    // Création de l'élément SVG

    // Échelles axe X
    // ici on definit la date min et max
    // puis la range margin left&right
    this.xScaleDate = d3
      .scaleTime()
      .domain(
        d3.extent([
          FCPeriode.getFirstDate(this.dataPeriodes),
          FCPeriode.getLastDate(this.dataPeriodes),
        ])
      )
      .range([this.margin.left, this.width - this.margin.right]);

    this.actualiserFrise();
  }

  redimensionnerY() {
    // Je part du principe que la frise prend 50px de hauteur
    this.marginBottom = this.shouldDrawAxi ? 200 : 150;
    // Dimensions par défault de la frise chronologique
    this.height = this.heightEvent + this.marginBottom; // A modifier un jour
    this.svg.attr("height", this.height);
  }

  // Fonction pour actualiser la frise chronologique avec les nouvelles données
  actualiserFrise() {
    this.heightDate = 30; // Hauteur par défault

    this.svg.selectAll("*").remove();

    // reorganiser les listes d'object
    this.dataDate.sort((a, b) => a.date - b.date);
    this.dataEvent.sort((a, b) => a.end - b.end);
    this.dataPeriodes.sort((a, b) => a.dateFin - b.dateFin);

    this.svg.attr("width", this.width + 50); // + 50 pour permettre l'afficher la flèche qui est hors du cadre de la frise

    //#region === DATE ===
    // Ajout des barres pour représenter les dates
    // TEXT
    this.dataDate.forEach((date) => {
      var lines = UtilsString.wrapText(date.title, this.maxCharPerLigne);
      this.svg
        .selectAll("dateText")
        .data(lines)
        .enter()
        .append("text")
        .attr("text-anchor", "middle") // Ancre du texte au milieu (horizontal)
        .attr("dominant-baseline", "middle") // Baseline centrée (vertical)
        .attr("x", () => {
          return this.xScaleDate(date.date);
        })
        .attr("y", (d, i) => this.heightDate + i * 20 - (lines.length - 1) * 10)
        .style("font-family", "Roboto, Noto Sans, system-ui")
        .style("fill", "white")
        .style("font-size", this.fontSizeDate)
        .style("pointer-events", "none")
        .text((d) => d);
    });

    const dateTextY = this.getHighestYIn("text");
    this.heightDate = dateTextY;

    this.svg
      .selectAll("date")
      .data(this.dataDate)
      .enter()
      .append("rect")
      .attr("x", (d) => this.xScaleDate(d.date))
      .attr("y", this.heightDate)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", this.dateSymbolColor)
      .on("click", (event, d) => d.onClick(this, event))
      .on("mouseover", (event, d) => d.onHoverIn(event))
      .on("mouseout", (event, d) => d.onHoverOut(event));

    //#endregion === DATE ===

    //#region === PERIOD ==
    this.heightPeriod = this.heightDate + 70;

    // Ajout des lignes pour ajouter les périodes
    this.svg
      .selectAll("period")
      .data(this.dataPeriodes)
      .enter()
      .append("line")
      .style("stroke", (d) => d.color)
      .style("stroke-width", 50)
      .attr("x1", (d) => this.xScaleDate(d.dateDebut))
      .attr("y1", this.heightPeriod)
      .attr("x2", (d) => this.xScaleDate(d.dateFin))
      .attr("y2", this.heightPeriod)
      .on("click", (event, d) => d.onClick(this, event))
      .on("mouseover", (event, d) => d.onHoverIn(event))
      .on("mouseout", (event, d) => d.onHoverOut(event));

    this.dessinerLaFleche();

    // Ajout du text pour les périodes
    this.dataPeriodes.forEach((period) => {
      var lines = UtilsString.wrapText(period.title, this.maxCharPerLigne);
      this.svg
        .selectAll("period")
        .data(lines)
        .enter()
        .append("text")
        .attr("text-anchor", "middle") // Ancre du texte au milieu (horizontal)
        .attr("dominant-baseline", "middle") // Baseline centrée (vertical)
        .attr("class", "bonjour")
        .attr("x", () => {
          var xMin = this.xScaleDate(period.dateDebut);
          var xMax = this.xScaleDate(period.dateFin);
          return (xMin + xMax) / 2;
        })
        .attr(
          "y",
          (d, i) => this.heightPeriod + i * 20 - (lines.length - 1) * 10
        )
        .style("font-family", "Roboto, Noto Sans, system-ui")
        .style("fill", "black")
        .style("font-size", this.fontSizePeriod)
        .style("pointer-events", "none")
        .text((d) => d);
    });
    //#endregion

    // #region === EVENT ===
    this.heightEvent = this.heightPeriod + 70;

    // Trier les événements par date de début
    this.dataEvent.sort((a, b) => a.start - b.start);

    let levels = [];

    // Parcourir chaque événement
    this.dataEvent.forEach((event, index) => {
      // Trouver le premier niveau libre
      let level = event.findFirstFreeLevel(levels);

      // Ajouter l'événement au niveau trouvé
      if (!levels[level]) {
        levels[level] = [];
      }
      levels[level].push(event);

      let yOffset = level * 25; // Ajustez selon votre besoin

      let points = [
        { x: this.xScaleDate(event.start), y: yOffset + this.heightEvent },
        { x: this.xScaleDate(event.end), y: yOffset + this.heightEvent },
      ];

      this.dessinerEvent(event, points);
    });
    //#endregion

    // Définition de la pointe (flèche)
    var arrowSize = 4; // Taille de la pointe de flèche
    var arrowPath = `M 0 ${arrowSize / 2} L ${arrowSize / 2} 0 L ${arrowSize} ${
      arrowSize / 2
    } L ${arrowSize / 2} ${arrowSize} Z`; // // Path de la pointe de flèche (un losange)
    this.svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("refX", arrowSize / 2)
      .attr("refY", arrowSize / 2)
      .attr("markerWidth", arrowSize)
      .attr("markerHeight", arrowSize)
      .attr("orient", "auto")
      .append("path")
      .style("pointer-events", "none")
      .attr("d", arrowPath) // Forme de la pointe en losange
      .attr("fill", this.eventArrowColor); // Changer la couleur de la flèche en bleu
    //#endregion === EVENT ===

    const eventTextY = this.getHighestYIn("text");
    this.heightEvent = dateTextY;

    console.log(this.heightEvent);

    //#region === AXI ===
    // Ajout des axes
    if (this.shouldDrawAxi) {
      this.svg
        .append("g")
        .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(this.xScaleDate));
    }
    //#endregion
  }

  /**
   * Affiche un event
   * @param {FCEvent} event
   */
  dessinerEvent(fcevent, points) {
    let path = this.lineGenerator(points);

    // ligne qui indique le text
    const line = this.svg
      .append("line")
      .attr("x1", points[0].x) // Position x de départ de la flèche (à ajuster)
      .attr("y1", points[0].y + 20) // Position y de départ de la flèche (à ajuster)
      .attr("x2", points[0].x) // Position x d'arrivée de la flèche (correspond à x du texte)
      .attr("y2", points[0].y + 50) // Position y d'arrivée de la flèche (correspond à y du texte)
      .attr("stroke", this.eventArrowColor)
      .attr("stroke-width", 1);

    this.svg
      .append("path")
      .attr("d", path)
      .style("stroke", this.eventLineColor)
      .style("stroke-width", 4)
      // .style("marker-start", "url(#arrowhead)")
      .style("marker-end", "url(#arrowhead)")
      .style("marker-start", "url(#arrowhead")
      .on("click", (event) => fcevent.onClick(this, event))
      .on("mouseover", (event) => fcevent.onHoverIn(event))
      .on("mouseout", (event) => fcevent.onHoverOut(event));

    this.svg
      .append("text")
      .attr("x", points[0].x - 5) // Position horizontale du texte
      .attr("y", points[0].y + 75) // Position verticale du texte
      .text(fcevent.title)
      .style("Roboto, Noto Sans, system-ui", this.eventFontSize)
      .style("fill", this.eventFontColor);
  }

  dessinerLaFleche() {
    let lastDate = FCPeriode.getLastDate(this.dataPeriodes);

    var x = this.xScaleDate(lastDate);
    var y = this.heightPeriod;

    // Définir les coordonnées des sommets du triangle
    var points = [
      { x: x, y: y - 50 }, // Sommet supérieur
      { x: x, y: y + 50 }, // Sommet inférieur gauche
      { x: x + 50, y: y }, // Sommet inférieur droit
    ];

    // Utiliser d3.path() pour créer un chemin pour le triangle
    var path = d3.path();
    path.moveTo(points[0].x, points[0].y);
    path.lineTo(points[1].x, points[1].y);
    path.lineTo(points[2].x, points[2].y);
    path.closePath();

    var lastDataDate = this.dataPeriodes.at(-1);

    // Ajouter le chemin à l'élément SVG
    this.svg
      .append("path")
      .attr("d", path.toString())
      .attr("fill", lastDataDate.color);
    //  .attr("stroke", "black")
    //  .attr("stroke-width", 2);
  }

  getHighestYIn(name) {
    var highestY = 0;
    var YPlusHeight = 0;

    this.svg.selectAll(name).each(function () {
      const y = +d3.select(this).attr("y");
      if (y > highestY) {
        highestY = y;
        YPlusHeight = y + this.getBBox().height;
      }
    });
    return YPlusHeight;
  }
  //#endregion
}
