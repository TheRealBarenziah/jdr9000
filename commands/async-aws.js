const path = require("path");
const asyncReadDir = require("fs/promises").readdir;
const roll = require("../utils/roll");
const hacker = require("faker").hacker;
const gifsDir = require("../assets/gifs/gifsDir");

module.exports = {
  name: "async-aws",
  description: "I PROMISE IM IN YR AWS TYPING `nc` COMMANDS ~woof~",
  async execute(msg) {
    const bs = `${hacker.ingverb()} your ${hacker.adjective()} ${hacker.abbreviation()}`;
    const doggoPath = path.join(gifsDir, "doggos");
    const gifs = await asyncReadDir(doggoPath);
    const randomIndex = roll(gifs.length) - 1;
    msg.channel.send(`Dont wowwy! Im in your AWS, asyncronously ${bs}... ~woof~`, { files: [path.join(doggoPath, gifs[randomIndex])] });
    return null;
  }
};