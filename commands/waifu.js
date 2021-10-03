const waifuGenerator = require("waifu-generator");
const faker = require("faker");
const tfaker = require("tfaker");
const Discord = require("discord.js");
const roll = require("../utils/roll");
const uwufy = require("uwufy");

const sentience = () => {
  const waifuName = () => roll(2) === 1 ?
    tfaker.firstName()
    :
    faker.name.firstName();

  const gibberish = (uwufication) => {

    const chaos = roll(2);
    if (uwufication === true) {
      switch (chaos) {
        case 1:
          return uwufy(faker.hacker.phrase()).replace(">w<", "");
        default:
          return uwufy(faker.company.bs()).replace(">w<", "");
      }
    }
    else {
      switch (chaos) {
        case 1:
          return faker.hacker.phrase();
        default:
          return faker.company.bs();
      }
    }
  };

  const uwu = () => {
    switch (roll(4)) {
      case 1:
        return "uwu";
      case 2:
        return "owo";
      case 3:
        return ">w<";
      default:
        return "";
    }
  };

  const greetings = () => {
    switch (roll(4)) {
      case 1:
        return `Ohaio! I am ${waifuName()}.`;
      case 2:
        return `Yo. ${waifuName()} here.`;
      case 3:
        return `${waifuName()}, at your service !`;
      default:
        return `Hello? I'm ${waifuName()}.`;
    }
  };

  return {
    gibberish: gibberish,
    uwu: uwu,
    greetings: greetings
  };
};

module.exports = {
  name: "waifu",
  description: "Display a random anime girl. Accept a single '--uwu' argument. >w<",
  async execute(msg, args) {
    const s = sentience();
    const base64_img = await waifuGenerator({ skipFs: true });
    const sfbuff = new Buffer.from(await base64_img.split(",")[1], "base64");
    const base64Attach = new Discord.Attachment(sfbuff, "ohaio.png");
    if (args.length === 0) {
      await msg.channel.send(`${s.greetings()}\n${s.gibberish(false)} ${s.uwu()}`, base64Attach)
        .catch(e => console.error(e));
    }
    else if (args.length === 1 && (
      args[0] === "--uwu"
      ||
      args[0] === "-u"
    )) {
      await msg.channel.send(`${s.greetings()}\n${s.gibberish(true)} ${s.uwu()}`, base64Attach)
        .catch(e => console.error(e));
    }
    else msg.channel.send("I dont accept any kind of arguments...");
    return null;
  },
};
