const path = require("path");
const soundsDir = require("../assets/sounds/soundsDir");
const gifsDir = require("../assets/gifs/gifsDir");

module.exports = {
  name: "aws",
  description: "IM IN YR AWS NETWORK CONFIG LMAO",
  execute(msg) {
    msg.channel.send("Looking up AWS network config...", { files: [path.join(gifsDir, "doggos", "corgi-computer.gif")] })
      .catch(e => console.error(e));
  }
};