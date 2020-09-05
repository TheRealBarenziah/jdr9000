const prefix = require("../utils/prefix");
const soundsDir = require("../assets/sounds/soundsDir");

module.exports = {
  name: "gif",
  description: `Display some gifs .\nAvailable commands:\n\`${prefix}gif ah`,
  
  execute(msg, args) {
    if (args.length === 0) {
      msg.author.send(`${this.description} `);
    }
    else if (args[0] === "ah") {
        const voiceChannel = msg.member.voiceChannel;
        if (Boolean(voiceChannel)) {
          msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif")
          .then(() => {
              voiceChannel.join()
                .then(connection => {
                  const dispatcher = connection.playFile(path.join(soundsDir, "gandalf.wav"), { volume: 0.6 });
                  dispatcher.on("end", () => {
                    voiceChannel.leave();
                  });
                })
                .catch(e => console.error(e));
            }).catch(e => console.error(e));
        }
        else {
          msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif");
      }
    }
  }
};
