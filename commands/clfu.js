const clfu = require("commandlinefu");
const formatObject = require("../utils/format").clfuObject;
const formatArray = require("../utils/format").clfuArray;

module.exports = {
  name: "clfu",
  description: "Get random snippets from commandlinefu.com. Available args: `random`, `popular`, `search:$yoursearch` (ex: `/clfu search:grep`) ",
  async execute(msg, args) {
    if (args.length === 0) {
      msg.author.send(`${this.description} `);
    }
    else if ((args.length === 1)) {
      if (args[0] === "random") {
        await clfu().then(res => {
          msg.channel.send(formatObject(res));
        });
      }
      else if (args[0] === "popular") {
        await clfu("popular").then(res => {
          msg.channel.send(formatArray(res));
        });
      }
      else if (args[0].includes("search:")) {
        const input = args[0].split("search:")[1];
        await clfu(`search:${input}`).then(res => {
          const output = formatArray(res);
          console.log("output len ? ", output.length);
          msg.channel.send(formatArray(res));
        });
      }
    }
  }
};