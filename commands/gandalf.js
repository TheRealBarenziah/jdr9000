const path = require("path");
const soundsDir = require("../assets/sounds/soundsDir");

module.exports = {
  name: "gandalf",
  description: "If you are in a voice chat, post a gif, and Gandalf will come to say a line in your voicecom.",
  execute(msg) {
    console.log("msg ",msg);
    console.log("msg.member ", msg.member);
    const voiceChannel = msg.member.voiceChannel;
    if (typeof voiceChannel !== "undefined") {
      console.log(voiceChannel);
      msg.channel.send("Do not take me for some conjurer of cheap tricks !", { files: ["https://i.imgur.com/azbSS3q.gif"] })
        .then(() => {
          voiceChannel.join()
            .then(connection => {
              const dispatcher = connection.playFile(path.join(soundsDir, "gandalf.wav"), { volume: 0.5 });
              dispatcher.on("end", () => {
                voiceChannel.leave();
              });
            })
            .catch(e => console.error(e));
        }).catch(e => console.error(e));
    }
  }
};