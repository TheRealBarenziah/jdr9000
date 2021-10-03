const clfu = require("commandlinefu");
const formatObject = require("../utils/format").clfuObject;
const formatArray = require("../utils/format").clfuArray;
const prefix = require("../utils/prefix");

module.exports = {
  name: "clfu",
  description: `Get random snippets from commandlinefu.com. Available args: \`random\`, \`popular\`, \`search:$yoursearch\`.\nEx: \`${prefix}clfu search:grep\`\nDefault to private mode (bot will PM you). To use public mode (also known as 'spam mode'), pass \`--public\` as second argument.\nEx: \`${prefix}clfu popular --public\``,
  async execute(msg, args) {
    if (args.length === 0) {
      msg.author.send(`${this.description} `);
    }
    else if ((args.length === 1)) {
      // private mode
      if (args[0] === "random") {
        await clfu()
          .then(res => {
            msg.author.send(formatObject(res));
          });
      }
      else if (args[0] === "popular") {
        await clfu("popular")
          .then(res => {
            const { output1, output2, output3 } = { ...formatArray(res) };
            msg.author.send(output1)
              .then(() => output2.length > 0
                ?
                msg.author.send(output2)
                  .then(() =>
                    output3.length > 0
                      ?
                      msg.author.send(output3)
                      :
                      null
                  )
                  .catch(e => e)
                : null
              );
          });
      }
      else if (args[0].includes("search:")) {
        const input = args[0].split("search:")[1];
        await clfu(`search:${input}`)
          .then(res => {
            const { output1, output2, output3 } = { ...formatArray(res) };
            msg.author.send(output1)
              .then(() => output2.length > 0
                ?
                msg.author.send(output2)
                  .then(() =>
                    output3.length > 0
                      ?
                      msg.author.send(output3)
                      :
                      null
                  )
                  .catch(e => e)
                : null
              );
          });
      }
    }
    else if ((args.length === 2) && ((args[1] === "--public") || (args[1] === "-p"))) {
      // public mode
      if (args[0] === "random") {
        await clfu()
          .then(res => {
            msg.channel.send(formatObject(res));
          });
      }
      else if (args[0] === "popular") {
        await clfu("popular")
          .then(res => {
            const { output1, output2, output3 } = { ...formatArray(res) };
            msg.channel.send(output1)
              .then(() => output2.length > 0
                ?
                msg.channel.send(output2)
                  .then(() =>
                    output3.length > 0
                      ?
                      msg.channel.send(output3)
                      :
                      null
                  )
                  .catch(e => e)
                : null
              );
          });
      }
      else if (args[0].includes("search:")) {
        const input = args[0].split("search:")[1];
        await clfu(`search:${input}`)
          .then(res => {
            const { output1, output2, output3 } = { ...formatArray(res) };
            if (output1) {
              msg.channel.send(output1)
                .then(() => output2.length > 0
                  ?
                  msg.channel.send(output2)
                    .then(() =>
                      output3.length > 0
                        ?
                        msg.channel.send(output3)
                        :
                        null
                    )
                    .catch(e => e)
                  : null
                );
            }
            else {
              msg.channel.send(`No results found for \`${input}\` in clfu database!`);
            }
          });
      }
    }
    return null;
  }
};
