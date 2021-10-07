const path = require("path");
const gifsDir = require("../assets/gifs/gifsDir");
const readDir = require("fs").readdirSync;
const roll = require("../utils/roll");
const hacker = require("faker").hacker;

module.exports = {
  name: "aws",
  description: "IM IN YR AWS TYPING `nc` COMMANDS ~woof~",
  execute(msg, args) {
    const doggoPath = path.join(gifsDir, "doggos");
    console.log("doggoPath : ", doggoPath);
    const gifs = readDir(doggoPath, (err, files) => {
      if (err) {
        throw err;
      }
      return files;
    });
    console.log("ohaio args : ", args);
    console.log("args[0] : ", args[0]);
    console.log("gifs : ", gifs);
    const randomIndex = roll(gifs.length) - 1;
    if (args[0]) {
      if (args[0].includes("-a") || args[0].includes("--async")) {
        console.log("im in your if, args[0] ", args[0]);
        msg.channel.send("-a flag! ", { files: [path.join(doggoPath, gifs[randomIndex])] });
      }
    }
    else {

      const bs = `${hacker.ingverb()} your ${hacker.adjective()} ${hacker.abbreviation()}`;
      msg.channel.send(`Dont wowwy! Im ${bs} ~woof~`, { files: [path.join(doggoPath, gifs[randomIndex])] })
        .catch(e => console.error(e));
    }
    return null;
  }
};