const path = require("path");
const soundsDir = require("../assets/sounds/soundsDir");

module.exports = {
  name: "gandalf",
  description: "If you are in a voice chat, posts a gif, and Gandalf will come in your voicecom to say a line.",
  execute(msg) {
    const voiceChannel = msg.member.voiceChannel;
    if (typeof voiceChannel !== "undefined") {
      msg.channel.send("Do not take me for some conjurer of cheap tricks !", { files: ["https://i.imgur.com/azbSS3q.gif"] })
        .then(() => {
          if(voiceChannel.members.map(m => m.bot).length <= 1){
            voiceChannel.join()
              .then(connection => {
                const dispatcher = connection.playFile(path.join(soundsDir, "gandalf.wav"), { volume: 0.5 });
                dispatcher.on("end", () => {
                  voiceChannel.leave();
                });
              })
              .catch(e => console.error(e));
          }
        }).catch(e => console.error(e));
    }
    else msg.channel.send("Thou shalt be in a voice channel to use this, foool !");
  }
};