export class UtilsString {
  /**
   * permet de récupérer le text passé en paramètre indenté selon le nombre max de charactère en param.
   * @param {string} text
   * @param {int} maxCharsPerLine
   * @returns
   */
  static getLignedString(text, maxCharsPerLine) {
    let result = "";
    let currentLineLength = 0;

    for (let i = 0; i < text.length; i++) {
      if (currentLineLength >= maxCharsPerLine && text[i] === " ") {
        result += "\n";
        currentLineLength = 0;
      } else {
        result += text[i];
        currentLineLength++;
      }
    }
    console.log(result);
    return result;
  }

  // Fonction pour découper le texte en lignes de maxChars caractères
  static wrapText(text, maxChars) {
    const words = text.trim().split(" ");
    const lines = [];
    let currentLineWords = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const potentialLine = currentLineWords.concat(word).join(" ");

      if (potentialLine.length > maxChars) {
        if (currentLineWords.length > 0) {
          lines.push(currentLineWords.join(" ").trimEnd());
        }
        currentLineWords = [word];
      } else {
        currentLineWords.push(word);
      }
    }

    if (currentLineWords.length > 0) {
      lines.push(currentLineWords.join(" ").trimEnd());
    }

    return lines;
  }
}
