const fs = require("fs");
const jdr9000 = require("../commands/index.js");
const commandsDir = require("../commands/commandsDir.js");

module.exports = {
  name: "man",
  description: "Manual for jdr9000. Can take a command as argument.",
  execute(msg, args) {
    let commands = ["man command"];
    let arg = args.toString();

    fs.readdirSync(commandsDir)
      .forEach((file) => {
        ((file !== "index.js") && (file !== "commandsDir.js")) ?
          commands.push(file.split(".js")[0])
          :
          null;
      });

    if ((arg === "jdr9000") || (args.length === 0)) {
      msg.channel.send(`\`\`\`Available commands:\n${commands.map(c => `/${c}\n`).join("")}\n\`\`\``);
    }
    else if (commands.includes(arg)){
      msg.channel.send(`${arg}: ${jdr9000[arg].description}`);
    }
    else msg.channel.send("Command invalid: try **/man jdr9000** (or **/man *command*** to learn about a specific command)");
  },
};
