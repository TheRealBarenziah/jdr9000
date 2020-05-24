const path = require("path");
const soundsDir = require("../assets/sounds/soundsDir");

module.exports = {
  name: "gandalf",
  description: "Post a Gandalf gif. If you are in a voice chat, he will also come to say a line.",
  execute(msg) {
    const voiceChannel = msg.member.voiceChannel;
    if (typeof voiceChannel !== "undefined") {
      msg.channel.send("Do not take me for some conjurer of cheap tricks !", { files: ["https://i.imgur.com/azbSS3q.gif"] })
        .then(() => {
          voiceChannel.join()
            .then(connection => {
              const dispatcher = connection.playFile(path.join(soundsDir, "gandalf.wav"), { volume: 0.5 });
              dispatcher.on("end", () => voiceChannel.leave());
            })
            .catch(err => console.error(err));
        }).catch(e => console.error(e));
    }
  }
};