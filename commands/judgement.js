const path = require("path");
const soundsDir = require("../assets/sounds/soundsDir");

module.exports = {
  name: "judgement",
  description: "Will play Judgement Knights of Thunder in your voicecom !",
  execute(msg) {
    const voiceChannel = msg.member.voiceChannel;
    if (typeof voiceChannel !== "undefined") {
      msg.channel.send("Judgement Knights of Thunder !!!    `/stop` to stop");
      voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile(path.join(soundsDir, "judgement.mp3"), { volume: 0.5 });
          dispatcher.on("end", () => {
            voiceChannel.leave();
          });
        })
        .catch(err => console.log(err));
    }
  },
};
