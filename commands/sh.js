const exec = require("../utils/sh");

module.exports = {
  name: "sh",
  description: "Exec shell commands using nodejs `child_process`",
  async execute(msg, args) {
    await exec(msg, args);
    return null;
  },
};
