const querySe = require("../utils/queryStackExchange");
const prefix = require("../utils/prefix");
const {  sofResult } = require("../utils/format");

module.exports = {
  name: "sof",
  description: `Queries SOF.
Example: \`${prefix + "sof "}\``,
  async execute(msg, args) {
    const query = args.join(" ");
    await querySe(query)
      .then(res => {
        console.log("res querySe : ", res);
        if(res.length > 0){
          msg.channel.send(sofResult(res));
        }
        else {
          msg.channel.send("No result :sob:");
        }
      })
      .catch(e => console.error("Error in querySe:",e));
    return null;
  },
};
