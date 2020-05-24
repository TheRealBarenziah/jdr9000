let playersJson = require("../assets/jsons/players.json");

module.exports = {
  name: "jdr",
  description: "A set of commands related to roleplay.",
  execute(msg, args) {
    if (args.length === 0) {
      // todo: goto man /jdr
      msg.channel.send("O args");
    }
    else if ((args.length === 2)) {
      if(args[0] === "init"){
        // valid arg 1: init
        const invokerId = msg.author.id;
        const invokerUsername = msg.author.username;
        const invokerHashtag = msg.author.discriminator;
        const isInvokerInJson = typeof playersJson[invokerId] !== "undefined";
        console.log("Invoker id = ", invokerId);
        console.log("Invoker username = ", invokerUsername);
        console.log("Is invoker in JSON ? ", isInvokerInJson);
        if(isInvokerInJson){
          msg.author.send(`You (${invokerUsername}#${invokerHashtag}) had initialized your stats already, those are:\n ${JSON.stringify(playersJson[invokerId])}.\n To update use \`/jdr update\``);
        }
        else{
          playersJson[invokerId] = {
            "discordName": invokerUsername,
            "rpName": args[1] ? args[1] : "Default",
            "stats": {
              "a": 90,
              "b": 60,
              "c": 40
            } 
          };

          msg.author.send(`You (${invokerUsername}) had not initialized your stats yet, initializing...`);
        }
      }
      else msg.author.send(`Invalid arg : ${args[0]}. To initialize your character sheet, please type \`/jdr init yourRpName\`. Too see more commands, type \`/man jdr\``);
    }
    else msg.author.send("To initialize your character sheet, please type `/jdr init yourRpName`");
  },
};
