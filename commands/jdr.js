const fs = require("fs");
const path = require("path");
const templateInit = require("../utils/templateInit");
const playersJson = require("../assets/jsons/players.json");
const formatStats = require("../utils/format").stats;
const isUpdateInputValid = require("../utils/isUpdateInputValid")
const writeJson = require("../utils/writeJson");

module.exports = {
  name: "jdr",
  description: "A set of commands related to roleplay.\nAvailable commands:\n`/jdr init`\n`/jdr stats`\n`/jdr update`\n\nUse `/man jdr command` to learn more about a specific command.",
  execute(msg, args) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../assets/jsons/players.json"), { encoding: "utf-8" }));
    const invokerId = msg.author.id;
    const invokerUsername = msg.author.username;
    const invokerHashtag = msg.author.discriminator;


    if (args.length === 0) {
      // todo: goto man /jdr
      msg.channel.send("O args");
    }
    else if ((args.length === 1) && (args[0] === "stats")) {
      msg.author.send(`Your stats :\n ${formatStats(data[invokerId].stats)}\n To update use \`/jdr update\``);
    }
    else if ((args.length === 1) && (args[0] === "debug")) {
      //console.log("debug, playersJson = ", playersJson);
    }
    else if ((args.length === 2)) {
      // INIT
      if (args[0] === "init") {
        const isInvokerInJson = typeof data[invokerId] !== "undefined";
        if (isInvokerInJson) {
          msg.author.send(`You (${invokerUsername}#${invokerHashtag}) had initialized your stats already, those are:\n ${JSON.stringify(playersJson[invokerId])}.\n To update use \`/jdr update\``);
        }
        else {
          const init = templateInit(invokerUsername, args[1]);
          const jsonContent = JSON.stringify({ ...playersJson, [invokerId]: init });
          msg.author.send(`You (${invokerUsername}) had not initialized your stats yet, initializing... Type \`\\jdr stats\` to see your stats or \`\\jdr update\` to update them.`);
          writeJson(jsonContent);
        }
      }

      else msg.author.send(`Invalid arg : ${args[0]}. To initialize your character sheet, please type \`/jdr init yourRpName\`. Too see more commands, type \`/man jdr\``);
    }
    else if ((args.length === 3)) {
      if (args[0] === "update") {
        // UPDATE
        if (isUpdateInputValid(args[1], args[2])) {
          const mainStat = args[1].split(".")[0];
          const offStat = args[1].split(".")[1];
          data[invokerId].stats[mainStat][offStat] = args[2];
          writeJson(JSON.stringify(data));
          msg.author.send(`Updated. Your stats now are: ${formatStats(data[invokerId].stats)}`);
        }
        else msg.author.send("Input invalid, please see `/man jdr update`");
      }
    }
    else msg.author.send("To initialize your character sheet, please type `/jdr init yourRpName`");
  },
};
