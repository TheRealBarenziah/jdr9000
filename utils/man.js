const fs = require("fs");
const path = require("path");
const jdr9000 = require("../commands/index.js");
const commandsDir = require("../commands/commandsDir");

module.exports = {
  name: 'man',
  description: 'Manual for jdr9000. Can take a command as argument.',
  async execute(msg, args) {
    let commands = [];
    let arg = args.toString();
    fs.readdirSync(commandsDir)
      .forEach((file) => {
        commands.push(file.split('.js')[0])
      })

    if (arg === "jdr9000") {
      msg.channel.send('Available commands:\n')
      commands.forEach(command => {
        if ((command !== "index") && (command !== "commandsDir")) {
          msg.channel.send("/"+command)
        }
      })
    }
    else if (commands.includes(arg)){
      msg.channel.send(`${arg}: ${jdr9000[arg].description}`)
    }
    else msg.channel.send('Command invalid: try **/man jdr9000** (or **/man *command*** to learn about a specific command)')
  },
};
