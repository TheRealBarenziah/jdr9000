const path = require('path')
const soundsDir = require('../assets/sounds/soundsDir')

module.exports = {
  name: 'stop',
  description: 'Stop playing music !',
  execute(msg, args) {
    const voiceChannel = msg.member.voiceChannel
    msg.channel.send("Okay, I'll leave. UwU");
    voiceChannel.leave();
  }
};
