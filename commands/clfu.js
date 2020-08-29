const clfu = require("commandlinefu");
const format = require("../utils/format").clfu;

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
          msg.channel.send(format(res));
        });
      }
      else if (args[0] === "popular") {
        await clfu("popular").then(res => {
          msg.channel.send(format(res.slice(0, 4)));
        });
      }
      else if (args[0].includes("search:")) {
        const input = args[0].split("search:")[1];
        await clfu(`search:${input}`).then(res => {
          msg.channel.send(format(res.slice(0, 4)));
        });
      }
    }
  }
};