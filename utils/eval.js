const prettify = require("./format").json;
const pimped = require("util").inspect;

const sufficientlyEngineeredSecurityRoutines = (userInput, userId) => {
  let output = {
    success: false,
    answerToAuthor: "",
    maliciousCode: 1
  };

  try {
    const allowedCallers = Array.from(process.env.POWERUSERS).join("");
    // console.log("allowedCallers.includes(userId) : ", allowedCallers.includes(userId));
    // console.log("userId : ", userId);
    if (!allowedCallers.includes(userId)) {
      output.answerToAuthor = "Seems you aren't allowed to use this. Contact your nearest printer/wifi expert for further assistance.";
      return output;
    }
  } catch (error) {
    console.error(error);
    output.answerToAuthor = "process.env.POWERUSERS is fishy... Contact your nearest printer/wifi expert for further assistance.";
    return output;
  }


  try {
    // https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/examples/making-an-eval-command.md
    console.log("user input ", userInput);
    let toString = Array.isArray(userInput) ? userInput.join(" ") : userInput;
    const chadPrimitive = toString;
    const fiveFirstChars = chadPrimitive.substring(0, 5);
    if (fiveFirstChars === "```js") {
      console.log("im in yr if, toString = ", toString);
      console.log("notDoign.. ", chadPrimitive);
      const js = chadPrimitive.substring(6, chadPrimitive.length - 3);
      console.log("js: ", js);
      const woLinebreaks = js.replace(/\r?\n|\r/g, "");
      console.log("woLineBreaks = ", woLinebreaks);
      console.log("chadPrimitive? ", chadPrimitive);
      toString = woLinebreaks;
    }
    const sanitized = typeof userInput === "string" ?
      toString.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
      :
      toString;
    console.log("anyway sanitized= ", sanitized);
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
  const mandatoryCheck = sufficientlyEngineeredSecurityRoutines(args, authorId);
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
