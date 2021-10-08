const path = require("path");
const fs = require("fs");
const readDir = fs.readdirSync;
const roll = require("../utils/roll");
const hacker = require("faker").hacker;
const gifsDir = require("../assets/gifs/gifsDir");

module.exports = {
  name: "aws",
  description: "IM IN YR AWS TYPING `nc` COMMANDS ~woof~",
  execute(msg) {
    const bs = `${hacker.ingverb()} your ${hacker.adjective()} ${hacker.abbreviation()}`;
    const doggoPath = path.join(gifsDir, "doggos");
    const gifs = readDir(doggoPath, (err, files) => {
      if (err) {
        throw err;
      }
      return files;
    });
    const randomIndex = roll(gifs.length) - 1;
    const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";

    msg.channel.send(`Dont wowwy I know stuff! ${capitalize(bs)}... ~woof~`, { files: [path.join(doggoPath, gifs[randomIndex])] })
      .catch(e => console.error(e));
  }
};