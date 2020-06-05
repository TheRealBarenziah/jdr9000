const fs = require("fs");
const path = require("path");
const templateInit = require("../utils/templateInit");
const playersJson = require("../assets/jsons/players.json");
const formatStats = require("../utils/format").stats;
const formatSkills = require("../utils/format").skills;
const isUpdateInputValid = require("../utils/isUpdateInputValid");
const writeJson = require("../utils/writeJson");

const cuttingEdgeAi = (arg) => {
  switch (arg) {
    case "Eihnavé":
      return "https://media.giphy.com/media/ZdkkWKVmUsZeZwCEIm/giphy.gif";
    case "JB":
      return "https://media.giphy.com/media/JR1Gmvk9GQ35Pm4haB/giphy.gif";
    case "Brasseur":
      return "https://media.giphy.com/media/dZ2pwAmGZEIHgEGACa/giphy.gif";
    case "Herumor":
      return "https://media.giphy.com/media/dBgctuGPXWZ7X7diz7/giphy.gif";
    case "Clem":
      return "https://media.giphy.com/media/h81OVbiXolPFBVV3Jt/giphy.gif";
    default:
      return "https://placekitten.com/400/400";
  }
};

module.exports = {
  name: "jdr",
  description: "A set of commands related to roleplay.\nAvailable commands:\n`/jdr init`\n`/jdr stats`\n`/jdr updateStat`\n`/jdr createSkill`\n`/jdr updateSkill`\n`/jdr deleteSkill`\n`/jdr levelup`\n\nUse `/man jdr command` to learn more about a specific command.",
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
      const competenceTest = JSON.stringify(data[invokerId].competences[0]);
      const skills = data[invokerId].competences;
      const formatedSkill = formatSkills(skills[0]);
      console.log("bleh ", competenceTest);
      msg.author.send(`Your stats :\n ${formatStats(data[invokerId].stats)}\nYour skills:\n ${formatedSkill}\n You can update stats with \`/jdr updateStat x.y z\` or skills with \`/jdr updateSkill x y=z\` (learn more by typing \`/man jdr command\`)`);
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
      else if (args[0] === "createSkill") {
        msg.author.send("You're in createSkill method, congratz");
      }
      else if (args[0] === "deleteSkill") {
        msg.author.send("You're in deleteSkill method, congratz");
      }
      else if (args[0] === "updateSkill") {
        msg.author.send("You're in updateSkill method, congratz");
      }
      else if (args[0] === "levelup") {
        const validArgs = ["Eihnavé", "Brasseur", "Clem", "Herumor", "JB"];
        if (validArgs.includes(args[1])) {
          msg.channel.send(`Level up! Congratulations ${args[1]}! `, { files: [`${cuttingEdgeAi(args[1])}`] })
            .catch(e => console.error(e));
        }
        else msg.author.send("I need a roleplay name as argument... see /man jdr levelup");
      }

      else {
        msg.author.send(`Invalid arg : ${args[0]}. To initialize your character sheet, please type \`/jdr init yourRpName\`. Too see more commands, type \`/man jdr\``);
      }
    }
    else if ((args.length === 3)) {
      if (args[0] === "updateStat") {
        // UPDATE
        if (isUpdateInputValid(args[1], args[2])) {
          const mainStat = args[1].split(".")[0];
          const offStat = args[1].split(".")[1];
          data[invokerId].stats[mainStat][offStat] = args[2];
          writeJson(JSON.stringify(data));
          msg.author.send(`Updated. Your stats now are: ${formatStats(data[invokerId].stats)}`);
        }
        else msg.author.send("Input invalid, please see `/man jdr updateStat`");
      }
    }
    else msg.author.send("To initialize your character sheet, please type `/jdr init yourRpName`");
  },
};
