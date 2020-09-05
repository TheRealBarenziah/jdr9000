const prefix = require("../utils/prefix");
const soundsDir = require("../assets/sounds/soundsDir");
const path = require("path");

module.exports = {
  name: "gif",
  description: `Display some gifs. Some gifs may or may not come with extra fancy features.\nAvailable commands:\n\`${prefix}gif ah`,
  
  execute(msg, args) {
    if (args.length === 0) {
      msg.author.send(`${this.description} `);
    }
    else if (args[0] === "ah") {
      const voiceChannel = msg.member.voiceChannel;
      if (voiceChannel) {
        voiceChannel.join()
          .then(connection => {
            const dispatcher = connection.playFile(path.join(soundsDir, "ah.wav"), { volume: 0.6 });
            msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif");
            dispatcher.on("end", () => {
              voiceChannel.leave();
            });
          })
          .catch(e => console.error(e));
      }
      else {
        msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif");
      }
    }
  }
};