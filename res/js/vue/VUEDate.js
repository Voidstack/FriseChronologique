export class VUEDate {
  constructor(svg, dataDate, cordX) {
    this.svg = svg;
    this.dataDate = dataDate;
    this.cordX = cordX;
  }

  static draw() {
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
  }
}
