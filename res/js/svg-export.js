document.getElementById("btnExport").addEventListener("click", function () {
  const svg = document.getElementById("myTimeline");
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  canvas.width = svg.clientWidth;
  canvas.height = svg.clientHeight;

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(function (blob) {
      saveAs(blob, "chart.png");
    });
  };

  img.src =
    "data:image/svg+xml;base64," +
    btoa(unescape(encodeURIComponent(svgString)));
});
