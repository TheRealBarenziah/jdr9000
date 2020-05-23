const fs = require("fs");
const path = require("path");

module.exports = {
  name: 'man',
  description: 'Manual for jdr9000',
  execute(msg, args) {
    let commands = []
    fs.readdirSync(__dirname)
      .forEach((file) => {
        commands.push(file)
      })
    if (args.toString() === "jdr9000") {
      msg.channel.send('Available commands:\n')
      commands.forEach(command => {
        if (command !== "index.js") {
          msg.channel.send("/"+command.split('.js')[0])
        }
      })
    }
    else {
      msg.channel.send('Command invalid: try "/man jdr9000"')
    }
  },
};
