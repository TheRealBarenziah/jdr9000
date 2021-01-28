const waifuGenerator = require("waifu-generator");
const faker = require("faker");
const tfaker = require("tfaker");
const Discord = require("discord.js");

module.exports = {
  name: "waifu",
  description: "Display a random anime girl.",
  async execute(msg, args) {
    if (args.length === 0) {
      const base64_img = await waifuGenerator({ skipFs: true });
      const waifuName = tfaker.firstName();
      const gibberish = faker.hacker.phrase();
      const sfbuff = new Buffer.from(await base64_img.split(",")[1], "base64");
      const base64Attach = new Discord.Attachment(sfbuff, `${waifuName}.png`);
      await msg.channel.send(`Ohaio! ${waifuName} at your service.\n${gibberish} ${Math.floor(Math.random() * 2) === 0 ? "owo" : "uwu"}`, base64Attach)
        .catch(e => console.error(e));
    }
    else msg.channel.send("I dont accept any kind of arguments...");
  },
};