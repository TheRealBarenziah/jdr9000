require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require("./commands");
const man = require("./utils/man");

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.commands.set(man.name, man);
bot.commands.set("jdr9000", man);

const TOKEN = process.env.TOKEN;
const prefix = process.env.PREFIX;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged as ${bot.user.tag}!`);
});

bot.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  const now = new Date().toString().split(" (")[0];
  console.info(`[${now}] ${msg.author.username}#${msg.author.discriminator} called command ${command}, args: ${args}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  }
  catch (error) {
    console.error(error);
    msg.reply("There was an error trying to execute that command!");
  }
});
