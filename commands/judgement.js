const path = require('path')
const soundsDir = require('../assets/sounds/soundsDir')

module.exports = {
  name: 'judgement',
  description: 'Judgement Knights of Thunder !',
  execute(msg, args) {
    const voiceChannel = msg.member.voiceChannel
    if (typeof voiceChannel !== "undefined") {
      msg.channel.send('Judgement Knights of Thunder !!!    `/stop` to stop');
      voiceChannel.join().then(connection => {
        const channel = connection.channel.id
        const dispatcher = connection.playFile(path.join(soundsDir, 'judgement.mp3'), {volume: 0.5})
        dispatcher.on("end", end => {
          voiceChannel.leave();
        });
      }).catch(err => console.log(err));
    }
  },
};
