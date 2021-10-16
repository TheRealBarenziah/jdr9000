var { exec } = require("@jcubic/lips");
const isAuthorPoweruser = require("./isAuthorPoweruser");
const support = require("./supportAssistance");
const clg = require("./log").cyan;
const prettify = require("./format").lisp;

module.exports = async (msg, args) => {
  clg(`msg.author.id of 'lisp' caller: ${msg.author.id}`);
  if (isAuthorPoweruser(msg)) {
    try {
      let lisp = Array.isArray(args) ? args.join(" ") : args;
      const chadPrimitive = lisp;
      const sevenFirstChars = chadPrimitive.substring(0, 7);
      if (sevenFirstChars === "```lisp") {
        lisp = chadPrimitive.substring(8, chadPrimitive.length - 3);
      }
      const output = await exec(lisp);
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