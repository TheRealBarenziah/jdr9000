const prettify = require("./format").json;
const pimped = require("util").inspect;
const isAuthorPoweruser = require("./isAuthorPoweruser");

const sufficientlyEngineeredSecurityRoutines = (msg, args) => {
  let output = {
    success: false,
    answerToAuthor: "",
    maliciousCode: 1
  };

  try {
    if (!isAuthorPoweruser(msg)) {
      output.answerToAuthor = "Seems you aren't allowed to use this. Contact your nearest printer/wifi expert for further assistance.";
      return output;
    }
  } catch (error) {
    output.answerToAuthor = "process.env.POWERUSERS is fishy... Contact your nearest printer/wifi expert for further assistance.";
    return output;
  }

  try {
    // https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/examples/making-an-eval-command.md
    // console.log("user input ", args);
    let toString = Array.isArray(args) ? args.join(" ") : args;
    const chadPrimitive = toString;
    const fiveFirstChars = chadPrimitive.substring(0, 5);
    if (fiveFirstChars === "```js") {
      const js = chadPrimitive.substring(6, chadPrimitive.length - 3);
      const woLinebreaks = js.replace(/\r?\n|\r/g, "");
      toString = woLinebreaks;
    }
    const sanitized = typeof args === "string" ?
      toString.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
      :
      toString;
    output.success = true;
    output.maliciousCode = sanitized;
  } catch (error) {
    console.error(error);
    output.answerToAuthor = error;
  }
  return output;
};

module.exports = (msg, args) => {
  const authorId = Number(msg.author.id);
  let publicMode = false;
  if (args[0].includes("--public")
    || args[0].includes("-p")
    || args[0].includes("-public")
  ) {
    if (args.length > 1) {
      args.shift();
      publicMode = true;
    }
  }
  console.log("Ohaio, msg.author.id of 'eval' caller:", authorId);
  const mandatoryCheck = sufficientlyEngineeredSecurityRoutines(msg, args);
  if (!mandatoryCheck.success) {
    msg.author.send(mandatoryCheck.answerToAuthor);
  }
  else {
    try {
      const yolo = eval(mandatoryCheck.maliciousCode);
      const result = yolo ? prettify(pimped(yolo)) : `\`${args.join(" ")}\`\nhave no return value; what did you expect?`;
      return publicMode ? msg.channel.send(result) : msg.author.send(result);
    } catch (error) {
      const limitFreemiumUsersExperience = String(error).split("\n", 1)[0];
      // bondage the freemium scum with great performance: https://stackoverflow.com/a/37133017
      const intolerablePublicity = "Want the full errortrace? Fork me ( or pay me :heart_eyes: )\nhttps://github.com/TheRealBarenziah/jdr9000/blob/master/utils/eval.js";
      const outut = prettify(pimped(limitFreemiumUsersExperience)) + intolerablePublicity;
      return publicMode ?
        msg.channel.send(`Oopsie! It doesnt seem to like that :\n${outut}`)
        :
        msg.author.send(`Oopsie! It doesnt seem to like that :\n${outut}`);
    }
  }
  return null;
};
