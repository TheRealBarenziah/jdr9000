const exec = require("../utils/sh");
const prefix = require("../utils/prefix");

module.exports = {
  name: "sh",
  description: `Exec shell commands using nodejs \`child_process.exec\`. Will answer output in chat: message the bot to keep it private :wink:
Example: \`${prefix + "sh ls -la | grep rw"}\``,
  async execute(msg, args) {
    await exec(msg, args);
    return null;
  },
};
