let playersJson = require("../assets/jsons/players.json");

module.exports = {
  name: "jdr",
  description: "A set of commands related to roleplay.\n`/jdr init` yourIgPseudo: initialize your character sheet\n`/jdr stats`: display your character sheet",
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
              "adresse": {
                "artisanat": 0,
                "visee": 0,
                "minutie": 0
              },
              "agilite": {
                "souplesse": 0,
                "reflexe": 0,
                "mouvement": 0
              },
              "force": {
                "athletisme": 0,
                "puissancePhysique": 0,
                "constitution": 0
              },
              "social": {
                "aura": 0,
                "parole": 0,
                "sangFroid": 0
              },
              "magie": {
                "puissance": 0,
                "adresse": 0,
                "reflexe": 0
              },
              "savoirMagique": {
                "perception": 0,
                "education": 0,
                "intuition": 0
              },
              "artsDeLaGuerre": {
                "perception": 0,
                "education": 0,
                "pratique": 0
              }
            },
            "competences": []
          };
          msg.author.send(`You (${invokerUsername}) had not initialized your stats yet, initializing...`);
        }
      }
      else msg.author.send(`Invalid arg : ${args[0]}. To initialize your character sheet, please type \`/jdr init yourRpName\`. Too see more commands, type \`/man jdr\``);
    }
    else msg.author.send("To initialize your character sheet, please type `/jdr init yourRpName`");
  },
};
