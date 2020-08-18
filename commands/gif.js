const prefix = require("../utils/prefix");

module.exports = {
  name: "gif",
  description: `Display some gifs .\nAvailable commands:\n\`${prefix}g ah`,
  execute(msg, args) {
    const invokerId = msg.author.id;
    const invokerUsername = msg.author.username;
    const invokerHashtag = msg.author.discriminator;

    if (args.length === 0) {
      msg.author.send(`${this.description} `);
    }
    else if (args[0] === "ah") {
      msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif")
        .catch(e => console.error(e));
    }
  }
}
