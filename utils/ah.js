const soundsDir = require("../assets/sounds/soundsDir");
const path = require("path");

module.exports = (msg) => {
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
    return null;
  }
  else {
    msg.channel.send(file = "https://media.giphy.com/media/3o7btW7VDxqrhJEnqE/giphy.gif");
    return null;
  }
};