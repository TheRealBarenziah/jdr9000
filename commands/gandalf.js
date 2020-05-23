const path = require('path')
const soundsDir = require('../assets/sounds/soundsDir')

module.exports = {
  name: 'gandalf',
  description: 'Gandalf the Wizard',
  execute(msg, args) {
    const voiceChannel = msg.member.voiceChannel
    if (typeof voiceChannel !== "undefined") {
      voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile(path.join(soundsDir, 'gandalf.wav'), { volume: 0.5 })
        msg.channel.send('Do not take me for some conjurer of cheap tricks !', { files: ["https://i.imgur.com/azbSS3q.gif"] })
        dispatcher.on("end", end => voiceChannel.leave());
      }).catch(err => console.error(err));
    }
  }
};