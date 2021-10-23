const prettify = require("./format").json;
const pimped = require("util").inspect;
const isAuthorPoweruser = require("./isAuthorPoweruser");
const support = require("./supportAssistance");
const sendPotentiallyLongOutput = require("./sendPotentiallyLongOutput");
const clg = require("./log").cyan;

const sufficientlyEngineeredSecurityRoutines = (msg, args) => {
  let output = {
    success: false,
    answerToAuthor: "",
    maliciousCode: 1
  };

  try {
    if (!isAuthorPoweruser(msg)) {
      output.answerToAuthor = support("Seems you aren't allowed to use this.");
      return output;
    }
  } catch (error) {
    output.answerToAuthor = support("process.env.POWERUSERS is fishy...");
    return output;
  }

  try {
    // https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/examples/making-an-eval-command.md
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
  //let publicMode = false;
  // let fileOutput = false;
  if (args.length > 1) {
    // if (args[0].includes("-p")) {
    //   args.shift();
    //   publicMode = true;
    // }
    // if (args[0].includes("-o")) {
    //   args.shift();
    //   fileOutput = true;
    // }
  }
  clg(`msg.author.id of 'eval' caller: ${msg.author.id}`);
  const mandatoryCheck = sufficientlyEngineeredSecurityRoutines(msg, args);
  if (!mandatoryCheck.success) {
    msg.author.send(mandatoryCheck.answerToAuthor);
  }
  else {
    try {
      const yolo = eval(mandatoryCheck.maliciousCode);
      const notice = "\n/!\\ Output above was truncated to fit Discord API limitations. Use -o flag to get full output as file.";
      const truncated = yolo.length > 1988 ?
        prettify(pimped(yolo.substring(0, 1886))) + notice
        : prettify(pimped(yolo));

      const result = yolo ? truncated : `\`${mandatoryCheck.maliciousCode}\`\nhave no return value; what did you expect?`;
      const buf = Buffer.from(yolo, "utf-8");

      return result ?
        sendPotentiallyLongOutput({ string: yolo, msg, styleCb: (x) => prettify(pimped(x)) })
        :
        `\`${mandatoryCheck.maliciousCode}\`\nhave no return value; what did you expect?`;
    } catch (error) {
      console.error(error);
      const limitFreemiumUsersExperience = String(error).split("\n", 1)[0];
      // bondage the freemium scum with great performance: https://stackoverflow.com/a/37133017
      const intolerablePublicity = "Want the full errortrace? Fork me ( or pay me :heart_eyes: ) `https://github.com/TheRealBarenziah/jdr9000/blob/master/utils/eval.js`";
      const output = prettify(pimped(limitFreemiumUsersExperience)) + intolerablePublicity;
      return msg.channel.send(output);
      // return msg[publicMode ? "channel" : "author"].send(output);
    }
  }
  return null;
};
