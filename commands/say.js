const prefix = require("../utils/prefix");
const phraze = require("../utils/phrazerWrapper");

module.exports = {
  name: "say",
  description: 
`Cowsay is offensive to hindus & vegetarians alike, so here's a politically correct version.
Pass one or two arguments (in case of two args, the first word is the character you want to invoke)
Available characters: casper, bart, popeye, spongebob, homer, garfield, fred, squidward, pup, dachshund
Ex: \`${prefix}say casper Booo\``,
  async execute(msg, args) {
    const available = ["casper", "bart", "popeye", "spongebob", "homer", "garfield", "fred", "squidward", "pup", "dachshund"];
    if(available.includes(args[0])){
      const optionalArg = args[0];
      args.shift();
      await phraze(args.join(" "),msg, optionalArg);
    }
    else {
      await phraze(args.join(" "), msg, "homer");
    }
    return null;
  },
};
