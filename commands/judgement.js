const path = require("path");
const soundsDir = require("../assets/sounds/soundsDir");
const prefix = require("../utils/prefix");

module.exports = {
  name: "judgement",
  description: `If you're in voicecom, this command will come and play Judgement Knights of Thunder ! (use \`${prefix}stop\` to stop it)`,
  execute(msg) {
    const voiceChannel = msg.member.voiceChannel;
    if (typeof voiceChannel !== "undefined") {
      msg.channel.send(`Judgement Knights of Thunder !!!    \`${prefix}stop\` to stop`);
      voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile(path.join(soundsDir, "judgement.mp3"), { volume: 0.5 });
          dispatcher.on("end", () => {
            voiceChannel.leave();
          });
        })
        .catch(e => console.error(e));
    }
  },
};
