import { UtilsArray } from "../utils/UtilsArray.js";
import { UtilsDate } from "../utils/UtilsDate.js";

export class FCFrise {
  constructor() {
    this.dataPeriodes = [
      { dateDebut: "0000-00-00", title: "Gaule romaine", color: "#ffc56e" },
      { dateDebut: "0500-00-00", title: "Mérovingiens", color: "#6babdb" },
      { dateDebut: "0750-00-00", title: "Carolingiens", color: "#3f3f3f" },
      { dateDebut: "0990-00-00", title: "Capétiens", color: "#ffc56e" },
      {
        dateDebut: "1790-00-00",
        title: "Période contemporaine",
        color: "#6babdb",
      },
    ];
    this.dataEvent = [
      { dateDebut: "0750-01-01", dateFin: "1100-05-10", title: "Bonjour !" },
      { dateDebut: "0900-00-00", dateFin: "1500-05-10", title: "Pas super !" },
      { dateDebut: "2008-01-01", dateFin: "2010-05-10", title: "Bonjour2 !" },
    ];
    this.dataDate = [
      { dateDebut: "0000-00-00", title: "Événement 1" },
      { dateDebut: "0400-00-00", title: "Invasion Barbare" },
      { dateDebut: "2018-03-20", title: "Événement 4" },
    ];

    this.zoomFactor = 50;

    this.heightDate = 40;
    this.heightPeriod = 100;
    this.heightEvent = 150;

    this.fontSizePeriod = "24px";
    this.fontSizeDate = "24px";
    this.fontSizeEvent = "24px";

    // Dimensions de la frise chronologique
    this.width = parent.innerWidth - 30;
    this.height = 300; // A modifier un jour
    this.margin = { top: 20, right: 30, bottom: 30, left: 40 };

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

    // Échelles axe X
    this.xScale = d3
      .scaleTime()
      .domain(d3.extent(this.dataDate, (d) => d.dateDebut))
      .range([this.margin.left, this.width - this.margin.right]);

    // Créez un élément tooltip
    this.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    this.actualiserFrise();
  }

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

    this.redimensionner();
  }

  redimensionner() {
    d3.select("#chart-container").attr("width", this.width);

    // Création de l'élément SVG

    // Échelles axe X
    this.xScale.range([this.margin.left, this.width - this.margin.right]);
    this.actualiserFrise();
  }

  onHoverInEvent(event, d) {
    // Afficher le tooltip
    const tooltip = document.querySelector("#tooltip");
    tooltip.style.display = "block";

    // Mettre à jour les informations du tooltip
    document.getElementById("tooltip-date").innerText = d.dateDebut;
    document.getElementById("tooltip-event").innerText = d.event;

    // Positionner le tooltip par rapport à la position de la souris
    tooltip.style.left = event.pageX + 10 + "px";
    tooltip.style.top = event.pageY + 10 + "px";
  }

  onHoverOutEvent(event, d) {
    // Masquer le tooltip lorsque la souris quitte l'élément
    const tooltip = document.querySelector("#tooltip");
    tooltip.style.display = "none";
  }

  // Fonction pour actualiser la frise chronologique avec les nouvelles données
  actualiserFrise() {
    this.svg.selectAll("*").remove();

    this.svg.attr("width", this.width);

    this.xScale = d3
      .scaleTime()
      .domain(d3.extent(this.dataDate, (d) => d.dateDebut))
      .range([this.margin.left, this.width - this.margin.right]);

    // Ajout des barres pour représenter les dates
    this.svg
      .selectAll("date")
      .data(this.dataDate)
      .enter()
      .append("rect")
      .attr("x", (d) => this.xScale(d.dateDebut))
      .attr("y", this.heightDate)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "#ff6472")
      .on("mouseover", (event, d) => {
        this.onHoverInEvent(event, d);
      })
      .on("mouseout", (event, d) => {
        this.onHoverOutEvent(event, d);
      });

    let lastDate = UtilsDate.getLastDate(
      this.dataDate.map((item) => new Date(item.dateDebut))
    );

    // Ajout des lignes pour ajouter les périodes
    this.svg
      .selectAll("period")
      .data(this.dataPeriodes)
      .enter()
      .append("line")
      .style("stroke", (d) => d.color)
      .style("stroke-width", 50)
      .attr("x1", (d) => this.xScale(this.parseDate(d.dateDebut)))
      .attr("y1", this.heightPeriod)
      .attr("x2", this.xScale(lastDate))
      .attr("y2", this.heightPeriod)
      .on("mouseover", (event, d) => {
        this.onHoverInEvent(event, d);
      })
      .on("mouseout", (event, d) => {
        this.onHoverOutEvent(event, d);
      })
      .on("click", (event, d) => {
        console.log(d);
        UtilsArray.removeElement(this.dataPeriodes, d);
        this.actualiserFrise();
      });

    // Ajout du text pour les périodes
    this.svg
      .selectAll("period")
      .data(this.dataPeriodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle") // Ancre du texte au milieu (horizontal)
      .attr("dominant-baseline", "middle") // Baseline centrée (vertical)
      .attr("x", (d) => {
        let dateDeFinDeLaPeriode = UtilsDate.dateSuivanteLaPlusProche(
          d.dateDebut,
          this.dataPeriodes.map((obj) => obj.dateDebut)
        ); // On récupère la date de debut de la période suivante ou null si pas de période suivante
        if (dateDeFinDeLaPeriode == null) {
          return (this.xScale(this.parseDate(d.dateDebut)) + this.width) / 2;
        } else {
          return (
            (this.xScale(this.parseDate(d.dateDebut)) +
              this.xScale(this.parseDate(dateDeFinDeLaPeriode))) /
            2
          );
        }
      })
      .attr("y", this.heightPeriod)
      .text((d) => d.title)
      .style(
        "font-family",
        "Roboto, Noto Sans, system-ui, -apple-system, Segoe UI, sans-serif"
      ) // Changer la police du texte
      .style("font-size", this.fontSizePeriod)
      .style("fill", "black");

    // Ajout des lignes pour représenter les evenements
    this.svg
      .selectAll("event")
      .data(this.dataEvent)
      .enter()
      .append("line")
      .style("stroke", "lightgreen")
      .style("stroke-width", 5)
      // .style("marker-start", "url(#arrowhead)")
      .style("marker-end", "url(#arrowhead)")
      .attr("x1", (d) => this.xScale(this.parseDate(d.dateDebut)))
      .attr("y1", this.heightEvent)
      .attr("x2", (d) => this.xScale(this.parseDate(d.dateFin)))
      .attr("y2", this.heightEvent);

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
      .attr("d", arrowPath) // Forme de la pointe en losange
      .attr("fill", "#ff6372"); // Changer la couleur de la flèche en bleu

    // Ajouter les points au graphique
    this.svg
      .selectAll(".point")
      .data(this.dataEvent)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => this.xScale(this.parseDate(d.dateDebut)))
      .attr("cy", (d) => this.heightEvent)
      .attr("r", 5) // Rayon des points
      .style("fill", "#66ace1");

    // Ajout des axes
    this.svg
      .append("g")
      .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale));
  }
  //#endregion
}
