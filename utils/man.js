const fs = require("fs");
const jdr9000 = require("../commands/index.js");
const commandsDir = require("../commands/commandsDir.js");
const prefix = require("../utils/prefix");

module.exports = {
  name: "man",
  description: "Manual for jdr9000. Can take a command as argument.",
  execute(msg, args) {
    let commands = ["man command"];
    const arg = args[0];

    fs.readdirSync(commandsDir)
      .forEach((file) => {
        ((file !== "index.js") && (file !== "commandsDir.js")) ?
          commands.push(file.split(".js")[0])
          :
          null;
      });

    if ((args[0] === "man") && (args.length === 1)) {
      msg.author.send(this.description);
    }

    else if ((args[0] === "jdr") && (args.length === 2)) {
      if (args[1] === "init") {
        msg.author.send(`Init takes one argument: your roleplay name. Ex: \`${prefix}jdr init Clem\``);
      }
      else if (args[1] === "updateStat") {
        msg.author.send(`That command takes 2 another arguments: the stat you want to modify (format: mainStat.subStat) and the new value. Ex: \`${prefix}jdr updateStat force.puissance 80\` will set your puissance to 80\n__Stats (mainStat is first)__:\n**adresse**(artisanat, visee, minutie)\n**agilite**(souplesse, reflexe, mouvement)\n**force**(athletisme, puissance, constitution)\n**social**(aura, parole, sangFroid)\n**magie**(puissance, adresse, reflexe)\n**savoirMagique**(perception, education, intuition)\n**artsDeLaGuerre**(perception, education, pratique)`);
      }
      else if (args[1] === "stats") {
        msg.author.send("It displays your stats... But since you dared, here's a nyan cat just for you:", { files: ["https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif"] });
      }
      else if (args[1] === "createSkill") {
        msg.author.send("Don't try me");
      }
      else if (args[1] === "updateSkill") {
        msg.author.send("Outrageous! This incident will be reported...");
      }
      else if (args[1] === "deleteSkill") {
        msg.author.send("Get lost :o");
      }
      else if (args[1] === "levelup") {
        msg.author.send(`Displays a GIF depending on argument.\nAvailable arguments: Eihnavé, Brasseur, Clem, Herumor, JB.\nExample: \`${prefix}jdr levelup Eihnavé\``);
      }
    }

    else if ((arg === "jdr9000") || (args.length === 0)) {
      msg.author.send(`\`\`\`Available commands:\n${commands.map(c => `${prefix}${c}\n`).join("")}\n\`\`\``);
    }

    else if (commands.includes(arg)) {
      msg.author.send(`${arg}: ${jdr9000[arg].description}`);
    }
    else {
      msg.author.send(`Command invalid: try **${prefix}man jdr9000** (or **${prefix}man *command*** to learn about a specific command)`);
    }
  }
};
