module.exports = {
  name: "stop",
  description: "Stop playing that! This command will kick the bot out of voicecom.",
  execute(msg) {
    const voiceChannel = msg.member.voiceChannel;
    msg.channel.send("Okay, I'll leave. UwU");
    voiceChannel.leave();
  }
};
