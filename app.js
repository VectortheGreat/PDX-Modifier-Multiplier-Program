//Multiplier Program by Vector

const modifiers = require("./ModifierList.js");
const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  const newContent = lines.map((line) => {
    // Check if the line is a comment line, indicated by a "#" character at the start
    const commentIndex = line.indexOf("#");
    if (commentIndex === 0) {
      // The line is a comment line, return an empty string
      return "";
    } else if (commentIndex > 0) {
      // The line contains a comment, remove the comment and trim the line
      line = line.substring(0, commentIndex).trim();
    } else {
      // The line does not contain a comment, trim the line
      line = line.trim();
    }

    // Check if the line is an empty line
    if (line === "") {
      return "";
    }

    // Check if the line contains an allowed word
    const containsAllowedWord = modifiers.allowedWords.some((word) => {
      return line.indexOf(word) !== -1;
    });

    const containsBannedWord = modifiers.bannedWords.some((word) => {
      return line.indexOf(word) !== -1;
    });

    if (containsBannedWord) {
      // The line contains a banned word, return the original line
      return line;
    }

    if (containsAllowedWord) {
      // The line contains an allowed word, update the line
      const words = line.split(" ");
      const updatedWords = words.map((word) => {
        if (!isNaN(word)) {
          const parsedNumber = parseFloat(word) * 3;
          const decimalLength = word.split(".")[1]?.length || 0;
          if (decimalLength <= 3) {
            return parsedNumber.toFixed(3) + " #Multipled by app.js";
          } else {
            return parsedNumber + " #Multipled1 by app.js";
          }
        }
        return word;
      });
      return updatedWords.join(" ");
    }

    // The line does not contain an allowed word, return the original line
    return line;
  });

  const updatedContent = newContent.join("\n");

  fs.writeFile("output.txt", updatedContent, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Output Updated");
  });
});
