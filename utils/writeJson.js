const fs = require("fs");
const path = require("path");
module.exports = (json) => {
  fs.writeFile(path.join(__dirname, "../assets/jsons/players.json"), json, "utf8", err => {
    if (err) {
      return console.error(err);
    }
  });
};