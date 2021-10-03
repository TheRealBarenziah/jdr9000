require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const man = require("./utils/man");

// handle cleanup before nodejs exits
function exitHandler(options, exitCode) {
  if (options.cleanup) {
    console.log("In exitHandler block: I shouldve cleanup things");
  }
  if (exitCode || exitCode === 0) console.error(exitCode);
  if (options.log) console.log(options.log);
  if (options.exit) process.exit();
}
process.stdin.resume(); // https://stackoverflow.com/a/14032965/11894221

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches SIGTERM
process.on("SIGTERM", exitHandler.bind(null, { exit: true, log: "You just killed me -15... UwU" }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

// map commands to bot
Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.commands.set(man.name, man);
bot.commands.set(process.env.BOT_NAME ? process.env.BOT_NAME : "jdr9000", man);

const TOKEN = process.env.TOKEN;
const prefix = process.env.PREFIX ? process.env.PREFIX : "/";

bot.login(TOKEN);

const globalQ = new Map();

bot.on("ready", () => {
  console.info(`Logged as ${bot.user.tag}!`);
  return null;
});

bot.on("message", msg => {
  // console.log("ohaio msg.author.bot", msg.author.bot);
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  const now = new Date().toString().split(" (")[0];
  console.info(`[${now}] ${msg.author.username}#${msg.author.discriminator} called command ${command}, args: ${args}`);

  if (!bot.commands.has(command)) return;

  try {
    const currentQ = globalQ.get(msg.guild.id);
    bot.commands.get(command).execute(msg, args, globalQ, currentQ);
  }
  catch (e) {
    console.error(e);
    msg.reply("There was an error trying to execute that command!");
  }
  return null;
});
