const heapdump = require("heapdump");
const path = require("path");
const isAuthorPoweruser = require("../utils/isAuthorPoweruser");

module.exports = {
  name: "heapdump",
  description: "Only available to POWERUSERS. Pass `!` as argument to write a heapsnapshot into the ./heapdumps folder. Pass `gc` as argument to manually call the garbage collector (see full config in README)",
  execute(msg, args) {
    if (isAuthorPoweruser(msg)) {
      if ((args.length === 1) && (args[0] === "!")) {
        heapdump.writeSnapshot(path.join(__dirname, `../heapdumps/${process.env.HOSTNAME ? process.env.HOSTNAME : "Heapdump"}.${Date.now()}.heapsnapshot`));
      }
      else if ((args.length === 1) && (args[0] === "gc")) {
        console.log("Proc garbage collector");
        global.gc();
      }
    }
    else {
      msg.author.send("How dare you use this command? Contact your nearest printer/wifi expert for further assistance.");
    }
    return null;
  }
};
