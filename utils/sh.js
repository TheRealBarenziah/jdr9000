const util = require("util");
const exec = util.promisify(require("child_process").exec);
const isAuthorPoweruser = require("./isAuthorPoweruser");
const support = require("./supportAssistance");
const clg = require("./log").cyan;
const prettify = require("./format").bash;

module.exports = async (msg, args) => {
  clg(`msg.author.id of 'sh' caller: ${msg.author.id}`);
  if (isAuthorPoweruser(msg)) {
    try {
      const { stdout, stderr } = await exec(args.join(" "));
      const output = stderr ? `stderr returned something:\n${stderr}\nstdout returned:\n${stdout}` : stdout;
      msg.channel.send(prettify(output));
    } catch (error) {
      msg.channel.send("Error while exec'ing:", prettify(error));
    }
  }
  else {
    msg.author.send(support("Seems you aren't allowed to use this command."));
  }
  return null;
};