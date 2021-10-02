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
    const sanitized = typeof userInput === "string" ?
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
  const mandatoryCheck = sufficientlyEngineeredSecurityRoutines(args, authorId);
  if (!mandatoryCheck.success) {
    msg.author.send(mandatoryCheck.answerToAuthor);
  }
  else {
    const yolo = eval(mandatoryCheck.maliciousCode);
    const result = yolo ? prettify(pimped(yolo)) : `\`${args.join(" ")}\`\nhave no return value; what did you expect?`;
    //msg.author.send(result);
    return publicMode ? msg.channel.send(result) : msg.author.send(result);
  }
};
