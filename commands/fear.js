const prefix = require("../utils/prefix");

module.exports = {
  name: "fear",
  description: `feel the fear`,
  execute(msg, args) {
    if (args.length === 0) {
      msg.channel.send(":FEAR");
      return null;
    }
    else {
      msg.channel.send(`no more args pliz`);
      return null;
    }
  }
};

